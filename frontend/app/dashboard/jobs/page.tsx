'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';

interface Job {
  id: string;
  title: string;
  status: string;
  candidates_count: number;
  created_at: string;
  description?: string;
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'paused': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'closed': return 'bg-white/10 text-white/60 border-white/20';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
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
          <h1 className="text-3xl font-bold text-white">Jobs</h1>
          <p className="text-white/60 mt-2">Manage your job postings and track candidates</p>
        </div>

        <Button
          variant="primary"
          onClick={() => router.push('/dashboard/jobs/new')}
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Job
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        {['all', 'active', 'paused', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              filter === status
                ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
              <div className="h-4 bg-white/5 rounded w-1/2 mb-6" />
              <div className="h-10 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric-500/20 to-cyan-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No jobs found</h2>
          <p className="text-white/60 mb-6">Create your first job posting to start receiving candidates</p>
          <Button variant="primary" onClick={() => router.push('/dashboard/jobs/new')}>
            Create Your First Job
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
              className="glass rounded-2xl p-6 cursor-pointer group relative"
            >
              {/* Hover gradient */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-electric-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {job.title}
                </h3>

                <p className="text-white/40 text-sm mb-6">
                  Created {new Date(job.created_at).toLocaleDateString()}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(job.candidates_count, 3))].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 border-2 border-navy-900 flex items-center justify-center"
                        >
                          <span className="text-white text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">
                      {job.candidates_count} candidate{job.candidates_count !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <svg className="w-5 h-5 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}