import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types';
import { validateCreateOrder, validateUUID } from '../middleware/validators';
import { orderRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// User routes (protected)
router.use(authenticate);

router.get('/', OrderController.getUserOrders);
router.get('/:id', validateUUID('id'), OrderController.getOrder);
router.post('/', orderRateLimiter, validateCreateOrder, OrderController.createOrder);
router.patch('/:id/cancel', validateUUID('id'), OrderController.cancelOrder);

export default router;
