'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CTA() {
  const router = useRouter();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-500/30 via-cyan-500/30 to-emerald-500/30 rounded-3xl blur-2xl" />

          <div className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-electric-500/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500 to-cyan-500 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl -rotate-6 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to Transform{' '}
                <span className="bg-gradient-to-r from-electric-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Your Hiring?
                </span>
              </h2>

              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                Join 500+ companies already using InterviewAI to find the best talent faster. 
                Start your free trial today — no credit card required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/login')}
                  className="w-full sm:w-auto bg-gradient-to-r from-electric-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                >
                  Schedule Demo
                </motion.button>
              </div>

              <p className="text-white/40 text-sm mt-8">
                ✓ 14-day free trial &nbsp; ✓ No credit card required &nbsp; ✓ Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}