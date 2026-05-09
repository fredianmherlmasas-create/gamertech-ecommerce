import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../hooks/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addItem } = useCartStore();

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-900 border border-dark-800 rounded-[3rem] p-12 lg:p-20 max-w-2xl mx-auto"
        >
          <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-8">
            <HeartIcon className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Your Wishlist is Empty</h1>
          <p className="text-gray-400 text-lg mb-10">
            Save your favorite gaming rigs here to keep track of them.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gamertech-500 text-dark-950 font-black rounded-2xl hover:bg-gamertech-400 transition-all shadow-2xl"
          >
            <span>Browse Laptops</span>
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          My <span className="text-gamertech-500">Wishlist</span>
        </h1>
        <p className="text-gray-400 mt-2">You have {wishlist.length} items saved for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-900 border border-dark-800 rounded-[2rem] overflow-hidden flex flex-col group"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl shadow-xl hover:bg-red-600 transition-colors z-10"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-gamertech-500 uppercase tracking-widest mb-1">{product.brand}</p>
                    <h3 className="text-xl font-bold text-white line-clamp-1">{product.name}</h3>
                  </div>
                  <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-4 bg-gamertech-500 text-dark-950 font-black rounded-xl hover:bg-gamertech-400 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                    Move to Cart
                  </button>
                  <Link
                    to={`/products/${product.slug}`}
                    className="block text-center py-3 text-sm font-bold text-gray-500 hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
