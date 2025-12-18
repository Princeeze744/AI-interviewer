'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { authAPI } from '@/src/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login(email, password);
      } else {
        response = await authAPI.signup(email, password, company, 'hiring_manager');
      }

      localStorage.setItem('access_token', response.tokens.access_token);
      localStorage.setItem('refresh_token', response.tokens.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-72 h-72 bg-electric-500 rounded-full filter blur-[120px] opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-[5%] w-64 h-64 bg-emerald-500 rounded-full filter blur-[100px] opacity-20"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] right-[15%] w-48 h-48 bg-amber-500 rounded-full filter blur-[80px] opacity-15"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Left Side - Floating Feature Cards */}
      <div className="hidden lg:flex flex-col gap-6 absolute left-[5%] top-1/2 -translate-y-1/2">
        {[
          { icon: '🎥', title: 'Video Interviews', desc: 'Record & review anytime', delay: 0 },
          { icon: '🤖', title: 'AI Scoring', desc: 'Smart candidate analysis', delay: 0.2 },
          { icon: '📊', title: 'Analytics', desc: 'Data-driven decisions', delay: 0.4 },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: feature.delay, duration: 0.6 }}
            whileHover={{ x: 10, scale: 1.02 }}
            className="glass rounded-2xl p-4 w-56 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                <p className="text-white/50 text-xs">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Side - Stats */}
      <div className="hidden lg:flex flex-col gap-6 absolute right-[5%] top-1/2 -translate-y-1/2">
        {[
          { value: '10K+', label: 'Interviews', delay: 0.1 },
          { value: '95%', label: 'Accuracy', delay: 0.3 },
          { value: '50%', label: 'Time Saved', delay: 0.5 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stat.delay, duration: 0.6 }}
            whileHover={{ x: -10, scale: 1.02 }}
            className="glass rounded-2xl p-4 w-40 text-center cursor-pointer"
          >
            <motion.h3
              className="text-2xl font-bold gradient-text"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: stat.delay + 0.3, type: 'spring' }}
            >
              {stat.value}
            </motion.h3>
            <p className="text-white/50 text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Login Card - Center */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Gradient border glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-electric-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-50 blur-sm" />

        <div className="relative glass rounded-2xl p-8 md:p-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500 to-cyan-500 rounded-xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl -rotate-6 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/60 text-sm">
              {isLogin ? 'Sign in to your interview platform' : 'Start hiring smarter with AI'}
            </p>
          </motion.div>

          {/* Toggle */}
          <div className="flex gap-2 p-1 bg-navy-800/50 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-coral-500/10 border border-coral-500/30 text-coral-400 px-4 py-3 rounded-xl mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
            </motion.div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    label="Company Name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required={!isLogin}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
            </motion.div>

            {isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end"
              >
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </a>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 py-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="secondary" className="flex-1 py-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-white/40 text-xs mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-cyan-400 hover:underline">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}