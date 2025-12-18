'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api';

interface Interview {
  id: string;
  candidate_id: string;
  candidate_name?: string;
  candidate_email?: string;
  job_id: string;
  job_title?: string;
  status: string;
  duration_seconds?: number;
  created_at: string;
  completed_at?: string;
}

export default function InterviewsPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await api.get('/interviews');
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      // Mock data for demo
      setInterviews([
        { id: '1', candidate_id: '1', candidate_name: 'John Smith', candidate_email: 'john@example.com', job_id: '1', job_title: 'Senior Developer', status: 'completed', duration_seconds: 1845, created_at: new Date().toISOString(), completed_at: new Date().toISOString() },
        { id: '2', candidate_id: '2', candidate_name: 'Sarah Johnson', candidate_email: 'sarah@example.com', job_id: '1', job_title: 'Senior Developer', status: 'completed', duration_seconds: 2100, created_at: new Date().toISOString(), completed_at: new Date().toISOString() },
        { id: '3', candidate_id: '3', candidate_name: 'Mike Chen', candidate_email: 'mike@example.com', job_id: '2', job_title: 'Product Manager', status: 'processing', duration_seconds: 1650, created_at: new Date().toISOString() },
        { id: '4', candidate_id: '4', candidate_name: 'Emily Davis', candidate_email: 'emily@example.com', job_id: '2', job_title: 'Product Manager', status: 'pending', created_at: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInterviews = statusFilter === 'all' 
    ? interviews 
    : interviews.filter(i => i.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-white/10 text-white/60 border-white/20';
      case 'processing': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'failed': return 'bg-coral-500/20 text-coral-400 border-coral-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const statusCounts = {
    all: interviews.length,
    pending: interviews.filter(i => i.status === 'pending').length,
    processing: interviews.filter(i => i.status === 'processing').length,
    completed: interviews.filter(i => i.status === 'completed').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">Interviews</h1>
        <p className="text-white/60 mt-2">Review and analyze completed interviews</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { status: 'all', label: 'Total', icon: '🎥', color: 'from-electric-500 to-cyan-500' },
          { status: 'pending', label: 'Pending', icon: '⏳', color: 'from-white/20 to-white/10' },
          { status: 'processing', label: 'Processing', icon: '⚙️', color: 'from-amber-500 to-amber-400' },
          { status: 'completed', label: 'Completed', icon: '✅', color: 'from-emerald-500 to-emerald-400' },
        ].map((item, index) => (
          <motion.button
            key={item.status}
            whileHover={{ y: -5 }}
            onClick={() => setStatusFilter(item.status)}
            className={`glass rounded-xl p-6 text-left transition-all ${
              statusFilter === item.status ? 'ring-2 ring-cyan-500' : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
              <span className="text-xl">{item.icon}</span>
            </div>
            <p className="text-3xl font-bold text-white">{statusCounts[item.status as keyof typeof statusCounts]}</p>
            <p className="text-white/60 text-sm">{item.label}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Interviews List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h2 className="text-white font-semibold text-lg">All Interviews</h2>
          <p className="text-white/40 text-sm">Click on an interview to view details</p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">No interviews yet</h3>
            <p className="text-white/40 text-sm">Interviews will appear here when candidates complete them</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => router.push(`/dashboard/interviews/${interview.id}`)}
                className="p-6 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">
                      {interview.candidate_name?.charAt(0) || '?'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                        {interview.candidate_name || 'Unknown'}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-white/40 text-sm">{interview.job_title || 'N/A'}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/40 text-sm">{interview.candidate_email}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-right">
                    <p className="text-white font-medium">{formatDuration(interview.duration_seconds)}</p>
                    <p className="text-white/40 text-sm">
                      {new Date(interview.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}