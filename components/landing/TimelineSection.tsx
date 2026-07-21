"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';

const timelineSteps = [
  {
    step: '01',
    title: 'RESEARCH AND CONSULTATION',
    description: 'Conducting meetings with the client to discuss goals, budget, and wishes. Preparing a preliminary concept and estimating costs.',
    img: '/pma-assets/highlight-1.jpg',
    color: 'bg-amber-400 text-black',
  },
  {
    step: '02',
    title: 'PLANNING AND CONCEPT CREATION',
    description: 'Development of a detailed event plan, including the choice of venue, theme, program and structure of the event.',
    img: '/pma-assets/highlight-2.jpg',
    color: 'bg-purple-600 text-white',
  },
  {
    step: '03',
    title: 'EXECUTION AND LIVE MANAGEMENT',
    description: 'On-site coordination, technical setup, guest management, and live stage direction for a flawless experience.',
    img: '/pma-assets/gallery-3.jpg',
    color: 'bg-blue-600 text-white',
  },
];

export default function TimelineSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStep = () => {
    setCurrentIndex((prev) => (prev + 1) % timelineSteps.length);
  };

  const prevStep = () => {
    setCurrentIndex((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#050505] text-white rounded-3xl my-12 border border-white/10">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Our Timeline
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={prevStep}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={nextStep}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {timelineSteps.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.98 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl p-8 flex flex-col justify-between h-[420px] relative overflow-hidden ${
                isActive ? 'border-2 border-amber-400 shadow-2xl' : 'border border-white/10'
              } ${item.color}`}
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-sm font-mono font-bold uppercase tracking-wider px-3 py-1 bg-black/20 rounded-full">
                  Phase {item.step}
                </span>
              </div>

              <div className="z-10">
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm opacity-90 leading-relaxed max-w-sm mb-6">
                  {item.description}
                </p>
                <button className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase flex items-center gap-2 hover:bg-slate-800 transition-colors">
                  <Users size={14} />
                  <span>Meet the Team</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
