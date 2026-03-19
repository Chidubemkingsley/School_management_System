import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LayoutDashboard, Users, UserCog, ShieldAlert, GraduationCap } from 'lucide-react';

import Dashboard from './Dashboard';
import Students from './Students';
import Staff from './Staff';
import Admin from './Admin';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { id: 'students', label: 'Students', icon: Users, component: Students },
  { id: 'staff', label: 'Staff', icon: UserCog, component: Staff },
  { id: 'admin', label: 'Admin', icon: ShieldAlert, component: Admin },
];

export default function Layout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-hidden relative font-sans">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-neutral-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">EduChain</h1>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                  <span className="font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <ConnectButton showBalance={false} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
