import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowLeftIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  Battery100Icon,
  ScaleIcon,
  StarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { productService } from '../services/product.service';
import { useCartStore } from '../hooks/useStore';
import type { Product } from '../types';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
// ... existing state and logic ...

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ... previous sections (Gallery, Info, Specs) ... */}

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="flex items-center justify-between border-b border-dark-800 pb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-gamertech-500">
                {[...Array(5)].map((_, i) => <StarIconSolid key={i} className="w-5 h-5" />)}
              </div>
              <p className="text-gray-400 font-medium">4.8 out of 5 ({product.reviews?.length || 0} reviews)</p>
            </div>
          </div>
          <button className="px-6 py-3 border border-dark-700 text-white font-bold rounded-xl hover:bg-dark-800 transition-colors">
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900 border border-dark-800 p-8 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center text-gray-500">
                       <UserCircleIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{review.user?.firstName} {review.user?.lastName}</p>
                      <p className="text-xs text-gray-500">{review.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex text-gamertech-500">
                    {[...Array(5)].map((_, i) => (
                      i < review.rating ? <StarIconSolid key={i} className="w-4 h-4" /> : <StarIcon key={i} className="w-4 h-4 text-gray-600" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed italic">"{review.comment}"</p>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-12 bg-dark-900 border border-dashed border-dark-800 rounded-3xl">
              <p className="text-gray-500">No reviews yet. Be the first to review this laptop!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ... rest of component
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProduct(slug!);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="animate-pulse flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 aspect-video bg-dark-800 rounded-2xl" />
          <div className="md:w-1/2 space-y-6">
            <div className="h-10 bg-dark-800 rounded-lg w-3/4" />
            <div className="h-6 bg-dark-800 rounded-lg w-1/4" />
            <div className="h-32 bg-dark-800 rounded-lg" />
            <div className="h-12 bg-dark-800 rounded-lg w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <Link to="/products" className="text-gamertech-500 hover:underline">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/products"
        className="inline-flex items-center text-gray-400 hover:text-gamertech-500 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden bg-dark-800 border border-dark-700"
          >
            <img
              src={product.images[selectedImage] || '/placeholder-laptop.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                    selectedImage === index ? 'border-gamertech-500' : 'border-transparent hover:border-dark-600'
                  )}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gamertech-500 font-bold tracking-widest uppercase mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
              <span className={cn(
                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                product.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              )}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300 gap-3">
                <TruckIcon className="w-5 h-5 text-gamertech-500" />
                <span>Free Express Shipping on all gaming laptops</span>
              </div>
              <div className="flex items-center text-gray-300 gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-gamertech-500" />
                <span>2-Year Manufacturer Warranty included</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex items-center bg-dark-800 border border-dark-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-white font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-gamertech-500 text-dark-950 font-bold rounded-lg hover:bg-gamertech-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-dark-900 border border-dark-800 rounded-2xl p-8 lg:p-12 mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SpecItem icon={CpuChipIcon} label="Processor" value={product.specs.cpu} />
          <SpecItem icon={ComputerDesktopIcon} label="Graphics" value={product.specs.gpu} />
          <SpecItem icon={CpuChipIcon} label="Memory" value={product.specs.ram} />
          <SpecItem icon={ComputerDesktopIcon} label="Display" value={product.specs.display} />
          <SpecItem icon={ComputerDesktopIcon} label="Storage" value={product.specs.storage} />
          {product.specs.battery && <SpecItem icon={Battery100Icon} label="Battery" value={product.specs.battery} />}
          {product.specs.weight && <SpecItem icon={ScaleIcon} label="Weight" value={product.specs.weight} />}
        </div>
      </motion.div>
    </div>
  );
}

function SpecItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gamertech-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-gamertech-500" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}
