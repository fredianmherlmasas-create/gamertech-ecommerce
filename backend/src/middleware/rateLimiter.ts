import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { RateLimitError } from '../utils/errors';

// General API rate limiter
export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, _next, options) => {
    throw new RateLimitError(
      `Too many requests. Please try again after ${Math.ceil(options.windowMs / 60000)} minutes.`
    );
  },
  keyGenerator: (req) => req.ip ?? 'unknown',
});

// Stricter rate limiter for authentication endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: () => {
    throw new RateLimitError(
      'Too many login attempts. Please try again after 15 minutes.'
    );
  },
  keyGenerator: (req) => req.ip ?? 'unknown',
});

// Rate limiter for order creation (prevent spam)
export const orderRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 orders per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new RateLimitError(
      'Order limit reached. Please try again later.'
    );
  },
  keyGenerator: (req) => req.user?.userId ?? req.ip ?? 'unknown',
});
