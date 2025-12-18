'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/src/components/dashboard/StatsCard';
import JobsTable from '@/src/components/dashboard/JobsTable';
import { api } from '@/src/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
    completedInterviews: 0,
    avgScore: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobsResponse = await api.get('/jobs');
      setJobs(jobsResponse.data);
      
      // Calculate stats
      const totalCandidates = jobsResponse.data.reduce(
        (acc: number, job: any) => acc + (job.candidates_count || 0), 0
      );
      
      setStats({
        totalJobs: jobsResponse.data.length,
        totalCandidates,
        completedInterviews: Math.floor(totalCandidates * 0.7), // Mock data
        avgScore: 7.8, // Mock data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            {getGreeting()}, <span className="gradient-text">{user?.company || 'there'}</span>! 👋
          </h1>
          <p className="text-white/60 mt-2">Here's what's happening with your interviews today.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white font-medium shadow-lg shadow-cyan-500/25 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Job
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Jobs"
          value={stats.totalJobs}
          change="+2 this week"
          changeType="positive"
          delay={0}
          gradient="from-electric-500 to-cyan-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Candidates"
          value={stats.totalCandidates}
          change="+12 this week"
          changeType="positive"
          delay={0.1}
          gradient="from-cyan-500 to-emerald-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Interviews"
          value={stats.completedInterviews}
          change="+8 completed"
          changeType="positive"
          delay={0.2}
          gradient="from-emerald-500 to-amber-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Avg. Score"
          value={`${stats.avgScore}/10`}
          change="Above average"
          changeType="positive"
          delay={0.3}
          gradient="from-amber-500 to-coral-500"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <JobsTable jobs={jobs} isLoading={isLoading} />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-white font-semibold text-lg mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { action: 'New candidate applied', job: 'Senior Developer', time: '5 min ago', icon: '👤' },
              { action: 'Interview completed', job: 'Product Manager', time: '1 hour ago', icon: '🎥' },
              { action: 'AI scoring done', job: 'UX Designer', time: '2 hours ago', icon: '🤖' },
              { action: 'Job posted', job: 'Data Analyst', time: '5 hours ago', icon: '📝' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-white/40 text-xs truncate">{activity.job}</p>
                </div>
                <span className="text-white/40 text-xs whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
            View all activity →
          </button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { title: 'Create Job', desc: 'Post a new position', icon: '➕', gradient: 'from-electric-500 to-cyan-500' },
          { title: 'Review Interviews', desc: '5 pending reviews', icon: '🎬', gradient: 'from-cyan-500 to-emerald-500' },
          { title: 'View Reports', desc: 'Analytics & insights', icon: '📊', gradient: 'from-emerald-500 to-amber-500' },
        ].map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-6 text-left group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <span className="text-2xl">{action.icon}</span>
            </div>
            <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">{action.title}</h3>
            <p className="text-white/40 text-sm mt-1">{action.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}