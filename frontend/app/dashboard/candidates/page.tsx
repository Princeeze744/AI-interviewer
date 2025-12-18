'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: string;
  job_id: string;
  job_title?: string;
  created_at: string;
  interview_token: string;
}

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAllCandidates();
  }, []);

  const fetchAllCandidates = async () => {
    try {
      // First get all jobs
      const jobsResponse = await api.get('/jobs');
      const jobs = jobsResponse.data;

      // Then get candidates for each job
      const allCandidates: Candidate[] = [];
      for (const job of jobs) {
        const candidatesResponse = await api.get(`/candidates/job/${job.id}`);
        const candidatesWithJob = candidatesResponse.data.map((c: any) => ({
          ...c,
          job_title: job.title,
        }));
        allCandidates.push(...candidatesWithJob);
      }

      // Sort by date
      allCandidates.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setCandidates(allCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invited': return 'bg-electric-500/20 text-electric-400 border-electric-500/30';
      case 'started': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'reviewed': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const statusCounts = {
    all: candidates.length,
    invited: candidates.filter(c => c.status === 'invited').length,
    started: candidates.filter(c => c.status === 'started').length,
    completed: candidates.filter(c => c.status === 'completed').length,
    reviewed: candidates.filter(c => c.status === 'reviewed').length,
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
          <h1 className="text-3xl font-bold text-white">Candidates</h1>
          <p className="text-white/60 mt-2">Manage all candidates across your jobs</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          { status: 'all', label: 'Total', icon: '👥' },
          { status: 'invited', label: 'Invited', icon: '📧' },
          { status: 'started', label: 'Started', icon: '▶️' },
          { status: 'completed', label: 'Completed', icon: '✅' },
          { status: 'reviewed', label: 'Reviewed', icon: '⭐' },
        ].map((item, index) => (
          <motion.button
            key={item.status}
            whileHover={{ y: -5 }}
            onClick={() => setStatusFilter(item.status)}
            className={`glass rounded-xl p-4 text-left transition-all ${
              statusFilter === item.status ? 'ring-2 ring-cyan-500' : ''
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="text-2xl font-bold text-white mt-2">{statusCounts[item.status as keyof typeof statusCounts]}</p>
            <p className="text-white/60 text-sm">{item.label}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1">
          <Input
            label="Search candidates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
      </motion.div>

      {/* Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-white/60 mt-4">Loading candidates...</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">No candidates found</h3>
            <p className="text-white/40 text-sm">
              {searchQuery ? 'Try a different search term' : 'Add candidates to your jobs to see them here'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Candidate</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Job</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Added</th>
                  <th className="text-right text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredCandidates.map((candidate, index) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                      onClick={() => router.push(`/dashboard/candidates/${candidate.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {candidate.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                              {candidate.name}
                            </p>
                            <p className="text-white/40 text-sm">{candidate.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/80 text-sm">{candidate.job_title || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60 text-sm">
                        {new Date(candidate.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(`${window.location.origin}/interview/${candidate.interview_token}`);
                            }}
                            className="p-2 rounded-lg text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                            title="Copy interview link"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}