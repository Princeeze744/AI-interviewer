'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      '5 active jobs',
      '50 candidates/month',
      'AI-powered scoring',
      'Email support',
      'Basic analytics',
    ],
    gradient: 'from-white/10 to-white/5',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For growing teams with serious hiring needs',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Unlimited jobs',
      '200 candidates/month',
      'Advanced AI insights',
      'Priority support',
      'Team collaboration',
      'Custom branding',
      'API access',
    ],
    gradient: 'from-electric-500 to-cyan-500',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: [
      'Everything in Pro',
      'Unlimited candidates',
      'SSO & SAML',
      'Dedicated success manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
    ],
    gradient: 'from-white/10 to-white/5',
    popular: false,
  },
];

export default function Pricing() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full filter blur-[100px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            Pricing
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple,{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !isYearly ? 'bg-white/10 text-white' : 'text-white/60'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly ? 'bg-white/10 text-white' : 'text-white/60'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-full text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              {/* Card */}
              <div className={`glass rounded-2xl p-8 h-full relative overflow-hidden ${
                plan.popular ? 'border border-cyan-500/30' : ''
              }`}>
                {/* Gradient Background for Popular */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 to-cyan-500/10" />
                )}

                <div className="relative z-10">
                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-white/60">/month</span>
                    {isYearly && (
                      <p className="text-emerald-400 text-sm mt-1">
                        Billed annually (${(isYearly ? plan.yearlyPrice : plan.monthlyPrice) * 12}/year)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-cyan-500/20' : 'bg-white/10'} flex items-center justify-center`}>
                          <svg className={`w-3 h-3 ${plan.popular ? 'text-cyan-400' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/login')}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">
            Need a custom solution? Let's talk about your specific requirements.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
          >
            Contact Sales →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}