'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  delay?: number;
  gradient: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  delay = 0,
  gradient,
}: StatsCardProps) {
  const changeColors = {
    positive: 'text-emerald-400',
    negative: 'text-coral-400',
    neutral: 'text-white/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      {/* Gradient border on hover */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300`} />
      
      <div className="relative glass rounded-2xl p-6 h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium">{title}</p>
            <motion.h3
              className="text-3xl font-bold text-white mt-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: 'spring' }}
            >
              {value}
            </motion.h3>
            {change && (
              <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
                {changeType === 'positive' && '↑ '}
                {changeType === 'negative' && '↓ '}
                {change}
              </p>
            )}
          </div>
          
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white">{icon}</span>
          </div>
        </div>
        
        {/* Animated bottom bar */}
        <motion.div
          className={`absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r ${gradient} rounded-full`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.8 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}