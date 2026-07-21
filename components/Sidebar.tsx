"use client";
import { Home, Calendar, Users, FileText, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Schedule' },
  { icon: Users, label: 'Delegates' },
  { icon: FileText, label: 'Documents' },
  { icon: ShieldCheck, label: 'Admin' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col py-8 px-4">
      <div className="px-4 mb-12">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
          ICC 2024
        </h1>
        <p className="text-xs text-slate-500 font-medium">PMA, PHILIPPINES</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
