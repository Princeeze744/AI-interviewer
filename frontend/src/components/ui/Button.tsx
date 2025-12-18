'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative overflow-hidden font-semibold rounded-xl
    transition-all duration-300 ease-out
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-electric-500 via-cyan-500 to-emerald-500
      text-white shadow-glow-sm
      hover:shadow-glow-md hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      bg-navy-800 border border-white/10 text-white
      hover:bg-navy-700 hover:border-electric-500/50
      hover:shadow-glow-sm
    `,
    ghost: `
      bg-transparent text-white/70
      hover:text-white hover:bg-white/5
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Animated gradient overlay */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}

      {/* Loading spinner */}
      {isLoading ? (
        <div className="flex items-center gap-2">
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </motion.button>
  );
}