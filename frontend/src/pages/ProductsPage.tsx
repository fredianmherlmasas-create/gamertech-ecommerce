import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { productService } from '../services/product.service';
import { useCartStore } from '../hooks/useStore';
import type { Product } from '../types';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    loadData();
  }, [category, brand, search]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productsRes, brandsRes] = await Promise.all([
        productService.getProducts({ category, brand, search, limit: 20 }),
        productService.getBrands(),
      ]);
      setProducts(productsRes.data);
      setBrands(brandsRes);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Laptops` : 'All Laptops'}
          </h1>
          <p className="text-gray-400 mt-2">{products.length} products found</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-dark-800 rounded-lg p-1 border border-dark-700">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-gamertech-500 text-dark-950' : 'text-gray-400 hover:text-white'
              )}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-gamertech-500 text-dark-950' : 'text-gray-400 hover:text-white'
              )}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
              <FunnelIcon className="w-4 h-4 text-gamertech-500" />
              Brands
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => updateFilters('brand', '')}
                className={cn(
                  'block w-full text-left px-3 py-2 rounded-md transition-colors',
                  !brand ? 'bg-gamertech-500/10 text-gamertech-500' : 'text-gray-400 hover:text-white hover:bg-dark-800'
                )}
              >
                All Brands
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => updateFilters('brand', b)}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md transition-colors',
                    brand === b ? 'bg-gamertech-500/10 text-gamertech-500' : 'text-gray-400 hover:text-white hover:bg-dark-800'
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-800 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              )}
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-dark-900 rounded-2xl border border-dark-800">
              <p className="text-gray-400">No products found matching your criteria.</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 text-gamertech-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
