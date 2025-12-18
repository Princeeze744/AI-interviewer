'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = '',
  type = 'text',
  placeholder,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasValue = props.value && String(props.value).length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <motion.label
        className={`
          absolute transition-all duration-300 pointer-events-none z-10
          ${isActive 
            ? 'text-xs top-2 left-4 text-cyan-400' 
            : `text-base top-4 ${icon ? 'left-12' : 'left-4'} text-white/50`
          }
        `}
      >
        {label}
      </motion.label>

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`
            absolute left-4 top-1/2 -translate-y-1/2 
            transition-colors duration-300 
            ${isFocused ? 'text-cyan-400' : 'text-white/40'}
          `}>
            {icon}
          </div>
        )}

        {/* Input field */}
        <input
          type={inputType}
          placeholder={isActive ? placeholder : ''}
          className={`
            w-full bg-navy-800/50 border rounded-xl
            pt-6 pb-2 pr-4
            ${icon ? 'pl-12' : 'pl-4'}
            ${isPassword ? 'pr-12' : 'pr-4'}
            text-white text-base
            transition-all duration-300
            focus:outline-none
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

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}

        {/* Focus glow effect */}
        <AnimatePresence>
          {isFocused && !error && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              }}
            />
          )}
        </AnimatePresence>
      </div>

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