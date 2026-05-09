import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';
import { validateUUID } from '../middleware/validators';

const router = Router();

// All admin routes require admin authentication
router.use(authenticate, authorize(UserRole.ADMIN));

// Admin order management
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/stats', OrderController.getOrderStats);
router.patch('/orders/:id/status', validateUUID('id'), OrderController.updateOrderStatus);

// Admin category management
router.post('/categories', CategoryController.createCategory);
router.patch('/categories/:id', validateUUID('id'), CategoryController.updateCategory);
router.delete('/categories/:id', validateUUID('id'), CategoryController.deleteCategory);
router.patch('/categories/:id/toggle', validateUUID('id'), CategoryController.toggleCategoryStatus);

export default router;
