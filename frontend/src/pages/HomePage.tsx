import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { productService } from '../services/product.service';
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

// ... existing variants

export default function HomePage() {
// ... existing state and logic ...

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      {/* ... */}

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
      {/* ... existing code ... */}

      {/* Features Section */}
      {/* ... existing code ... */}

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Elite Feedback</h2>
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
              <div className="absolute top-8 right-8 text-dark-800 text-6xl font-serif select-none">"</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gamertech-500 to-gamertech-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-950 mb-6 uppercase tracking-tighter">
              Ready to Level Up?
            </h2>
            <p className="text-dark-950/80 text-xl font-medium mb-10 max-w-2xl mx-auto">
              Join the elite. Get the performance you deserve with our hand-picked gaming machines.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-dark-950 text-white font-black rounded-2xl hover:bg-black transition-all shadow-2xl group"
            >
              <span>Explore the Collection</span>
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ... rest of component

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-gamertech-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gamertech-500/10"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
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
