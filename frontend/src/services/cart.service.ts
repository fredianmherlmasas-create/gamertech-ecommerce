import { get, post, patch, del } from './api';
import type { Cart, CartItem } from '../types';

export const cartService = {
  // Get user's cart
  getCart: async (): Promise<Cart> => {
    return await get<Cart>('/cart');
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number): Promise<CartItem> => {
    return await post<CartItem>('/cart/items', { productId, quantity });
  },

  // Update cart item quantity
  updateCartItem: async (cartItemId: string, quantity: number): Promise<CartItem | { message: string }> => {
    return await patch<CartItem | { message: string }>(`/cart/items/${cartItemId}`, { quantity });
  },

  // Remove item from cart
  removeFromCart: async (cartItemId: string): Promise<{ message: string }> => {
    return await del<{ message: string }>(`/cart/items/${cartItemId}`);
  },

  // Clear cart
  clearCart: async (): Promise<{ message: string }> => {
    return await del<{ message: string }>('/cart');
  },
};

export default cartService;
