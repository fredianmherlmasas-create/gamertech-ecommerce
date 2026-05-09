import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
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
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <span className="text-2xl font-bold text-gamertech-500">Gamer</span>
              <span className="text-2xl font-bold text-white">Tech</span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search laptops, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gamertech-500 transition-colors"
                />
              </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 mr-8">
              <Link to="/" className="text-sm font-bold text-gray-400 hover:text-gamertech-500 transition-colors uppercase tracking-widest">
                Home
              </Link>
              <Link to="/products" className="text-sm font-bold text-gray-400 hover:text-gamertech-500 transition-colors uppercase tracking-widest">
                Products
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-bold text-gamertech-500 hover:text-gamertech-400 transition-colors uppercase tracking-widest">
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
                  <span className="absolute -top-1 -right-1 bg-gamertech-500 text-dark-950 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1 pl-3 border border-dark-700 rounded-full text-gray-300 hover:border-gamertech-500 transition-colors"
                  >
                    <span className="hidden sm:block text-xs font-bold">{user?.firstName}</span>
                    <div className="w-8 h-8 rounded-full bg-gamertech-500 flex items-center justify-center text-dark-950 font-bold">
                       {user?.firstName?.charAt(0)}
                    </div>
                  </button>

                  <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-dark-900 border border-dark-800 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Settings
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-3 text-sm text-gray-400 hover:bg-dark-800 hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Order History
                      </Link>
                      <div className="h-px bg-dark-800 mx-2 my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gamertech-500 text-dark-950 text-sm font-bold rounded-xl hover:bg-gamertech-400 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-gamertech-500 transition-colors"
              >
                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search & Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden bg-dark-900 border-t border-dark-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-6">
                <form onSubmit={handleSearch} className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-600 focus:outline-none"
                  />
                </form>

                <div className="space-y-2">
                  <Link to="/" className="block px-4 py-3 text-lg font-bold text-white hover:bg-dark-800 rounded-xl">
                    Home
                  </Link>
                  <Link to="/products" className="block px-4 py-3 text-lg font-bold text-white hover:bg-dark-800 rounded-xl">
                    Products
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-3 text-lg font-bold text-gamertech-500 hover:bg-dark-800 rounded-xl">
                      Admin Dashboard
                    </Link>
                  )}
                </div>
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
