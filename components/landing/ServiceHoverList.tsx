"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { id: '01', title: 'MANAGEMENT', color: 'bg-amber-400', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80' },
  { id: '02', title: 'CORPORATE', color: 'bg-purple-500', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80' },
  { id: '03', title: 'CONFERENCE', color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80' },
  { id: '04', title: 'MARKETING', color: 'bg-emerald-400', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80' },
];

export default function ServiceHoverList() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative w-full py-12 px-6 md:px-12 bg-black rounded-3xl overflow-hidden border border-white/10 my-16"
      onMouseMove={handleMouseMove}
    >
      <div className="mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
          We turn events<br />into reality!
        </h2>
        <p className="text-slate-400 max-w-sm text-sm hidden md:block">
          Our experienced professionals are dedicated to creating immersive and interactive experiences that connect brands with customers in unique ways.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-white/10 relative">
        {services.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center justify-between py-8 cursor-pointer transition-colors hover:px-4"
            onMouseEnter={() => setActiveService(item)}
            onMouseLeave={() => setActiveService(null)}
          >
            <div className="flex items-baseline gap-6">
              <span className="text-xs font-mono text-slate-500">{item.id} /</span>
              <h3 className="text-5xl md:text-7xl font-bold text-slate-300 group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-all transform group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Preview Following Mouse */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePos.x - 120,
              y: mousePos.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
            className="pointer-events-none absolute z-30 w-56 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 hidden md:block"
          >
            <img 
              src={activeService.img} 
              alt={activeService.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
