"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'LEADERSHIP TALKS & LECTURE SERIES',
    color: 'bg-purple-600',
    textColor: 'text-white',
    img: '/pma-assets/gallery-1.jpg',
    size: 'col-span-1 lg:col-span-2',
  },
  {
    title: 'TOUR OF PMA GROUNDS',
    color: 'bg-amber-400',
    textColor: 'text-black',
    img: '/pma-assets/gallery-2.jpg',
    size: 'col-span-1',
  },
  {
    title: 'MULTINATIONAL MILITARY FORUM',
    color: 'bg-orange-500',
    textColor: 'text-white',
    img: '/pma-assets/gallery-3.jpg',
    size: 'col-span-1',
  },
  {
    title: 'CULTURAL EXCHANGE & PMA NIGHT',
    color: 'bg-emerald-500',
    textColor: 'text-white',
    img: '/pma-assets/highlight-2.jpg',
    size: 'col-span-1 lg:col-span-2',
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-black rounded-3xl my-12">
      <div className="flex justify-between items-baseline mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-display">
          Conference Highlights
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`${project.size} ${project.color} ${project.textColor} p-8 rounded-3xl flex flex-col justify-between min-h-[380px] relative overflow-hidden group cursor-pointer shadow-lg`}
          >
            {/* Header / Title */}
            <div className="z-10 flex justify-between items-start">
              <h3 className="text-2xl md:text-3xl font-bold uppercase max-w-md leading-tight font-display">
                {project.title}
              </h3>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight size={24} />
              </div>
            </div>

            {/* Background Image Preview */}
            <div className="absolute inset-0 top-1/3 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 rounded-b-3xl overflow-hidden">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
