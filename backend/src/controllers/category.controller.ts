import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse } from '../types';

export class CategoryController {
  // GET /api/categories
  static getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const includeInactive = req.user?.role === 'ADMIN' && req.query.all === 'true';
    const categories = await CategoryService.getAllCategories(includeInactive);

    const response: ApiResponse<typeof categories> = {
      success: true,
      data: categories,
    };

    res.status(200).json(response);
  });

  // GET /api/categories/:slug
  static getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await CategoryService.getCategoryBySlug(slug);

    const response: ApiResponse<typeof category> = {
      success: true,
      data: category,
    };

    res.status(200).json(response);
  });

  // POST /api/admin/categories (Admin only)
  static createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await CategoryService.createCategory(req.body);

    const response: ApiResponse<typeof category> = {
      success: true,
      data: category,
    };

    res.status(201).json(response);
  });

  // PATCH /api/admin/categories/:id (Admin only)
  static updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await CategoryService.updateCategory(id, req.body);

    const response: ApiResponse<typeof category> = {
      success: true,
      data: category,
    };

    res.status(200).json(response);
  });

  // DELETE /api/admin/categories/:id (Admin only)
  static deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });

  // PATCH /api/admin/categories/:id/toggle (Admin only)
  static toggleCategoryStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.toggleCategoryStatus(id);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });
}
