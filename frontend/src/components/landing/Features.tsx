'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Async Video Interviews',
    description: 'Candidates record responses on their own time. No more scheduling nightmares.',
    icon: '🎥',
    gradient: 'from-electric-500 to-cyan-500',
  },
  {
    title: 'AI-Powered Analysis',
    description: 'Get instant transcriptions and AI-scored evaluations for every response.',
    icon: '🤖',
    gradient: 'from-cyan-500 to-emerald-500',
  },
  {
    title: 'Smart Scoring',
    description: 'Objective scoring on communication, technical skills, and culture fit.',
    icon: '📊',
    gradient: 'from-emerald-500 to-amber-500',
  },
  {
    title: 'Team Collaboration',
    description: 'Share candidate profiles, leave comments, and make decisions together.',
    icon: '👥',
    gradient: 'from-amber-500 to-coral-500',
  },
  {
    title: 'Custom Questions',
    description: 'Create tailored interview questions with flexible time limits.',
    icon: '✏️',
    gradient: 'from-coral-500 to-electric-500',
  },
  {
    title: 'Instant Sharing',
    description: 'Generate unique interview links and send to candidates in seconds.',
    icon: '🔗',
    gradient: 'from-electric-500 to-cyan-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-500 rounded-full filter blur-[200px] opacity-10"
        animate={{ x: [100, 0, 100] }}
        transition={{ duration: 25, repeat: Infinity }}
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
            className="inline-block px-4 py-2 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-sm font-medium mb-6"
          >
            Powerful Features
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-electric-400 to-cyan-400 bg-clip-text text-transparent">
              Hire Better
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Streamline your entire interview process with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Hover Gradient Border */}
              <div className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300`} />

              <div className="relative glass rounded-2xl p-8 h-full">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <motion.div
                  className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-cyan-400 transition-colors"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />

          <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  AI-POWERED
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Instant AI Feedback on Every Interview
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Our advanced AI analyzes verbal and non-verbal cues to provide comprehensive candidate assessments. 
                  Get detailed scores across multiple dimensions including communication, technical competency, 
                  problem-solving abilities, and cultural fit indicators.
                </p>
                <ul className="space-y-3">
                  {[
                    'Automatic speech-to-text transcription',
                    'Sentiment and confidence analysis',
                    'Technical accuracy scoring',
                    'Red flag detection',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500" />
                    <div>
                      <p className="text-white font-medium">John Smith</p>
                      <p className="text-white/40 text-sm">Senior Developer Position</p>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                      9.2/10
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Communication', score: 92 },
                      { label: 'Technical Skills', score: 88 },
                      { label: 'Problem Solving', score: 95 },
                      { label: 'Culture Fit', score: 90 },
                    ].map((metric, index) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">{metric.label}</span>
                          <span className="text-white font-medium">{metric.score}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-electric-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}