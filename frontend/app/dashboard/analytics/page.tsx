'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const monthlyData = [
  { month: 'Jan', candidates: 45, interviews: 38, hires: 5 },
  { month: 'Feb', candidates: 52, interviews: 44, hires: 7 },
  { month: 'Mar', candidates: 78, interviews: 65, hires: 9 },
  { month: 'Apr', candidates: 91, interviews: 82, hires: 12 },
  { month: 'May', candidates: 86, interviews: 75, hires: 10 },
  { month: 'Jun', candidates: 105, interviews: 94, hires: 15 },
];

const topJobs = [
  { title: 'Senior Developer', candidates: 48, avgScore: 7.8, status: 'active' },
  { title: 'Product Manager', candidates: 35, avgScore: 8.2, status: 'active' },
  { title: 'UX Designer', candidates: 29, avgScore: 7.5, status: 'paused' },
  { title: 'Data Analyst', candidates: 22, avgScore: 8.0, status: 'active' },
  { title: 'DevOps Engineer', candidates: 18, avgScore: 7.9, status: 'closed' },
];

const scoreDistribution = [
  { range: '9-10', count: 15, percentage: 12 },
  { range: '8-9', count: 35, percentage: 28 },
  { range: '7-8', count: 42, percentage: 34 },
  { range: '6-7', count: 20, percentage: 16 },
  { range: '< 6', count: 12, percentage: 10 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  const stats = [
    { label: 'Total Candidates', value: '457', change: '+12%', positive: true, icon: '👥' },
    { label: 'Interviews Completed', value: '398', change: '+18%', positive: true, icon: '🎥' },
    { label: 'Average Score', value: '7.6', change: '+0.3', positive: true, icon: '⭐' },
    { label: 'Time to Hire', value: '12 days', change: '-3 days', positive: true, icon: '⏱️' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-white/60 mt-2">Track your hiring performance and insights</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
          {['7d', '30d', '6m', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.positive 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-coral-500/20 text-coral-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-white/60 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg">Hiring Pipeline</h3>
              <p className="text-white/40 text-sm">Candidates, interviews, and hires over time</p>
            </div>
            <div className="flex gap-4">
              {[
                { label: 'Candidates', color: 'bg-electric-500' },
                { label: 'Interviews', color: 'bg-cyan-500' },
                { label: 'Hires', color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-white/60 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Bars */}
          <div className="flex items-end justify-between h-64 gap-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1 h-48">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.candidates / 120) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-4 bg-electric-500 rounded-t-lg"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.interviews / 120) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                    className="w-4 bg-cyan-500 rounded-t-lg"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.hires / 20) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="w-4 bg-emerald-500 rounded-t-lg"
                  />
                </div>
                <span className="text-white/40 text-xs">{data.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-2">Score Distribution</h3>
          <p className="text-white/40 text-sm mb-6">AI scoring breakdown</p>

          <div className="space-y-4">
            {scoreDistribution.map((item, index) => (
              <div key={item.range}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">{item.range}</span>
                  <span className="text-white">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      index === 0 ? 'bg-emerald-500' :
                      index === 1 ? 'bg-cyan-500' :
                      index === 2 ? 'bg-electric-500' :
                      index === 3 ? 'bg-amber-500' : 'bg-coral-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-2">Top Performing Jobs</h3>
          <p className="text-white/40 text-sm mb-6">Jobs with most engagement</p>

          <div className="space-y-4">
            {topJobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{job.title}</p>
                  <p className="text-white/40 text-sm">{job.candidates} candidates</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{job.avgScore}/10</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    job.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                    job.status === 'paused' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-2">Conversion Funnel</h3>
          <p className="text-white/40 text-sm mb-6">From invite to hire</p>

          <div className="space-y-4">
            {[
              { stage: 'Invited', count: 457, percentage: 100, color: 'from-electric-500 to-electric-400' },
              { stage: 'Started Interview', count: 412, percentage: 90, color: 'from-cyan-500 to-cyan-400' },
              { stage: 'Completed', count: 398, percentage: 87, color: 'from-emerald-500 to-emerald-400' },
              { stage: 'Reviewed', count: 285, percentage: 62, color: 'from-amber-500 to-amber-400' },
              { stage: 'Hired', count: 58, percentage: 13, color: 'from-coral-500 to-coral-400' },
            ].map((item, index) => (
              <div key={item.stage}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">{item.stage}</span>
                  <span className="text-white/60">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-8 bg-white/5 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-end pr-3`}
                  >
                    {item.percentage > 20 && (
                      <span className="text-white text-xs font-medium">{item.count}</span>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Best Day to Interview',
            value: 'Tuesday',
            detail: '32% higher completion rate',
            icon: '📅',
            gradient: 'from-electric-500/20 to-cyan-500/20',
          },
          {
            title: 'Peak Interview Time',
            value: '2-4 PM',
            detail: 'Most candidates are available',
            icon: '⏰',
            gradient: 'from-cyan-500/20 to-emerald-500/20',
          },
          {
            title: 'Avg. Response Time',
            value: '18 hours',
            detail: 'After receiving invite',
            icon: '⚡',
            gradient: 'from-emerald-500/20 to-amber-500/20',
          },
        ].map((insight, index) => (
          <motion.div
            key={insight.title}
            whileHover={{ y: -5 }}
            className={`glass rounded-2xl p-6 bg-gradient-to-br ${insight.gradient}`}
          >
            <span className="text-3xl mb-4 block">{insight.icon}</span>
            <p className="text-white/60 text-sm">{insight.title}</p>
            <p className="text-2xl font-bold text-white mt-1">{insight.value}</p>
            <p className="text-white/40 text-xs mt-2">{insight.detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}