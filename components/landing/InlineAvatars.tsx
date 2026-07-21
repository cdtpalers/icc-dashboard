"use client";
import { motion } from 'framer-motion';

export default function InlineAvatars() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black rounded-3xl my-12 text-center flex flex-col items-center justify-center">
      <div className="max-w-5xl">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
          Creating moments{' '}
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center align-middle mx-2"
          >
            <img 
              src="/pma-assets/pma-logo.png" 
              alt="Avatar 1"
              className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border-2 border-purple-500 object-contain shadow-lg transform -rotate-6 bg-white p-1"
            />
          </motion.span>
          that leave a mark{' '}
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center align-middle mx-2"
          >
            <img 
              src="/pma-assets/icc-logo.png" 
              alt="Avatar 2"
              className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border-2 border-emerald-500 object-contain shadow-lg transform rotate-6 bg-white p-1"
            />
          </motion.span>
          in memory
        </h2>
      </div>
    </section>
  );
}
