import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '../hooks/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

type Step = 'shipping' | 'payment' | 'review' | 'success';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('shipping');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
        <Link to="/products" className="text-gamertech-500 hover:underline">
          Back to shopping
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('review');
    else if (step === 'review') handlePlaceOrder();
  };

  const prevStep = () => {
    if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };

  const handlePlaceOrder = () => {
    // Simulate API call
    const loadingToast = toast.loading('Processing your order...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-900 border border-dark-800 rounded-3xl p-12"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. We've sent a confirmation email to <strong>{formData.email}</strong>.
            Your gaming gear will be shipped shortly.
          </p>
          <div className="space-y-4">
            <Link
              to="/products"
              className="block w-full py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="block w-full py-4 border border-dark-700 text-white font-bold rounded-xl hover:bg-dark-800 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-8">
            <StepIndicator currentStep={step} stepId="shipping" label="Shipping" />
            <div className="w-12 h-px bg-dark-800" />
            <StepIndicator currentStep={step} stepId="payment" label="Payment" />
            <div className="w-12 h-px bg-dark-800" />
            <StepIndicator currentStep={step} stepId="review" label="Review" />
          </div>

          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8">
            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                  <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  <Input label="Shipping Address" name="address" value={formData.address} onChange={handleInputChange} />
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
                    <Input label="State" name="state" value={formData.state} onChange={handleInputChange} />
                    <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                  <div className="p-4 bg-dark-800 rounded-xl border border-gamertech-500/30 flex items-center gap-4 mb-8">
                    <CreditCardIcon className="w-8 h-8 text-gamertech-500" />
                    <div>
                      <p className="text-white font-medium">Credit Card</p>
                      <p className="text-xs text-gray-500">Secure payment via Stripe</p>
                    </div>
                  </div>
                  <Input label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" name="cardExpiry" placeholder="MM/YY" value={formData.cardExpiry} onChange={handleInputChange} />
                    <Input label="CVC" name="cardCvc" placeholder="000" value={formData.cardCvc} onChange={handleInputChange} />
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Review Order</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Shipping To</h3>
                      <p className="text-white">{formData.firstName} {formData.lastName}</p>
                      <p className="text-gray-400">{formData.address}</p>
                      <p className="text-gray-400">{formData.city}, {formData.state} {formData.zipCode}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Payment</h3>
                      <p className="text-white">Credit Card</p>
                      <p className="text-gray-400">Card ending in {formData.cardNumber.slice(-4)}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-dark-800">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Items</h3>
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <span className="text-gray-300">{item.quantity}x {item.product.name}</span>
                        <span className="text-white font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-dark-800">
              {step !== 'shipping' ? (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Go Back</span>
                </button>
              ) : (
                <Link to="/cart" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Return to Cart</span>
                </Link>
              )}

              <button
                onClick={nextStep}
                className="px-10 py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-all flex items-center space-x-2 group"
              >
                <span>{step === 'review' ? 'Place Order' : 'Continue'}</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({itemCount} items)</span>
                <span className="text-white">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">FREE</span>
              </div>
              <div className="pt-4 border-t border-dark-800 flex justify-between">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-gamertech-500">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-dark-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <ShieldCheckIcon className="w-5 h-5 text-gamertech-500" />
                <span>Secure SSL encrypted checkout</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <TruckIcon className="w-5 h-5 text-gamertech-500" />
                <span>Fast & Free shipping included</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepIndicator({ currentStep, stepId, label }: { currentStep: Step; stepId: Step; label: string }) {
  const steps: Step[] = ['shipping', 'payment', 'review', 'success'];
  const currentIndex = steps.indexOf(currentStep);
  const stepIndex = steps.indexOf(stepId);
  const isActive = currentStep === stepId;
  const isCompleted = currentIndex > stepIndex;

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
        isActive ? 'bg-gamertech-500 text-dark-950 scale-110 shadow-lg shadow-gamertech-500/20' :
        isCompleted ? 'bg-green-500 text-white' : 'bg-dark-800 text-gray-500'
      )}>
        {isCompleted ? '✓' : stepIndex + 1}
      </div>
      <span className={cn(
        'text-sm font-medium transition-colors',
        isActive ? 'text-white' : 'text-gray-500'
      )}>
        {label}
      </span>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        {...props}
        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gamertech-500 transition-colors placeholder:text-gray-600"
      />
    </div>
  );
}
