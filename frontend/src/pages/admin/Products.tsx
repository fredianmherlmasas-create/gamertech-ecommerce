import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { productService } from '../../services/product.service';
import type { Product } from '../../types';
import { cn } from '../../utils/cn';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProducts({ limit: 50 });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <p className="text-gray-400 mt-1">Add, edit, or remove products from your catalog.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-colors">
          <PlusIcon className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-dark-800">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gamertech-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-800/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Brand</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8"><div className="h-4 bg-dark-800 rounded w-full" /></td>
                  </tr>
                ))
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-dark-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-800 shrink-0">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{product.brand}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest",
                      product.stock > 10 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-gamertech-500 transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
