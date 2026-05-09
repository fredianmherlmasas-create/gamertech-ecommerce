import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! Our team will get back to you within 24 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Get in <span className="text-gamertech-500">Touch</span>
        </motion.h1>
        <p className="text-gray-400 text-lg">
          Have questions about a laptop? Need technical support? Our team of gaming experts is ready to help you gear up.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <ContactCard
            icon={PhoneIcon}
            title="Call Us"
            detail="+1 (888) 555-4263"
            description="Mon-Fri from 9am to 6pm EST."
          />
          <ContactCard
            icon={EnvelopeIcon}
            title="Email Support"
            detail="support@gamertech.com"
            description="We usually respond within 4 hours."
          />
          <ContactCard
            icon={MapPinIcon}
            title="Visit Our HQ"
            detail="1337 Neon Street, Silicon Valley, CA"
            description="The heart of high-performance gaming."
          />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-900 border border-dark-800 rounded-3xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gamertech-500 transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gamertech-500 transition-colors"
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                <select className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gamertech-500 transition-colors appearance-none">
                   <option>Sales Inquiry</option>
                   <option>Technical Support</option>
                   <option>Order Status</option>
                   <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gamertech-500 transition-colors resize-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gamertech-500 text-dark-950 font-bold rounded-xl hover:bg-gamertech-400 transition-all flex items-center justify-center space-x-2 group"
                >
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                  <span>Send Transmission</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, detail, description }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-dark-900 border border-dark-800 p-6 rounded-2xl flex items-start gap-4"
    >
      <div className="p-3 bg-gamertech-500/10 rounded-xl text-gamertech-500">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-white font-bold mb-1">{title}</h3>
        <p className="text-gamertech-500 font-medium mb-1">{detail}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
