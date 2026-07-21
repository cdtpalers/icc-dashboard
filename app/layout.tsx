import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "ICC Dashboard",
  description: "ICC Dashboard and Landing Page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#050505] text-slate-200 antialiased min-h-screen overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
