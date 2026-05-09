import { prisma } from '../config/database';
import { NotFoundError, BadRequestError } from '../utils/errors';

export class CartService {
  // Get user's cart
  static async getCart(userId: string) {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            stock: true,
            images: true,
            brand: true,
            isActive: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    return {
      items: cartItems,
      totalItems,
      totalAmount: Number(totalAmount.toFixed(2)),
    };
  }

  // Add item to cart
  static async addToCart(userId: string, productId: string, quantity: number) {
    // Check product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (!product.isActive) {
      throw new BadRequestError('Product is no longer available');
    }

    if (product.stock < quantity) {
      throw new BadRequestError(
        `Only ${product.stock} units available in stock`
      );
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestError(
          `Cannot add more. Only ${product.stock} units available.`
        );
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: true,
            },
          },
        },
      });

      return updatedItem;
    }

    // Create new cart item
    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: true,
          },
        },
      },
    });

    return cartItem;
  }

  // Update cart item quantity
  static async updateCartItem(
    userId: string,
    cartItemId: string,
    quantity: number
  ) {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
      include: { product: true },
    });

    if (!cartItem) {
      throw new NotFoundError('Cart item not found');
    }

    // Remove item if quantity is 0
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return { message: 'Item removed from cart' };
    }

    // Check stock
    if (cartItem.product.stock < quantity) {
      throw new BadRequestError(
        `Only ${cartItem.product.stock} units available in stock`
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: true,
          },
        },
      },
    });

    return updatedItem;
  }

  // Remove item from cart
  static async removeFromCart(userId: string, cartItemId: string) {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundError('Cart item not found');
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return { message: 'Item removed from cart' };
  }

  // Clear entire cart
  static async clearCart(userId: string) {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return { message: 'Cart cleared' };
  }

  // Get cart summary (for checkout)
  static async getCartSummary(userId: string) {
    const cart = await this.getCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        throw new BadRequestError(
          `${item.product.name}: Only ${item.product.stock} units available`
        );
      }
      if (!item.product.isActive) {
        throw new BadRequestError(
          `${item.product.name} is no longer available`
        );
      }
    }

    return cart;
  }

  // Sync cart after order (remove ordered items)
  static async syncCartAfterOrder(userId: string) {
    await prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
