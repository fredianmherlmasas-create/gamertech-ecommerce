import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShoppingBagIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { productService } from '../services/product.service';
import { useCartStore } from '../hooks/useStore';
import type { Product } from '../types';
import { cn } from '../utils/cn';

const brands = ['Razer', 'ASUS ROG', 'Alienware', 'MSI', 'Lenovo Legion', 'HP Omen', 'Acer Predator'];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Pro Streamer',
    content: 'The Razer Blade I bought from GamerTech is a beast. Fast shipping and the customer support was incredible!',
    rating: 5
  },
  {
    name: 'Marcus Thorne',
    role: 'Software Engineer',
    content: 'Finally found a place that understands high-end specs. The specs filtering made it easy to find exactly what I needed.',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Graphic Designer',
    content: 'Great prices and even better machines. The G14 I got is perfect for both my creative work and gaming nights.',
    rating: 4
  }
];

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
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center bg-dark-950 pt-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[80%] h-[80%] bg-gamertech-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute -bottom-1/4 -left-1/4 w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[120px]"
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-8 rounded-full bg-dark-900/50 border border-dark-800 text-gamertech-500 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md"
            >
              The Next Evolution of Play
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.85] uppercase tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Master the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gamertech-500 via-emerald-400 to-cyan-500">Multiverse</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Unleash raw power with our curated collection of elite gaming rigs. Built for the bold.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link
                to="/products"
                className="w-full sm:w-auto flex items-center justify-center space-x-3 px-12 py-6 bg-gamertech-500 text-dark-950 font-black rounded-2xl hover:bg-gamertech-400 transition-all shadow-[0_0_50px_rgba(34,211,126,0.4)] hover:scale-105 active:scale-95 group"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <span>Shop Elite Gear</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/compare"
                className="w-full sm:w-auto flex items-center justify-center space-x-3 px-12 py-6 border-2 border-dark-700 text-white font-black rounded-2xl hover:border-gamertech-500 hover:bg-gamertech-500/5 transition-all active:scale-95"
              >
                <span>Compare Specs</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Brand Marquee */}
      <section className="bg-dark-900/50 py-10 border-y border-dark-800 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-20 px-10"
          >
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-2xl font-black text-dark-800 uppercase tracking-tighter hover:text-gamertech-500 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Featured <span className="text-gamertech-500">Gear</span>
            </h2>
            <Link
              to="/products"
              className="text-gamertech-500 hover:text-gamertech-400 flex items-center space-x-1 font-bold"
            >
              <span>View All Collection</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-800 rounded-[2rem] h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
      <section className="py-24 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
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

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Elite Feedback</h2>
          <p className="text-gray-400">Join thousands of satisfied gamers who upgraded their setup with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-900 border border-dark-800 p-8 rounded-3xl relative"
            >
              <div className="flex text-gamertech-500 mb-4">
                {[...Array(5)].map((_, star) => (
                  <StarIcon key={star} className={cn("w-4 h-4", star < t.rating ? "fill-current" : "opacity-30")} />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.content}"</p>
              <div>
                <p className="text-white font-bold">{t.name}</p>
                <p className="text-gamertech-500 text-xs font-medium uppercase tracking-widest">{t.role}</p>
              </div>
              <div className="absolute top-8 right-8 text-dark-800 text-6xl font-serif select-none opacity-20">"</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-gamertech-500 to-gamertech-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden group shadow-[0_0_80px_rgba(34,211,126,0.2)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-black text-dark-950 mb-6 uppercase tracking-tighter">
              Ready to Level Up?
            </h2>
            <p className="text-dark-950/80 text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the elite community. Get the performance you deserve with our hand-picked gaming machines.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-4 px-12 py-6 bg-dark-950 text-white font-black rounded-2xl hover:bg-black transition-all shadow-2xl group active:scale-95"
            >
              <span className="text-lg">Explore the Collection</span>
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useCartStore();
  const wishlisted = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-dark-900 border border-dark-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-gamertech-500/50 hover:shadow-[0_0_40px_rgba(34,211,126,0.1)] flex flex-col h-full relative"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.images[0] || '/placeholder-laptop.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.badge && (
          <div className="absolute top-5 left-5 bg-gamertech-500 text-dark-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-2xl z-10">
            {product.badge}
          </div>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-5 right-5 p-3 bg-dark-950/50 backdrop-blur-md hover:bg-dark-950 text-white rounded-2xl transition-all duration-300 z-20 group/heart"
        >
          {wishlisted ? (
            <HeartIconSolid className="w-5 h-5 text-red-500 scale-110" />
          ) : (
            <HeartIcon className="w-5 h-5 group-hover/heart:scale-110 transition-transform" />
          )}
        </button>

        <div className="absolute bottom-5 left-5 right-5 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 z-10">
           <div className="w-full py-3 bg-white text-dark-950 text-center font-black rounded-xl shadow-2xl uppercase tracking-widest text-xs">
              View Details
           </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">{product.brand}</p>
        <h3 className="text-xl font-bold text-white group-hover:text-gamertech-500 transition-colors line-clamp-1 mb-3">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2 flex-1 leading-relaxed">{product.description}</p>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-2xl font-black text-white">
            ${product.price.toFixed(2)}
          </span>
          <span className={cn(
            'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
            product.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          )}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-8 bg-dark-900 border border-dark-800 rounded-[2rem] hover:border-gamertech-500/30 transition-all duration-500 group">
      <div className="w-16 h-16 mx-auto mb-6 bg-gamertech-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <span className="text-gamertech-500 text-3xl font-black">✓</span>
      </div>
      <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
