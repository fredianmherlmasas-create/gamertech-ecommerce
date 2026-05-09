import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Cart, CartItem } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'ADMIN',
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface CartState {
  items: Array<{ product: Product; quantity: number }>;
  wishlist: Product[];
  itemCount: number;
  totalAmount: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      itemCount: 0,
      totalAmount: 0,
      addItem: (product, quantity) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.product.id === product.id);
          let newItems;
          if (existingItemIndex >= 0) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
          } else {
            newItems = [...state.items, { product, quantity }];
          }
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalAmount = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: newItems, itemCount, totalAmount };
        }),
      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalAmount = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: newItems, itemCount, totalAmount };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalAmount = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: newItems, itemCount, totalAmount };
        }),
      toggleWishlist: (product) =>
        set((state) => {
          const isWishlisted = state.wishlist.some((p) => p.id === product.id);
          const newWishlist = isWishlisted
            ? state.wishlist.filter((p) => p.id !== product.id)
            : [...state.wishlist, product];
          return { wishlist: newWishlist };
        }),
      isInWishlist: (productId) => get().wishlist.some((p) => p.id === productId),
      clearCart: () => set({ items: [], itemCount: 0, totalAmount: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  accentColor: string;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setAccentColor: (color: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isCartOpen: false,
      isMobileMenuOpen: false,
      accentColor: '0, 255, 136', // Default Green
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
