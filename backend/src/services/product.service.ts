import { prisma } from '../config/database';
import { NotFoundError } from '../utils/errors';
import { ProductFilters, PaginationParams } from '../types';
import { Prisma } from '@prisma/client';

export class ProductService {
  // Get all products with filters and pagination
  static async getAllProducts(
    filters: ProductFilters,
    pagination: PaginationParams
  ) {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ProductWhereInput = { isActive: true };

    if (filters.category) {
      where.category = { slug: filters.category };
    }

    if (filters.brand) {
      where.brand = { contains: filters.brand, mode: 'insensitive' };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    if (filters.inStock) {
      where.stock = { gt: 0 };
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { brand: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Execute queries in parallel
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          _count: {
            select: { reviews: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products.map((p) => ({
        ...p,
        reviewCount: p._count.reviews,
        _count: undefined,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get featured products
  static async getFeaturedProducts(limit: number = 6) {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return products;
  }

  // Get single product by slug
  static async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          where: { isVerified: true },
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  // Get single product by ID
  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  // Create product (Admin only)
  static async createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    brand: string;
    model: string;
    specs: Record<string, unknown>;
    images?: string[];
    isFeatured?: boolean;
  }) {
    // Check if slug already exists
    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new Error('Product with this slug already exists');
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        specs: data.specs as Prisma.InputJsonValue,
        images: data.images || [],
      },
      include: {
        category: true,
      },
    });

    return product;
  }

  // Update product (Admin only)
  static async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      stock: number;
      categoryId: string;
      brand: string;
      model: string;
      specs: Record<string, unknown>;
      images: string[];
      isActive: boolean;
      isFeatured: boolean;
    }>
  ) {
    // Check product exists
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    // If changing category, verify it exists
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new NotFoundError('Category not found');
      }
    }

    const updateData: Prisma.ProductUpdateInput = { ...data };
    if (data.specs) {
      updateData.specs = data.specs as Prisma.InputJsonValue;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return product;
  }

  // Delete product (Admin only)
  static async deleteProduct(id: string) {
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Product not found');
    }

    // Soft delete by setting isActive to false
    // Or hard delete if there are no order items referencing it
    const hasOrders = await prisma.orderItem.findFirst({
      where: { productId: id },
    });

    if (hasOrders) {
      // Soft delete
      await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
      return { message: 'Product deactivated (has order history)' };
    } else {
      // Hard delete
      await prisma.product.delete({
        where: { id },
      });
      return { message: 'Product deleted permanently' };
    }
  }

  // Get all brands
  static async getBrands() {
    const brands = await prisma.product.findMany({
      where: { isActive: true },
      distinct: ['brand'],
      select: { brand: true },
      orderBy: { brand: 'asc' },
    });

    return brands.map((b) => b.brand);
  }

  // Get price range
  static async getPriceRange() {
    const result = await prisma.product.aggregate({
      where: { isActive: true },
      _min: { price: true },
      _max: { price: true },
    });

    return {
      min: result._min.price || 0,
      max: result._max.price || 0,
    };
  }
}
