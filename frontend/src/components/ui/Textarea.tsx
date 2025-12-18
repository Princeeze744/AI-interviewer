'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = '',
  placeholder,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && String(props.value).length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <motion.label
        className={`
          absolute left-4 transition-all duration-300 pointer-events-none z-10
          ${isActive 
            ? 'text-xs top-3 text-cyan-400' 
            : 'text-base top-4 text-white/50'
          }
        `}
      >
        {label}
      </motion.label>

      <textarea
        placeholder={isActive ? placeholder : ''}
        className={`
          w-full bg-navy-800/50 border rounded-xl
          pt-8 pb-3 px-4
          text-white text-base
          transition-all duration-300
          focus:outline-none
          min-h-[140px] resize-none
          placeholder:text-white/30
          ${error
            ? 'border-coral-500 focus:border-coral-500 focus:shadow-[0_0_20px_rgba(244,63,94,0.3)]'
            : isFocused
              ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              : 'border-white/10 hover:border-white/20'
          }
          ${className}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Focus glow effect */}
      <AnimatePresence>
        {isFocused && !error && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-coral-500 text-sm mt-2 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}