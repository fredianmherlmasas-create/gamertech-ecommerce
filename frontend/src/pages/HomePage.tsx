import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { productService } from '../services/product.service';
import type { Product } from '../types';
import { cn } from '../utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const products = await productService.getFeaturedProducts(6);
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Failed to load featured products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gamertech-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gamertech-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Level Up Your{' '}
              <span className="text-gamertech-500">Gaming Experience</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover premium gaming laptops from the world's leading brands.
              Power, performance, and portability in one package.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/products"
                className="flex items-center space-x-2 px-8 py-4 bg-gamertech-500 text-dark-950 font-semibold rounded-lg hover:bg-gamertech-400 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Shop Now</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-2 px-8 py-4 border border-gamertech-500 text-gamertech-500 font-semibold rounded-lg hover:bg-gamertech-500/10 transition-colors"
              >
                <span>View All Products</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-gamertech-500 hover:text-gamertech-400 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-dark-800 rounded-lg h-80 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                title="Premium Quality"
                description="All products are carefully selected from top-tier manufacturers with quality assurance."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                title="Fast Shipping"
                description="Express delivery to your doorstep with real-time tracking and secure packaging."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                title="Expert Support"
                description="Our team of gaming experts is here to help you find the perfect laptop."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-gamertech-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gamertech-500/10"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-laptop.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gamertech-500 font-medium">{product.brand}</p>
        <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-gamertech-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gamertech-500">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={cn(
              'px-2 py-1 text-xs rounded',
              product.stock > 0
                ? 'bg-green-500/20 text-green-500'
                : 'bg-red-500/20 text-red-500'
            )}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div className="w-12 h-12 mx-auto mb-4 bg-gamertech-500/20 rounded-lg flex items-center justify-center">
        <span className="text-gamertech-500 text-2xl">✓</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
