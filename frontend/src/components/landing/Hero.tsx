'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-electric-500 rounded-full filter blur-[150px] opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-[600px] h-[600px] bg-cyan-500 rounded-full filter blur-[150px] opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500 rounded-full filter blur-[150px] opacity-10"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-[15%] hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Interview Complete</p>
              <p className="text-white/50 text-xs">Score: 9.2/10</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-48 right-[12%] hidden lg:block"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">AI Analysis</p>
              <p className="text-white/50 text-xs">Processing...</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-48 left-[20%] hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 border-2 border-navy-900" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 border-2 border-navy-900" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 border-2 border-navy-900" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">+12 Candidates</p>
              <p className="text-white/50 text-xs">This week</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-[18%] hidden lg:block"
        animate={{ y: [0, 25, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">50% Time Saved</p>
              <p className="text-white/50 text-xs">vs. Traditional</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-sm">Now with GPT-4 powered analysis</span>
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Hire Smarter with{' '}
          <span className="relative">
            <span className="relative z-10 bg-gradient-to-r from-electric-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <motion.span
              className="absolute -inset-2 bg-gradient-to-r from-electric-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
          <br />
          Video Interviews
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Screen candidates 10x faster with async video interviews and AI-powered insights. 
          No scheduling. No bias. Just better hires.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
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
            className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-white/40 text-sm">Trusted by 500+ companies worldwide</p>
          <div className="flex items-center gap-8 opacity-50">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
              <span key={company} className="text-white/60 font-semibold text-lg">
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Image/Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
          
          {/* Dashboard Preview */}
          <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="bg-navy-900/50 px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-coral-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white/5 rounded-lg text-white/40 text-xs">
                  app.interviewai.com/dashboard
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-navy-900/80 to-navy-950/80">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Active Jobs', value: '12', color: 'electric' },
                  { label: 'Candidates', value: '148', color: 'cyan' },
                  { label: 'Interviews', value: '89', color: 'emerald' },
                  { label: 'Avg Score', value: '8.4', color: 'amber' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white/5 rounded-xl p-4 h-32" />
                <div className="bg-white/5 rounded-xl p-4 h-32" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}