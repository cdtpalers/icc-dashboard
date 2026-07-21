"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import ServiceHoverList from '@/components/landing/ServiceHoverList';
import CounterCard from '@/components/landing/CounterCard';
import FeaturedWork from '@/components/landing/FeaturedWork';
import TimelineSection from '@/components/landing/TimelineSection';
import InlineAvatars from '@/components/landing/InlineAvatars';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex flex-col items-center py-4">
      
      {/* Floating Header */}
      <header className="fixed top-8 z-50 w-full max-w-4xl px-4">
        <div className="bg-white text-black rounded-full px-8 py-3 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span>ICC</span>
            <span className="text-slate-400 font-normal">| 2024</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#work" className="hover:text-blue-600 transition-colors">Featured Work</a>
            <a href="#timeline" className="hover:text-blue-600 transition-colors">Timeline</a>
          </nav>

          <Link href="/dashboard" className="bg-[#111] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors">
            <span>Dashboard</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section Container */}
      <main className="w-full max-w-[96vw] mt-20 mb-6 border-[1px] border-white/20 rounded-[3rem] relative flex flex-col overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#050505]">
        
        {/* Hero Top */}
        <div className="w-full pt-16 md:pt-24 px-8 md:px-16 flex flex-col z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-400 text-xs md:text-sm tracking-widest uppercase mb-2"
          >
            EVENT STUDIO
          </motion.p>
          
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between relative">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-tighter leading-none z-10 drop-shadow-lg"
            >
              ICC 2024
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-left lg:text-right text-slate-300 max-w-[250px] text-xs md:text-sm uppercase tracking-wider mb-2 lg:mb-8 z-10"
            >
              Organizers of emotional and unforgettable events
            </motion.p>
          </div>
        </div>

        {/* Hero 3D Illustration Area */}
        <div className="relative w-full flex-1 min-h-[45vh] lg:min-h-[55vh] flex justify-center items-end overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

          <img 
            src="/landing_bg.jpg" 
            alt="Event 3D Illustration"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90 scale-105"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            }}
          />
        </div>
      </main>

      {/* Kinetic Kinetic Headline Section */}
      <section id="about" className="w-full max-w-[96vw] bg-white text-black rounded-3xl p-12 md:p-24 my-6">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
        >
          Organizers of<br />
          emotional<br />
          super events
        </motion.h2>
        <p className="text-slate-600 max-w-xl text-base md:text-lg leading-relaxed">
          We are a team of professionals creating unique events for you. Whether it is a corporate event, wedding or festival, we strive to make every event special.
        </p>
      </section>

      {/* Featured Work Grid */}
      <div id="work" className="w-full max-w-[96vw]">
        <FeaturedWork />
      </div>

      {/* Category / Services Hover List */}
      <div className="w-full max-w-[96vw]">
        <ServiceHoverList />
      </div>

      {/* Timeline Section */}
      <div id="timeline" className="w-full max-w-[96vw]">
        <TimelineSection />
      </div>

      {/* Inline Avatars Kinetic Headline */}
      <div className="w-full max-w-[96vw]">
        <InlineAvatars />
      </div>

      {/* Stats Counter Section */}
      <section className="w-full max-w-[96vw] grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <CounterCard 
          category="Blog"
          label="Our Latest Articles"
          targetValue={3}
          suffix=" Articles"
          bgColor="bg-purple-600"
          textColor="text-white"
        />
        <CounterCard 
          category="Success"
          label="Closed Projects"
          targetValue={304}
          bgColor="bg-amber-400"
          textColor="text-black"
        />
        <CounterCard 
          category="Confidence"
          label="Google Reviews Rating"
          targetValue={4.9}
          decimals={1}
          suffix=" ★"
          bgColor="bg-white"
          textColor="text-black"
        />
      </section>

      {/* Kinetic Footer */}
      <footer className="w-full max-w-[96vw] bg-[#050505] border border-white/10 rounded-3xl p-12 md:p-20 my-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-16 mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">
              ICC 2024
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 text-sm">
            <div>
              <p className="text-slate-500 uppercase font-mono mb-4">Follow Us</p>
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold">B</span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold">♪</span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold">X</span>
              </div>
            </div>

            <div>
              <p className="text-slate-500 uppercase font-mono mb-4">Contact Us</p>
              <p className="text-lg font-bold">hello@icc2024.com</p>
              <p className="text-slate-400">+61 195 234 567</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-3 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Subscribe to our newsletter" 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-64"
            />
            <button className="bg-white text-black p-2 rounded-full hover:bg-slate-200 transition-colors">
              <Send size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-500">
            © 2024 ICC Philippine Military Academy. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
