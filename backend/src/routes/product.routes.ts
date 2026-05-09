import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';
import {
  validateProductCreate,
  validateProductUpdate,
  validateUUID,
} from '../middleware/validators';

const router = Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/brands', ProductController.getBrands);
router.get('/price-range', ProductController.getPriceRange);
router.get('/:slug', ProductController.getProductBySlug);

// Protected admin routes
router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  validateProductCreate,
  ProductController.createProduct
);

router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validateUUID('id'),
  validateProductUpdate,
  ProductController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validateUUID('id'),
  ProductController.deleteProduct
);

export default router;
