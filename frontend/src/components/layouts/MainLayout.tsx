import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useCartStore, useUIStore } from '../../hooks/useStore';
import { authService } from '../../services/auth.service';
import { cn } from '../../utils/cn';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useUIStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gamertech-500">Gamer</span>
              <span className="text-2xl font-bold text-white">Tech</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-gamertech-500 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-gamertech-500 transition-colors">
                Products
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gamertech-500 hover:text-gamertech-400 transition-colors">
                  Admin
                </Link>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-300 hover:text-gamertech-500 transition-colors">
                <ShoppingCartIcon className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gamertech-500 text-dark-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-300 hover:text-gamertech-500 transition-colors"
                  >
                    <UserIcon className="w-6 h-6" />
                    <span className="hidden sm:block text-sm">{user?.firstName}</span>
                  </button>

                  <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-md shadow-lg py-1 border border-dark-700"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-gamertech-500"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-gamertech-500"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gamertech-500 text-dark-950 font-semibold rounded-md hover:bg-gamertech-400 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-gamertech-500"
              >
                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-900 border-b border-dark-800">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-300 hover:text-gamertech-500 hover:bg-dark-800 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block px-3 py-2 text-gray-300 hover:text-gamertech-500 hover:bg-dark-800 rounded-md"
                >
                  Products
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 text-gray-300 hover:text-gamertech-500 hover:bg-dark-800 rounded-md"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-300 hover:text-gamertech-500 hover:bg-dark-800 rounded-md"
                    >
                      Profile
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-gamertech-500 hover:bg-dark-800 rounded-md"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem-4rem)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">GamerTech</h3>
              <p className="text-gray-400 text-sm">
                Premium gaming laptops for enthusiasts and professionals. Quality products, competitive prices.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-gamertech-500">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-gamertech-500">Products</Link></li>
                <li><Link to="/cart" className="text-gray-400 hover:text-gamertech-500">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/orders" className="text-gray-400 hover:text-gamertech-500">My Orders</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-gamertech-500">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">support@gamertech.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} GamerTech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
