import { Link } from 'react-router-dom';

export default function NotFoundPage() { 
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gamertech-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gamertech-500 text-dark-950 font-semibold rounded-lg hover:bg-gamertech-400 transition-colors"
      >
        Go Home
      </Link>
    </div>
  ); 
}
