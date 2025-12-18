'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  status: string;
  candidates_count: number;
  created_at: string;
}

interface JobsTableProps {
  jobs: Job[];
  isLoading?: boolean;
}

export default function JobsTable({ jobs, isLoading }: JobsTableProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'paused':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'closed':
        return 'bg-white/10 text-white/60 border-white/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Recent Jobs</h2>
          <p className="text-white/40 text-sm">Manage your job postings</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard/jobs/new')}
          className="px-4 py-2 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white text-sm font-medium shadow-lg shadow-cyan-500/25"
        >
          + New Job
        </motion.button>
      </div>

      {/* Table */}
      {jobs.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-2">No jobs yet</h3>
          <p className="text-white/40 text-sm mb-4">Create your first job posting to start receiving candidates</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/jobs/new')}
            className="px-6 py-3 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white text-sm font-medium"
          >
            Create First Job
          </motion.button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Job Title</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Candidates</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Created</th>
                <th className="text-right text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job, index) => (
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{job.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(job.candidates_count, 3))].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 border-2 border-navy-900" />
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">{job.candidates_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {new Date(job.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-white/40 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}