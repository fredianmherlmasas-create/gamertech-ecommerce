// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ADMIN' | 'MANAGER';
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  model: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    display: string;
    battery?: string;
    weight?: string;
    ports?: string[];
  };
  images: string[];
  badge?: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  category?: Category;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Cart Types
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

// Order Types
export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  userId: string;
  user?: User;
  items: OrderItem[];
  itemCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  id: string;
  rating: number;
  comment?: string;
  isVerified: boolean;
  userId: string;
  user?: {
    firstName: string;
    lastName: string;
  };
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    message?: string;
  };
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filters
export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}
