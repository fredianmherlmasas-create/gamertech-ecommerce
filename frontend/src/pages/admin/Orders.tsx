import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

// Mock data for orders management
const mockOrders = [
  { id: '1', orderNumber: 'GT-987234', customer: 'John Doe', email: 'john@example.com', date: '2024-05-10', total: 3499.99, status: 'SHIPPED', payment: 'PAID' },
  { id: '2', orderNumber: 'GT-987123', customer: 'Sarah Miller', email: 'sarah@test.com', date: '2024-05-09', total: 1999.99, status: 'DELIVERED', payment: 'PAID' },
  { id: '3', orderNumber: 'GT-987001', customer: 'Alex Rivera', email: 'alex@gamer.io', date: '2024-05-08', total: 2699.99, status: 'PROCESSING', payment: 'PAID' },
  { id: '4', orderNumber: 'GT-986950', customer: 'Mike Ross', email: 'mike@law.com', date: '2024-05-08', total: 1199.99, status: 'PENDING', payment: 'PENDING' },
];

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Orders</h1>
          <p className="text-gray-400 mt-1">Review, update status, and manage customer orders.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-dark-800 border border-dark-700 text-white font-bold rounded-xl hover:bg-dark-700 transition-colors">
          <ArrowDownTrayIcon className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-dark-800 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative max-w-md w-full">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by order # or customer..."
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gamertech-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-dark-800 border border-dark-700 text-gray-400 rounded-xl hover:text-white transition-colors">
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-800/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-dark-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-bold">#{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white">${order.total.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-green-500">{order.payment}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      order.status === 'DELIVERED' ? "bg-green-500/10 text-green-500" :
                      order.status === 'PENDING' ? "bg-yellow-500/10 text-yellow-500" : "bg-blue-500/10 text-blue-500"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gamertech-500 transition-colors">
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
