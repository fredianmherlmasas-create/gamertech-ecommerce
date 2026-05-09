import { get, post, patch } from './api';
import type { Order, OrderStatus, ShippingAddress } from '../types';

interface OrderListResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export const orderService = {
  // Get user's orders
  getMyOrders: async (): Promise<Order[]> => {
    return await get<Order[]>('/orders');
  },

  // Get single order
  getOrder: async (id: string): Promise<Order> => {
    return await get<Order>(`/orders/${id}`);
  },

  // Create new order
  createOrder: async (
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ): Promise<Order> => {
    return await post<Order>('/orders', { shippingAddress, paymentMethod });
  },

  // Cancel order
  cancelOrder: async (id: string): Promise<Order> => {
    return await patch<Order>(`/orders/${id}/cancel`);
  },

  // Admin: Get all orders
  getAllOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    search?: string;
  }): Promise<OrderListResponse> => {
    return await get<OrderListResponse>('/admin/orders', params);
  },

  // Admin: Update order status
  updateOrderStatus: async (
    id: string,
    status: OrderStatus,
    paymentStatus?: string
  ): Promise<Order> => {
    return await patch<Order>(`/admin/orders/${id}/status`, {
      status,
      paymentStatus,
    });
  },

  // Admin: Get order statistics
  getOrderStats: async (): Promise<OrderStats> => {
    return await get<OrderStats>('/admin/orders/stats');
  },
};

export default orderService;
