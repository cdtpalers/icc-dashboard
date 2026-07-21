"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { supabase, type Registration } from '@/lib/supabase';

const countries = [
  'Philippines', 'Brunei', 'Cambodia', 'Indonesia', 'Laos', 'Malaysia',
  'Singapore', 'Thailand', 'Vietnam', 'Timor-Leste', 'Australia', 'Japan',
  'India', 'South Korea', 'Canada', 'Italy', 'Germany',
];

const delegationRoles = ['Delegate', 'Head Delegate', 'Observer', 'Faculty Advisor'] as const;

export default function RegisterPage() {
  const [formData, setFormData] = useState<Partial<Registration>>({
    full_name: '',
    email: '',
    phone: '',
    academy_name: '',
    country: '',
    rank: '',
    cadet_year: '',
    delegation_role: 'Delegate',
    dietary_restrictions: '',
    special_requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('registrations')
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          academy_name: formData.academy_name,
          country: formData.country,
          rank: formData.rank || null,
          cadet_year: formData.cadet_year || null,
          delegation_role: formData.delegation_role,
          dietary_restrictions: formData.dietary_restrictions || null,
          special_requirements: formData.special_requirements || null,
        }]);

      if (supabaseError) {
        if (supabaseError.message.includes('duplicate key')) {
          setError('This email address has already been registered.');
        } else {
          setError(supabaseError.message);
        }
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center py-4 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-900/10 blur-[150px]" />
      </div>

      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-3xl px-6 pt-8"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-sm">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            >
              <CheckCircle size={80} className="text-emerald-400 mb-8" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
              Registration Submitted!
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Thank you, <span className="text-white font-semibold">{formData.full_name}</span>. Your registration for PMA ICC 2026 has been received. You will receive a confirmation email at <span className="text-white font-semibold">{formData.email}</span>.
            </p>
            <Link
              href="/"
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Return to Home
            </Link>
          </motion.div>
        ) : (
          /* Registration Form */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl px-6 py-12"
          >
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <img src="/pma-assets/icc-logo.png" alt="ICC 2026" className="h-12 w-auto" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-4">
                Register for<br />ICC 2026
              </h1>
              <p className="text-slate-400 max-w-lg">
                Join future military leaders from defense academies worldwide. November 18–22, 2026 at the Philippine Military Academy, Baguio City.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 font-display">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="full_name" label="Full Name" value={formData.full_name!} onChange={handleChange} required />
                  <InputField name="email" label="Email Address" type="email" value={formData.email!} onChange={handleChange} required />
                  <InputField name="phone" label="Phone Number" type="tel" value={formData.phone!} onChange={handleChange} />
                  <InputField name="rank" label="Rank / Title" value={formData.rank!} onChange={handleChange} placeholder="e.g. Cadet Corporal" />
                </div>
              </div>

              {/* Academy & Delegation */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 font-display">Academy & Delegation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="academy_name" label="Academy Name" value={formData.academy_name!} onChange={handleChange} required placeholder="e.g. Philippine Military Academy" />
                  
                  <SelectField name="country" label="Country" value={formData.country!} onChange={handleChange} required options={countries} placeholder="Select your country" />
                  
                  <SelectField name="delegation_role" label="Delegation Role" value={formData.delegation_role!} onChange={handleChange} required options={[...delegationRoles]} />

                  <InputField name="cadet_year" label="Cadet Year / Class" value={formData.cadet_year!} onChange={handleChange} placeholder="e.g. Class of 2027" />
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 font-display">Additional Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <TextAreaField name="dietary_restrictions" label="Dietary Restrictions" value={formData.dietary_restrictions!} onChange={handleChange} placeholder="Vegetarian, halal, allergies, etc." />
                  <TextAreaField name="special_requirements" label="Special Requirements" value={formData.special_requirements!} onChange={handleChange} placeholder="Accessibility needs, interpreter, etc." />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-5 rounded-full font-bold text-lg tracking-wide flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Registration</span>
                )}
              </motion.button>

              <p className="text-xs text-slate-500 text-center">
                By registering, you agree to participate in the PMA International Cadets' Conference 2026. Registration is subject to confirmation by the organizing committee.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Reusable Form Components ── */

function InputField({ name, label, value, onChange, required, type = 'text', placeholder }: {
  name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all text-sm"
      />
    </div>
  );
}

function SelectField({ name, label, value, onChange, required, options, placeholder }: {
  name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean; options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all text-sm appearance-none cursor-pointer"
        >
          {placeholder && <option value="" className="bg-[#111]">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

function TextAreaField({ name, label, value, onChange, placeholder }: {
  name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all text-sm resize-none"
      />
    </div>
  );
}
