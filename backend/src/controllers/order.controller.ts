import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse, CreateOrderInput, OrderStatus } from '../types';

export class OrderController {
  // GET /api/orders
  static getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const orders = await OrderService.getUserOrders(userId);

    const response: ApiResponse<typeof orders> = {
      success: true,
      data: orders,
    };

    res.status(200).json(response);
  });

  // GET /api/orders/:id
  static getOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const userRole = req.user!.role;
    const order = await OrderService.getOrder(id, userId, userRole);

    const response: ApiResponse<typeof order> = {
      success: true,
      data: order,
    };

    res.status(200).json(response);
  });

  // POST /api/orders
  static createOrder = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { shippingAddress, paymentMethod }: CreateOrderInput = req.body;
    const order = await OrderService.createOrder(
      userId,
      shippingAddress,
      paymentMethod
    );

    const response: ApiResponse<typeof order> = {
      success: true,
      data: order,
      meta: { message: 'Order created successfully' },
    };

    res.status(201).json(response);
  });

  // PATCH /api/orders/:id/cancel
  static cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId;
    const userRole = req.user!.role;
    const order = await OrderService.cancelOrder(id, userId, userRole);

    const response: ApiResponse<typeof order> = {
      success: true,
      data: order,
      meta: { message: 'Order cancelled successfully' },
    };

    res.status(200).json(response);
  });

  // Admin Routes

  // GET /api/admin/orders
  static getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as OrderStatus;
    const search = req.query.search as string;

    const result = await OrderService.getAllOrders(page, limit, {
      status,
      search,
    });

    const response: ApiResponse<typeof result.data> = {
      success: true,
      data: result.data,
      meta: result.meta,
    };

    res.status(200).json(response);
  });

  // PATCH /api/admin/orders/:id/status
  static updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    const order = await OrderService.updateOrderStatus(id, status, paymentStatus);

    const response: ApiResponse<typeof order> = {
      success: true,
      data: order,
      meta: { message: 'Order status updated' },
    };

    res.status(200).json(response);
  });

  // GET /api/admin/orders/stats
  static getOrderStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await OrderService.getOrderStats();

    const response: ApiResponse<typeof stats> = {
      success: true,
      data: stats,
    };

    res.status(200).json(response);
  });
}
