'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create Job & Questions',
    description: 'Set up your job posting with custom interview questions and time limits for each response.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'electric',
  },
  {
    number: '02',
    title: 'Invite Candidates',
    description: 'Add candidates and send them unique interview links. They can record anytime, anywhere.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    number: '03',
    title: 'Candidates Record',
    description: 'Candidates record video responses on their own time. No scheduling headaches.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    number: '04',
    title: 'AI Analyzes & Scores',
    description: 'Our AI transcribes, analyzes communication skills, and scores candidates objectively.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'amber',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500 rounded-full filter blur-[200px] opacity-10"
        animate={{ x: [-100, 0, -100] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            Simple Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From job posting to AI-powered insights in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}

              <motion.div
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 h-full relative group"
              >
                {/* Number Badge */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-400 flex items-center justify-center text-white font-bold shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 border border-${step.color}-500/20 flex items-center justify-center text-${step.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">Ready to transform your hiring process?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-electric-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}