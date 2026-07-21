"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterCardProps {
  category: string;
  label: string;
  targetValue: number;
  decimals?: number;
  suffix?: string;
  bgColor: string;
  textColor: string;
}

export default function CounterCard({
  category,
  label,
  targetValue,
  decimals = 0,
  suffix = '',
  bgColor,
  textColor,
}: CounterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = targetValue / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${bgColor} ${textColor} p-8 rounded-3xl flex flex-col justify-between h-72 relative overflow-hidden shadow-xl border border-black/5`}
    >
      <span className="inline-block px-4 py-1 rounded-full border border-current text-xs font-semibold uppercase tracking-wider w-max">
        {category}
      </span>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-75">{label}</p>
        <h3 className="text-6xl md:text-7xl font-extrabold font-mono tracking-tight">
          {count.toFixed(decimals)}
          {suffix}
        </h3>
      </div>
    </motion.div>
  );
}
