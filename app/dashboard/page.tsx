"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Registration } from '@/lib/supabase';
import { Globe, Users, Clock, MapPin, UserPlus } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ delegates: 0, nations: 0, pending: 0 });
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch total count
      const { count: delegateCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

      // Fetch all registrations to compute stats
      const { data: allRegs } = await supabase
        .from('registrations')
        .select('country, status');

      const uniqueNations = new Set(allRegs?.map(r => r.country)).size;
      const pendingCount = allRegs?.filter(r => r.status === 'pending').length || 0;

      setStats({
        delegates: delegateCount || 0,
        nations: uniqueNations,
        pending: pendingCount,
      });

      // Fetch recent registrations
      const { data: recent } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentRegistrations(recent || []);
    };

    fetchData();

    // Real-time subscription
    const channel = supabase
      .channel('registrations-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'registrations',
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Calculate days remaining until Nov 18, 2026
  const eventDate = new Date('2026-11-18');
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight font-display">Command Center</h2>
          <p className="text-slate-400">ICC 2026 Registration Dashboard — Fort Del Pilar, Baguio City</p>
        </div>
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Event Date</p>
                <p className="text-lg font-semibold text-white">Nov 18–22, 2026</p>
            </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} label="Total Registrations" value={stats.delegates} color="text-blue-400" />
        <StatCard icon={<Globe />} label="Countries Represented" value={stats.nations} color="text-amber-400" />
        <StatCard icon={<Clock />} label="Days Until Conference" value={daysRemaining} color="text-emerald-400" />
        <StatCard icon={<UserPlus />} label="Pending Confirmation" value={stats.pending} color="text-purple-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white font-display">Recent Registrations</h3>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {recentRegistrations.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <UserPlus size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No registrations yet. Share the registration link to get started!</p>
              </div>
            ) : (
              recentRegistrations.map((reg) => (
                <RegistrationRow key={reg.id} registration={reg} />
              ))
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white font-display">Conference Info</h3>
          <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <p className="text-amber-500 text-sm font-bold uppercase mb-2 italic">Theme</p>
            <p className="text-slate-200 text-sm leading-relaxed">
              "From Cadets to Catalysts: Transformational Leadership in a Globalized World"
            </p>
          </div>
          <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <p className="text-blue-400 text-sm font-bold uppercase mb-2">Location</p>
            <p className="text-slate-200 text-sm leading-relaxed">
              Philippine Military Academy<br />
              Fort Gregorio del Pilar<br />
              Baguio City, Philippines
            </p>
          </div>
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-emerald-400 text-sm font-bold uppercase mb-2">5-Day Agenda</p>
            <ul className="text-slate-300 text-xs space-y-1.5">
              <li>Day 1 — Arrival & Opening Ceremony</li>
              <li>Day 2 — Lectures & PMA Tour</li>
              <li>Day 3 — Military Forum</li>
              <li>Day 4 — Civilian Forum & Drill</li>
              <li>Day 5 — Baguio Tour & PMA Night</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
      <div className={`mb-4 ${color}`}>{icon}</div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-white mt-1 font-display">{value}</p>
    </div>
  );
}

function RegistrationRow({ registration }: { registration: Registration }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const date = new Date(registration.created_at!);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="flex items-center justify-between p-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
      <div className="flex gap-6 items-center">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
          {registration.full_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-medium">{registration.full_name}</p>
          <p className="text-xs text-slate-500">{registration.academy_name} · {registration.country}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 hidden md:block">{timeAgo}</span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusColors[registration.status || 'pending']}`}>
          {registration.status}
        </span>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
