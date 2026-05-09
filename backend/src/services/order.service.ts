import { prisma } from '../config/database';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors';
import { OrderStatus, PaymentStatus, UserRole } from '../types';
import { CartService } from './cart.service';
import type { ShippingAddress } from '../types';

export class OrderService {
  // Create new order
  static async createOrder(
    userId: string,
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ) {
    // Get cart items
    const cart = await CartService.getCartSummary(userId);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber: this.generateOrderNumber(),
        userId,
        totalAmount: cart.totalAmount,
        shippingAddress: shippingAddress as Record<string, string>,
        paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        status: OrderStatus.PENDING,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Update product stock
    for (const item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear cart
    await CartService.syncCartAfterOrder(userId);

    return order;
  }

  // Get user's orders
  static async getUserOrders(userId: string) {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
              },
            },
          },
          take: 3,
        },
        _count: {
          select: { items: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((order) => ({
      ...order,
      itemCount: order._count.items,
      _count: undefined,
    }));
  }

  // Get single order
  static async getOrder(orderId: string, userId: string, userRole: UserRole) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Check ownership or admin access
    if (order.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenError('Not authorized to view this order');
    }

    return order;
  }

  // Update order status (Admin only)
  static async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus
  ) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    const updateData: { status?: OrderStatus; paymentStatus?: PaymentStatus } =
      { status };

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
        user: {
          select: { email: true, firstName: true, lastName: true },
        },
      },
    });

    return updatedOrder;
  }

  // Cancel order (User can cancel if still pending)
  static async cancelOrder(orderId: string, userId: string, userRole: UserRole) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    // Check ownership
    if (order.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenError('Not authorized to cancel this order');
    }

    // Only allow cancellation for pending/confirmed orders
    if (
      order.status !== OrderStatus.PENDING &&
      order.status !== OrderStatus.CONFIRMED
    ) {
      throw new BadRequestError(
        `Cannot cancel order with status: ${order.status}`
      );
    }

    // Restore stock
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        paymentStatus:
          order.paymentStatus === PaymentStatus.PAID
            ? PaymentStatus.REFUNDED
            : order.paymentStatus,
      },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    return updatedOrder;
  }

  // Get all orders (Admin only) with pagination
  static async getAllOrders(
    page: number,
    limit: number,
    filters?: { status?: OrderStatus; search?: string }
  ) {
    const skip = (page - 1) * limit;

    const where: { status?: OrderStatus; OR?: unknown[] } = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { orderNumber: { contains: filters.search, mode: 'insensitive' } },
        {
          user: {
            email: { contains: filters.search, mode: 'insensitive' },
          },
        },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { email: true, firstName: true, lastName: true },
          },
          items: {
            select: {
              quantity: true,
              price: true,
            },
          },
          _count: {
            select: { items: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get order statistics (Admin only)
  static async getOrderStats() {
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { status: OrderStatus.PROCESSING } }),
      prisma.order.count({ where: { status: OrderStatus.SHIPPED } }),
      prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
      prisma.order.count({ where: { status: OrderStatus.CANCELLED } }),
      prisma.order.aggregate({
        where: { paymentStatus: PaymentStatus.PAID },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    };
  }

  // Generate unique order number
  private static generateOrderNumber(): string {
    const prefix = 'GT';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }
}
