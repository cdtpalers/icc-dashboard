import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
            <Link href="#" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Why Us?</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contacts</Link>
          </nav>

          <Link href="/dashboard" className="bg-[#111] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors">
            <span>Dashboard</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Main Content Area - Rounded Border like in the image */}
      <main className="w-full max-w-[96vw] mt-20 mb-2 border-[1px] border-white/20 rounded-[3rem] relative flex flex-col flex-1 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#050505]">
        
        {/* Top Text Section */}
        <div className="w-full pt-16 md:pt-24 px-8 md:px-16 flex flex-col z-10">
          <p className="text-slate-400 text-xs md:text-sm tracking-widest uppercase mb-2">
            EVENT STUDIO
          </p>
          
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between relative">
            <h1 className="text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-tighter leading-none z-10 drop-shadow-lg">
              ICC 2024
            </h1>
            <p className="text-left lg:text-right text-slate-300 max-w-[250px] text-xs md:text-sm uppercase tracking-wider mb-2 lg:mb-8 z-10">
              Organizers of emotional and unforgettable events
            </p>
          </div>
        </div>

        {/* 3D Illustration Area */}
        <div className="relative w-full flex-1 min-h-[45vh] lg:min-h-[55vh] flex justify-center items-end overflow-hidden">
          {/* Top fade gradient so image blends with the dark background seamlessly */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
          
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

          {/* Background image covering the bottom space */}
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

    </div>
  );
}
