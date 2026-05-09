import { get, post, patch, del } from './api';
import type { Product, Category } from '../types';
import { mockProducts, mockCategories } from './mockData';

interface ProductListResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PriceRange {
  min: number;
  max: number;
}

export const productService = {
  // Get all products with filters
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ProductListResponse> => {
    try {
      return await get<ProductListResponse>('/products', params);
    } catch (error) {
      console.warn('API failed, using mock data for products');
      let filtered = [...mockProducts];

      if (params?.category) {
        filtered = filtered.filter(p => p.category?.slug === params.category);
      }
      if (params?.brand) {
        filtered = filtered.filter(p => p.brand.toLowerCase() === params.brand?.toLowerCase());
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
      }

      const limit = params?.limit || 10;
      const page = params?.page || 1;

      return {
        data: filtered.slice((page - 1) * limit, page * limit),
        meta: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit)
        }
      };
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 6): Promise<Product[]> => {
    try {
      return await get<Product[]>('/products/featured', { limit });
    } catch (error) {
      console.warn('API failed, using mock data for featured products');
      return mockProducts.filter(p => p.isFeatured).slice(0, limit);
    }
  },

  // Get single product by slug
  getProduct: async (slug: string): Promise<Product> => {
    try {
      return await get<Product>(`/products/${slug}`);
    } catch (error) {
      console.warn(`API failed, using mock data for product ${slug}`);
      const product = mockProducts.find(p => p.slug === slug);
      if (!product) throw new Error('Product not found');
      return product;
    }
  },

  // Get all brands
  getBrands: async (): Promise<string[]> => {
    try {
      return await get<string[]>('/products/brands');
    } catch (error) {
      console.warn('API failed, using mock data for brands');
      const brands = Array.from(new Set(mockProducts.map(p => p.brand)));
      return brands.sort();
    }
  },

  // Get price range
  getPriceRange: async (): Promise<PriceRange> => {
    try {
      return await get<PriceRange>('/products/price-range');
    } catch (error) {
      console.warn('API failed, using mock data for price range');
      const prices = mockProducts.map(p => p.price);
      return { min: Math.min(...prices), max: Math.max(...prices) };
    }
  },

  // Admin: Create product
  createProduct: async (data: Partial<Product>): Promise<Product> => {
    return await post<Product>('/products', data);
  },

  // Admin: Update product
  updateProduct: async (id: string, data: Partial<Product>): Promise<Product> => {
    return await patch<Product>(`/products/${id}`, data);
  },

  // Admin: Delete product
  deleteProduct: async (id: string): Promise<{ message: string }> => {
    return await del<{ message: string }>(`/products/${id}`);
  },
};

// Category service
export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    return await get<Category[]>('/categories');
  },

  // Get category by slug
  getCategory: async (slug: string): Promise<Category> => {
    return await get<Category>(`/categories/${slug}`);
  },

  // Admin: Create category
  createCategory: async (data: Partial<Category>): Promise<Category> => {
    return await post<Category>('/admin/categories', data);
  },

  // Admin: Update category
  updateCategory: async (id: string, data: Partial<Category>): Promise<Category> => {
    return await patch<Category>(`/admin/categories/${id}`, data);
  },

  // Admin: Delete category
  deleteCategory: async (id: string): Promise<{ message: string }> => {
    return await del<{ message: string }>(`/admin/categories/${id}`);
  },
};

export default productService;
