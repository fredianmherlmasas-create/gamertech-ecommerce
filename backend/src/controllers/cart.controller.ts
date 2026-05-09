import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse } from '../types';

export class CartController {
  // GET /api/cart
  static getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const cart = await CartService.getCart(userId);

    const response: ApiResponse<typeof cart> = {
      success: true,
      data: cart,
    };

    res.status(200).json(response);
  });

  // POST /api/cart/items
  static addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { productId, quantity } = req.body;
    const cartItem = await CartService.addToCart(userId, productId, quantity);

    const response: ApiResponse<typeof cartItem> = {
      success: true,
      data: cartItem,
      meta: { message: 'Item added to cart' },
    };

    res.status(201).json(response);
  });

  // PATCH /api/cart/items/:cartItemId
  static updateCartItem = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const result = await CartService.updateCartItem(userId, cartItemId, quantity);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });

  // DELETE /api/cart/items/:cartItemId
  static removeFromCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { cartItemId } = req.params;
    const result = await CartService.removeFromCart(userId, cartItemId);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });

  // DELETE /api/cart
  static clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const result = await CartService.clearCart(userId);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });
}
