import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrashIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useCartStore } from '../hooks/useStore';
import { cn } from '../utils/cn';

export default function CartPage() {
  const { items, totalAmount, itemCount, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-900 border border-dark-800 rounded-3xl p-12 max-w-lg mx-auto"
        >
          <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added any gaming gear to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gamertech-500 text-dark-950 font-bold rounded-lg hover:bg-gamertech-400 transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({itemCount})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-dark-900 border border-dark-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-dark-800 flex-shrink-0">
                  <img
                    src={item.product.images[0] || '/placeholder-laptop.jpg'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gamertech-500 font-bold uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <Link
                        to={`/products/${item.product.slug}`}
                        className="text-lg font-bold text-white hover:text-gamertech-500 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                    <p className="text-xl font-bold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center bg-dark-800 rounded-lg border border-dark-700">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="pt-4 border-t border-dark-800 flex justify-between">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-gamertech-500">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-all flex items-center justify-center space-x-2 group shadow-lg shadow-gamertech-500/20"
            >
              <span>Checkout Now</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-1">
              Secure Checkout Powered by GamerTech
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
