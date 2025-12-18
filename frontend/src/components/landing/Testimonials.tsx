'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "InterviewAI cut our hiring time by 60%. The AI insights are incredibly accurate and help us make unbiased decisions.",
    author: "Sarah Chen",
    role: "Head of Talent, TechCorp",
    avatar: "SC",
    gradient: "from-electric-500 to-cyan-500",
  },
  {
    quote: "We've screened 500+ candidates in the time it used to take for 50. Game-changing for high-volume hiring.",
    author: "Marcus Johnson",
    role: "HR Director, ScaleUp Inc",
    avatar: "MJ",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    quote: "The async format means candidates give their best performance without interview anxiety. Quality of hires has improved dramatically.",
    author: "Emily Rodriguez",
    role: "Founder, StartupXYZ",
    avatar: "ER",
    gradient: "from-emerald-500 to-amber-500",
  },
];

const stats = [
  { value: '10,000+', label: 'Interviews Conducted' },
  { value: '500+', label: 'Companies Trust Us' },
  { value: '60%', label: 'Time Saved' },
  { value: '4.9/5', label: 'Customer Rating' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

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
            className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by{' '}
            <span className="bg-gradient-to-r from-amber-400 to-coral-400 bg-clip-text text-transparent">
              Hiring Teams
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Join hundreds of companies transforming their hiring process
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full relative">
                {/* Quote Icon */}
                <div className="text-4xl text-white/10 absolute top-6 right-6">"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-white/40 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-electric-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}