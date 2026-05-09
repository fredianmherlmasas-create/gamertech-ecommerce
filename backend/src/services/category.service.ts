import { prisma } from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';

export class CategoryService {
  // Get all categories
  static async getAllCategories(includeInactive: boolean = false) {
    const where = includeInactive ? {} : { isActive: true };

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map((cat) => ({
      ...cat,
      productCount: cat._count.products,
      _count: undefined,
    }));
  }

  // Get category by slug
  static async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return {
      ...category,
      productCount: category._count.products,
      _count: undefined,
    };
  }

  // Get category by ID
  static async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  // Create category (Admin only)
  static async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
  }) {
    // Check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new ConflictError('Category with this slug already exists');
    }

    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  // Update category (Admin only)
  static async updateCategory(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      imageUrl: string;
      isActive: boolean;
    }>
  ) {
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundError('Category not found');
    }

    // Check slug uniqueness if changing slug
    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists) {
        throw new ConflictError('Category with this slug already exists');
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  // Delete category (Admin only)
  static async deleteCategory(id: string) {
    const existing = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!existing) {
      throw new NotFoundError('Category not found');
    }

    if (existing._count.products > 0) {
      throw new ConflictError(
        'Cannot delete category with associated products'
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return { message: 'Category deleted successfully' };
  }

  // Toggle category active status
  static async toggleCategoryStatus(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { isActive: !category.isActive },
    });

    return {
      category: updated,
      status: updated.isActive ? 'activated' : 'deactivated',
    };
  }
}
