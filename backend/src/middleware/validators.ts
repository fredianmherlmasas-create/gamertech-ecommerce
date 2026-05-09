import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { ValidationError } from '../utils/errors';

// Helper to run validations and handle errors
const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : undefined,
      message: err.msg,
      value: err.type === 'field' ? err.value : undefined,
    }));
    next(new ValidationError('Validation failed', errorDetails));
    return;
  }
  next();
};

// Auth validators
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  handleValidationErrors,
];

// Product validators
export const validateProductCreate = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Product name must be between 3 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description must be between 10 and 5000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('categoryId')
    .isUUID()
    .withMessage('Valid category ID is required'),
  body('brand')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  body('model')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Model must be between 2 and 100 characters'),
  body('specs')
    .isObject()
    .withMessage('Specs must be an object'),
  handleValidationErrors,
];

export const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 }),
  body('price')
    .optional()
    .isFloat({ min: 0 }),
  body('stock')
    .optional()
    .isInt({ min: 0 }),
  handleValidationErrors,
];

// Cart validators
export const validateAddToCart = [
  body('productId')
    .isUUID()
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  handleValidationErrors,
];

export const validateUpdateCartItem = [
  param('cartItemId')
    .isUUID()
    .withMessage('Valid cart item ID is required'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be 0 or greater'),
  handleValidationErrors,
];

// Order validators
export const validateCreateOrder = [
  body('shippingAddress')
    .isObject()
    .withMessage('Shipping address is required'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('Payment method is required'),
  handleValidationErrors,
];

// Pagination validators
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isIn(['name', 'price', 'createdAt', 'updatedAt'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  handleValidationErrors,
];

// Product filter validators
export const validateProductFilters = [
  ...validatePagination,
  query('category')
    .optional()
    .trim(),
  query('brand')
    .optional()
    .trim(),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 }),
  handleValidationErrors,
];

// UUID param validator
export const validateUUID = (paramName: string) => [
  param(paramName)
    .isUUID()
    .withMessage(`Invalid ${paramName} format`),
  handleValidationErrors,
];
