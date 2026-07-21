import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "ICC Dashboard",
  description: "ICC Dashboard and Landing Page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-slate-200 antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
