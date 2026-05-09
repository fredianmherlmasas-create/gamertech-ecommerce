import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-[12rem] font-black text-dark-900 select-none leading-none"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
             <ExclamationTriangleIcon className="w-24 h-24 text-gamertech-500 opacity-80" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Level Not Found</h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          Oops! The page you're searching for seems to have glitched out or moved to another server.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-all group shadow-lg shadow-gamertech-500/20"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Respawn at Home</span>
        </Link>
      </motion.div>
    </div>
  );
}
