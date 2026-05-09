import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import {
  validateLogin,
  validateRegister,
} from '../middleware/validators';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public routes with rate limiting
router.post('/register', authRateLimiter, validateRegister, AuthController.register);
router.post('/login', authRateLimiter, validateLogin, AuthController.login);

// Protected routes
router.get('/profile', authenticate, AuthController.getProfile);
router.patch('/profile', authenticate, AuthController.updateProfile);
router.post('/change-password', authenticate, AuthController.changePassword);

export default router;
