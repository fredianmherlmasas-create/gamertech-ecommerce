import { motion } from 'framer-motion';
import { UserCircleIcon, KeyIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../hooks/useStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  const settingsOptions = [
    { name: 'Account Information', description: 'Update your personal details and email', icon: UserCircleIcon },
    { name: 'Security', description: 'Manage your password and security settings', icon: KeyIcon },
    { name: 'Notifications', description: 'Configure how you receive alerts', icon: BellIcon },
    { name: 'Privacy', description: 'Control your data and visibility', icon: ShieldCheckIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account preferences and personal information.</p>

        <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden mb-8">
          <div className="p-8 border-b border-dark-800 flex items-center gap-6">
            <div className="w-20 h-20 bg-gamertech-500/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-gamertech-500">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-400">{user?.email}</p>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gamertech-500/10 text-gamertech-500 text-[10px] font-bold uppercase tracking-widest rounded">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-dark-800">
            {settingsOptions.map((option, index) => (
              <motion.button
                key={option.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex items-center gap-4 p-6 hover:bg-dark-800/50 transition-colors text-left group"
              >
                <div className="p-3 bg-dark-800 rounded-xl group-hover:bg-dark-700 transition-colors">
                  <option.icon className="w-6 h-6 text-gray-400 group-hover:text-gamertech-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{option.name}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-dark-800 border border-dark-700 text-white font-bold rounded-2xl hover:bg-dark-700 transition-colors">
          Save All Changes
        </button>
      </div>
    </div>
  );
}
