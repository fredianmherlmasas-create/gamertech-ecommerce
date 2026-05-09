import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

// Mock orders for demo purposes
const mockOrders = [
  {
    id: '1',
    orderNumber: 'GT-987234',
    date: '2024-05-10',
    status: 'SHIPPED',
    totalAmount: 3499.99,
    itemsCount: 1,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    orderNumber: 'GT-987123',
    date: '2024-04-15',
    status: 'DELIVERED',
    totalAmount: 1999.99,
    itemsCount: 1,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Orders</h1>
        <p className="text-gray-400 mt-2">Track and manage your recent gaming gear purchases.</p>
      </div>

      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden hover:border-gamertech-500/30 transition-all group"
            >
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-dark-800 flex-shrink-0">
                  <img src={order.image} alt={order.orderNumber} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Order Number</p>
                      <h3 className="text-lg font-bold text-white group-hover:text-gamertech-500 transition-colors">#{order.orderNumber}</h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Placed On</p>
                      <p className="text-white font-medium">{order.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-dark-800/50">
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Amount</p>
                        <p className="text-lg font-bold text-white">${order.totalAmount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Status</p>
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          order.status === 'DELIVERED' ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                        )}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 text-sm font-bold text-gamertech-500 hover:text-gamertech-400 group/link"
                    >
                      View Full Details
                      <ChevronRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark-900 border border-dark-800 rounded-3xl">
          <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg">You haven't placed any orders yet.</p>
          <Link to="/products" className="mt-4 inline-block text-gamertech-500 font-bold hover:underline">
            Browse Laptops
          </Link>
        </div>
      )}
    </div>
  );
}
