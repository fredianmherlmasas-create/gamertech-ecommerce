import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';
import { validateUUID } from '../middleware/validators';

const router = Router();

// Public routes
router.get('/', CategoryController.getAllCategories);
router.get('/:slug', CategoryController.getCategoryBySlug);

export default router;
