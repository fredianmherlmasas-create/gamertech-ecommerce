import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth';
import {
  validateAddToCart,
  validateUpdateCartItem,
} from '../middleware/validators';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', CartController.getCart);
router.post('/items', validateAddToCart, CartController.addToCart);
router.patch('/items/:cartItemId', validateUpdateCartItem, CartController.updateCartItem);
router.delete('/items/:cartItemId', CartController.removeFromCart);
router.delete('/', CartController.clearCart);

export default router;
