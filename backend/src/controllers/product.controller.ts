import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse, ProductFilters, PaginationParams } from '../types';

export class ProductController {
  // GET /api/products
  static getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

    const filters: ProductFilters = {
      category: req.query.category as string,
      brand: req.query.brand as string,
      minPrice: req.query.minPrice
        ? parseFloat(req.query.minPrice as string)
        : undefined,
      maxPrice: req.query.maxPrice
        ? parseFloat(req.query.maxPrice as string)
        : undefined,
      inStock: req.query.inStock === 'true',
      search: req.query.search as string,
    };

    const pagination: PaginationParams = { page, limit, sortBy, sortOrder };

    const result = await ProductService.getAllProducts(filters, pagination);

    const response: ApiResponse<typeof result.data> = {
      success: true,
      data: result.data,
      meta: result.meta,
    };

    res.status(200).json(response);
  });

  // GET /api/products/featured
  static getFeaturedProducts = asyncHandler(
    async (req: Request, res: Response) => {
      const limit = parseInt(req.query.limit as string) || 6;
      const products = await ProductService.getFeaturedProducts(limit);

      const response: ApiResponse<typeof products> = {
        success: true,
        data: products,
      };

      res.status(200).json(response);
    }
  );

  // GET /api/products/brands
  static getBrands = asyncHandler(async (_req: Request, res: Response) => {
    const brands = await ProductService.getBrands();

    const response: ApiResponse<typeof brands> = {
      success: true,
      data: brands,
    };

    res.status(200).json(response);
  });

  // GET /api/products/price-range
  static getPriceRange = asyncHandler(async (_req: Request, res: Response) => {
    const range = await ProductService.getPriceRange();

    const response: ApiResponse<typeof range> = {
      success: true,
      data: range,
    };

    res.status(200).json(response);
  });

  // GET /api/products/:slug
  static getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await ProductService.getProductBySlug(slug);

    const response: ApiResponse<typeof product> = {
      success: true,
      data: product,
    };

    res.status(200).json(response);
  });

  // POST /api/products (Admin only)
  static createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductService.createProduct(req.body);

    const response: ApiResponse<typeof product> = {
      success: true,
      data: product,
    };

    res.status(201).json(response);
  });

  // PATCH /api/products/:id (Admin only)
  static updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await ProductService.updateProduct(id, req.body);

    const response: ApiResponse<typeof product> = {
      success: true,
      data: product,
    };

    res.status(200).json(response);
  });

  // DELETE /api/products/:id (Admin only)
  static deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.deleteProduct(id);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });
}
