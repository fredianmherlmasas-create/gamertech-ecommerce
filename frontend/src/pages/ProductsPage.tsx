import { useEffect, useState, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import {
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ShoppingBagIcon,
  XMarkIcon,
  CpuChipIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { productService } from '../services/product.service';
import { useCartStore } from '../hooks/useStore';
import type { Product } from '../types';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// ... variants

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ... loadData and filters

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ... page header and sidebar ... */}

      {/* Product Grid */}
      <div className="flex-1">
          {/* ... existing products map ... */}
          {/* Change ProductCard call to pass onQuickView */}
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                viewMode={viewMode}
                onQuickView={() => setSelectedProduct(product)}
              />
            </motion.div>
          ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

function QuickViewModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[2rem] bg-dark-900 border border-dark-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <button
                  type="button"
                  className="absolute right-6 top-6 text-gray-400 hover:text-white z-10"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 aspect-square md:aspect-auto">
                    <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
                    <p className="text-gamertech-500 font-bold uppercase tracking-widest text-xs mb-2">{product.brand}</p>
                    <Dialog.Title as="h3" className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
                      {product.name}
                    </Dialog.Title>
                    <p className="text-2xl font-bold text-white mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl">
                          <CpuChipIcon className="w-5 h-5 text-gamertech-500" />
                          <span className="text-[10px] text-gray-300 uppercase font-bold">{product.specs.cpu}</span>
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-dark-800 rounded-xl">
                          <ComputerDesktopIcon className="w-5 h-5 text-gamertech-500" />
                          <span className="text-[10px] text-gray-300 uppercase font-bold">{product.specs.gpu}</span>
                       </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => { addItem(product, 1); toast.success('Added to cart!'); onClose(); }}
                        className="flex-1 py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBagIcon className="w-5 h-5" />
                        Add to Cart
                      </button>
                      <Link
                        to={`/products/${product.slug}`}
                        className="px-6 py-4 border border-dark-700 text-white font-bold rounded-xl hover:bg-dark-800 transition-colors"
                      >
                        View Full
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// Update ProductCard to accept onQuickView prop ...

function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <Link
        to={`/products/${product.slug}`}
        className="group flex flex-col sm:flex-row bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-gamertech-500/50 transition-all duration-300"
      >
        <div className="sm:w-64 aspect-[4/3] overflow-hidden relative">
          <img
            src={product.images[0] || '/placeholder-laptop.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 bg-gamertech-500 text-dark-950 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">
              {product.badge}
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gamertech-500 font-medium">{product.brand}</p>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-gamertech-500 transition-colors">
                  {product.name}
                </h3>
              </div>
              <span className="text-2xl font-bold text-gamertech-500">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-3 line-clamp-2">{product.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
               {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                 <span key={key} className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded uppercase font-medium">
                   {value}
                 </span>
               ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
             <span className={cn(
                'px-2 py-1 text-xs rounded font-medium',
                product.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              )}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </span>
              <button className="text-sm font-semibold text-white group-hover:text-gamertech-500 transition-colors flex items-center gap-1">
                View Details <ArrowRightIcon className="w-4 h-4" />
              </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-gamertech-500/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-laptop.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gamertech-500 font-bold tracking-wider uppercase">{product.brand}</p>
        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-gamertech-500 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2 flex-1">{product.description}</p>

        <div className="mt-4 pt-4 border-t border-dark-700 flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className={cn(
            'px-2 py-1 text-[10px] rounded font-bold uppercase tracking-tight',
            product.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          )}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
