"use client";
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceHoverList from '@/components/landing/ServiceHoverList';
import CounterCard from '@/components/landing/CounterCard';
import FeaturedWork from '@/components/landing/FeaturedWork';
import TimelineSection from '@/components/landing/TimelineSection';
import InlineAvatars from '@/components/landing/InlineAvatars';

const heroImages = [
  { src: '/pma-assets/highlight-1.jpg', alt: 'PMA Cadets Parade' },
  { src: '/pma-assets/highlight-2.jpg', alt: 'PMA Grounds & Ceremony' },
  { src: '/pma-assets/gallery-1.jpg', alt: 'International Cadets Forum' },
  { src: '/pma-assets/gallery-2.jpg', alt: 'PMA Cadets Formation' },
  { src: '/pma-assets/gallery-3.jpg', alt: 'Cadets Drill Performance' },
];

export default function LandingPage() {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex flex-col items-center py-4 font-sans">
      
      {/* Floating Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        className="fixed top-8 z-50 w-full max-w-4xl px-4"
      >
        <div className="bg-[#0A0A0A]/85 backdrop-blur-xl border border-white/20 text-white rounded-full px-8 py-3 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-white/40 transition-all duration-500">
          <div className="flex items-center gap-4 font-bold text-lg">
            <div className="bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              <img src="/pma-assets/pma-logo.png" alt="PMA Logo" className="h-7 w-auto" />
            </div>
            <div className="bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
              <img src="/pma-assets/icc-logo.png" alt="ICC 2026" className="h-7 w-auto" />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">About</a>
            <a href="#work" className="text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Highlights</a>
            <a href="#timeline" className="text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Agenda</a>
            <Link href="/dashboard" className="text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Dashboard</Link>
          </nav>

          <Link href="/register" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
            <span>Register</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.header>

      {/* Hero Banner Container */}
      <main ref={containerRef} className="w-full max-w-[96vw] mt-20 mb-6 border-[1px] border-white/20 rounded-[3rem] relative flex flex-col overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#050505] min-h-[55vh] lg:min-h-[75vh]">
        
        {/* Banner Image Area & Slideshow */}
        <div className="relative w-full flex-1 flex justify-center items-center overflow-hidden h-full min-h-[55vh] lg:min-h-[75vh]">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ y }}
              src={heroImages[currentSlide].src} 
              alt={heroImages[currentSlide].alt}
              className="absolute inset-0 w-full h-full object-cover object-center origin-top"
            />
          </AnimatePresence>

          {/* Subtle overlay to enhance contrast for the text */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="z-10 flex flex-col items-center text-center px-4 my-auto py-16"
          >
            <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter leading-[0.9] drop-shadow-lg font-display text-white max-w-5xl mx-auto">
              PMA INTERNATIONAL CADETS' CONFERENCE
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-medium shadow-md">
                PMA, Baguio, Philippines
              </span>
              <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base font-medium shadow-md">
                November 18-22, 2026
              </span>
            </div>
            <Link 
              href="/register"
              className="mt-8 bg-white text-black px-8 py-4 rounded-full text-sm md:text-base font-bold tracking-wide hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-transform inline-block"
            >
              REGISTER
            </Link>
          </motion.div>

          {/* Slide Navigation Arrows */}
          <button 
            onClick={prevSlide} 
            className="absolute left-6 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 hidden sm:flex"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-6 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 hidden sm:flex"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Inline Avatars Kinetic Headline */}
      <div className="w-full max-w-[96vw]">
        <InlineAvatars />
      </div>

      {/* Stats Counter Section */}
      <section className="w-full max-w-[96vw] grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <CounterCard 
          category="Countries"
          label="Participating Nations"
          targetValue={16}
          suffix=" Nations"
          bgColor="bg-purple-600"
          textColor="text-white"
        />
        <CounterCard 
          category="Duration"
          label="Conference Days"
          targetValue={5}
          suffix=" Days"
          bgColor="bg-amber-400"
          textColor="text-black"
        />
        <CounterCard 
          category="Year"
          label="ICC Edition"
          targetValue={2026}
          decimals={0}
          suffix=""
          bgColor="bg-white"
          textColor="text-black"
        />
      </section>

      {/* Kinetic Headline Section */}
      <section id="about" className="w-full max-w-[96vw] bg-white text-black rounded-3xl p-8 md:p-16 lg:p-20 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-display"
            >
              {["From Cadets", "to Catalysts"].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    variants={{
                      hidden: { y: "100%", opacity: 0, rotateZ: 5 },
                      visible: { y: "0%", opacity: 1, rotateZ: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </motion.div>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              Welcome to the International Cadet Conference (ICC) 2026, proudly hosted by the Philippine Military Academy. This distinguished forum unites future military leaders from defense academies worldwide to engage in meaningful dialogue, strategic collaboration, and shared pursuit of leadership excellence.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Official PMA Event
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-800 uppercase tracking-wider">
                Fort Del Pilar, Baguio City
              </span>
            </div>
          </div>

          {/* Right Column: Seamless Filler Photo Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group h-[320px] md:h-[420px]"
            >
              <img 
                src="/pma-assets/gallery-1.jpg" 
                alt="PMA Cadets in formation" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold mb-1">Philippine Military Academy</p>
                <p className="text-xl font-bold font-display leading-snug">Empowering Tomorrow's Global Military Leaders</p>
              </div>
            </motion.div>
          </div>
        </div>
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

      {/* Kinetic Footer */}
      <footer className="w-full max-w-[96vw] bg-[#050505] border border-white/10 rounded-3xl p-12 md:p-20 my-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-16 mb-16 gap-8">
          <div>
            <img src="/pma-assets/icc-logo.png" alt="ICC 2026" className="h-16 md:h-24 w-auto bg-white/10 rounded-2xl p-4 border border-white/20" />
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
              <p className="text-lg font-bold">icc@pma.edu.ph</p>
              <p className="text-slate-400">+63 74 447 3560</p>
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
            © 2026 ICC Philippine Military Academy. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
