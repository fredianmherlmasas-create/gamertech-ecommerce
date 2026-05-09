import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Revenue', value: '$45,231.89', icon: CurrencyDollarIcon, color: 'text-gamertech-500', trend: '+12.5%' },
  { name: 'Total Orders', value: '156', icon: ShoppingBagIcon, color: 'text-blue-500', trend: '+8.2%' },
  { name: 'Total Customers', value: '2,345', icon: UserGroupIcon, color: 'text-purple-500', trend: '+3.1%' },
  { name: 'Conversion Rate', value: '4.2%', icon: ArrowTrendingUpIcon, color: 'text-green-500', trend: '+1.5%' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Overview of your store's performance and activity.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            className="bg-dark-900 border border-dark-800 p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-dark-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-dark-800 last:border-0">
                <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400">
                  {i % 2 === 0 ? '📦' : '👤'}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    {i % 2 === 0 ? 'New order #GT-3421 placed' : 'New customer registered'}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Inventory Alerts</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
               <div>
                 <p className="text-sm font-bold text-red-500">Razer Blade 16</p>
                 <p className="text-xs text-red-400/80">Only 2 units remaining</p>
               </div>
               <button className="text-xs font-bold text-white bg-red-500 px-3 py-1.5 rounded-lg">Restock</button>
             </div>
             <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
               <div>
                 <p className="text-sm font-bold text-yellow-500">Alienware m18 R2</p>
                 <p className="text-xs text-yellow-400/80">Only 5 units remaining</p>
               </div>
               <button className="text-xs font-bold text-white bg-yellow-500 px-3 py-1.5 rounded-lg">Restock</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
