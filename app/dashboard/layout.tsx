import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#050505] text-slate-200 antialiased overflow-hidden w-full h-full min-h-screen">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-900/10 blur-[120px]" />
      </div>
      
      <div className="flex h-screen w-screen p-4 gap-4">
        <Sidebar />
        <main className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
