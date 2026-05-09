import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  TruckIcon,
  CreditCardIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Mock data for order details
  const order = {
    id: id || '1',
    orderNumber: 'GT-987234',
    date: 'May 10, 2024',
    status: 'SHIPPED',
    totalAmount: 3499.99,
    shippingAddress: {
      street: '123 Gaming Street',
      city: 'Tech City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'Visa ending in 4242',
    items: [
      {
        id: 'p1',
        name: 'Razer Blade 16',
        brand: 'Razer',
        price: 3499.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/orders"
        className="inline-flex items-center text-gray-400 hover:text-gamertech-500 mb-8 transition-colors group"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to My Orders
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Order Details</h1>
          <p className="text-gray-400">Order #{order.orderNumber} • Placed on {order.date}</p>
        </div>
        <div className={cn(
          "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest",
          order.status === 'DELIVERED' ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
        )}>
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Items */}
          <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-dark-800">
              <h2 className="text-lg font-bold text-white">Order Items</h2>
            </div>
            <div className="divide-y divide-dark-800">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-dark-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gamertech-500 uppercase tracking-widest">{item.brand}</p>
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Simulation */}
          <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-white mb-8">Shipping Status</h2>
            <div className="space-y-8">
              <TrackStep title="Order Placed" date="May 10, 10:30 AM" isCompleted />
              <TrackStep title="Payment Confirmed" date="May 10, 10:35 AM" isCompleted />
              <TrackStep title="Shipped from Warehouse" date="May 11, 02:15 PM" isCompleted />
              <TrackStep title="Out for Delivery" date="Estimated: May 13" />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-white mb-6">Delivery Address</h2>
            <div className="flex gap-4">
              <MapPinIcon className="w-6 h-6 text-gamertech-500 shrink-0" />
              <div className="text-sm text-gray-300 leading-relaxed">
                <p className="font-bold text-white">Home Address</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-white mb-6">Payment</h2>
            <div className="flex gap-4 mb-6">
              <CreditCardIcon className="w-6 h-6 text-gamertech-500 shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-bold text-white">Payment Method</p>
                <p>{order.paymentMethod}</p>
              </div>
            </div>
            <div className="pt-6 border-t border-dark-800 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-white">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-dark-800">
                <span className="text-white font-bold">Total Paid</span>
                <span className="text-gamertech-500 font-bold text-lg">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackStep({ title, date, isCompleted = false }: { title: string; date: string; isCompleted?: boolean }) {
  return (
    <div className="flex gap-4 relative">
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
        isCompleted ? "bg-gamertech-500 text-dark-950" : "bg-dark-800 text-gray-600"
      )}>
        {isCompleted ? <CheckCircleIcon className="w-4 h-4" /> : <div className="w-2 h-2 bg-current rounded-full" />}
      </div>
      <div className="flex-1">
        <h4 className={cn("font-bold text-sm", isCompleted ? "text-white" : "text-gray-500")}>{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
      {/* Line connecting steps */}
      <div className="absolute left-[11px] top-6 bottom-[-32px] w-0.5 bg-dark-800 last:hidden" />
    </div>
  );
}
