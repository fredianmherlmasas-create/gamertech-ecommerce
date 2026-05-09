import { motion } from 'framer-motion';
import { mockProducts } from '../services/mockData';
import { CheckIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../hooks/useStore';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ComparePage() {
  const addItem = useCartStore((state) => state.addItem);

  // We'll compare the first 3 featured products for the demo
  const compareItems = mockProducts.slice(0, 3);

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const features = [
    { label: 'Processor', key: 'cpu' },
    { label: 'Graphics', key: 'gpu' },
    { label: 'Memory', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display', key: 'display' },
    { label: 'Price', key: 'price', format: (val: number) => `$${val.toFixed(2)}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
          Tech <span className="text-gamertech-500">Battle</span>
        </h1>
        <p className="text-gray-400 text-lg">Side-by-side spec comparison of the world's most powerful gaming machines.</p>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-dark-800 bg-dark-900 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-8 bg-dark-950/50 w-64 border-b border-dark-800">
                 <span className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Specs Matrix</span>
              </th>
              {compareItems.map((product) => (
                <th key={product.id} className="p-8 bg-dark-950/50 min-w-[280px] border-b border-dark-800">
                  <div className="space-y-4">
                    <img src={product.images[0]} alt="" className="w-full aspect-video object-cover rounded-2xl border border-dark-700 shadow-lg" />
                    <div>
                      <p className="text-gamertech-500 text-[10px] font-black uppercase tracking-widest mb-1">{product.brand}</p>
                      <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {features.map((feature) => (
              <tr key={feature.key} className="hover:bg-dark-800/20 transition-colors">
                <td className="p-8 text-sm font-bold text-gray-400 uppercase tracking-widest bg-dark-950/20">
                  {feature.label}
                </td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-8 text-white font-medium">
                    {feature.format ? feature.format((product as any)[feature.key]) : (product.specs as any)[feature.key]}
                  </td>
                ))}
              </tr>
            ))}
            {/* Added Value Row */}
            <tr className="hover:bg-dark-800/20 transition-colors">
               <td className="p-8 text-sm font-bold text-gray-400 uppercase tracking-widest bg-dark-950/20">Free Shipping</td>
               {compareItems.map((p) => (
                 <td key={p.id} className="p-8 text-green-500"><CheckIcon className="w-6 h-6" /></td>
               ))}
            </tr>
            <tr className="hover:bg-dark-800/20 transition-colors">
               <td className="p-8 text-sm font-bold text-gray-400 uppercase tracking-widest bg-dark-950/20">In Stock</td>
               {compareItems.map((p) => (
                 <td key={p.id} className="p-8 text-green-500"><CheckIcon className="w-6 h-6" /></td>
               ))}
            </tr>
            {/* Actions Row */}
            <tr>
              <td className="p-8 bg-dark-950/20"></td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-8">
                  <div className="space-y-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-all flex items-center justify-center gap-2 group"
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                      Buy Now
                    </button>
                    <Link
                      to={`/products/${product.slug}`}
                      className="block text-center text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      Full Details
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Comparison Legend */}
      <div className="mt-12 flex flex-wrap justify-center gap-8">
         <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-gamertech-500" />
            <span>Premium Warranty Included</span>
         </div>
         <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Elite Support Access</span>
         </div>
      </div>
    </div>
  );
}
