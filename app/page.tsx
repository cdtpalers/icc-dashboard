"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Globe, Users, Clock, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ delegates: 0, nations: 0 });

  useEffect(() => {
    // Fetch initial counts from Supabase
    const fetchStats = async () => {
      const { count: delegateCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { data: nations } = await supabase.from('profiles').select('country_code');
      const uniqueNations = new Set(nations?.map(n => n.country_code)).size;
      setStats({ delegates: delegateCount || 0, nations: uniqueNations });
    };
    fetchStats();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Command Center</h2>
          <p className="text-slate-400">Welcome back, Cadet. Current location: Fort Del Pilar.</p>
        </div>
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Weather</p>
                <p className="text-lg font-semibold text-white">22°C Baguio City</p>
            </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} label="Total Delegates" value={stats.delegates} color="text-blue-400" />
        <StatCard icon={<Globe />} label="Participating Nations" value={stats.nations} color="text-amber-400" />
        <StatCard icon={<Clock />} label="Days Remaining" value="03" color="text-emerald-400" />
        <StatCard icon={<MapPin />} label="Active Venues" value="08" color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule Preview */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white">Today's Itinerary</h3>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <ScheduleItem time="08:00" title="Opening Ceremony" location="Rex Hall" status="Completed" />
            <ScheduleItem time="10:30" title="Plenary Session: Global Security" location="Melchor Hall" status="Live" />
            <ScheduleItem time="13:00" title="Lunch Break" location="Mess Hall" status="Upcoming" />
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Announcements</h3>
          <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <p className="text-amber-500 text-sm font-bold uppercase mb-2 italic">Immediate Alert</p>
            <p className="text-slate-200 text-sm leading-relaxed">
              All delegates are requested to proceed to the Longayban Hall for the Photo Op in Full Dress White.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
      <div className={`mb-4 ${color}`}>{icon}</div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

function ScheduleItem({ time, title, location, status }: any) {
  return (
    <div className="flex items-center justify-between p-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
      <div className="flex gap-6 items-center">
        <span className="text-slate-400 font-mono">{time}</span>
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-xs text-slate-500">{location}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
        status === 'Live' ? 'bg-red-500/20 text-red-500 animate-pulse' : 
        status === 'Completed' ? 'bg-slate-500/20 text-slate-500' : 'bg-blue-500/20 text-blue-500'
      }`}>
        {status}
      </span>
    </div>
  );
}
