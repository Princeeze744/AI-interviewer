'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  notes?: string;
  job_id: string;
  interview_token: string;
  created_at: string;
}

interface Interview {
  id: string;
  status: string;
  video_url?: string;
  transcript?: string;
  duration_seconds?: number;
  created_at: string;
  completed_at?: string;
  scores?: {
    category: string;
    score: number;
    reasoning: string;
  }[];
}

export default function CandidateDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [job, setJob] = useState<any>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchCandidateData();
  }, [candidateId]);

  const fetchCandidateData = async () => {
    try {
      const candidateResponse = await api.get(`/candidates/${candidateId}`);
      setCandidate(candidateResponse.data);

      // Fetch job details
      const jobResponse = await api.get(`/jobs/${candidateResponse.data.job_id}`);
      setJob(jobResponse.data);

      // Try to fetch interview (may not exist yet)
      try {
        const interviewsResponse = await api.get(`/interviews?candidate_id=${candidateId}`);
        if (interviewsResponse.data.length > 0) {
          setInterview(interviewsResponse.data[0]);
        }
      } catch (e) {
        // No interview yet
      }
    } catch (error) {
      console.error('Error fetching candidate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyInterviewLink = () => {
    if (candidate) {
      navigator.clipboard.writeText(`${window.location.origin}/interview/${candidate.interview_token}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invited': return 'bg-electric-500/20 text-electric-400 border-electric-500/30';
      case 'started': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'reviewed': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  // Mock scores for demo
  const mockScores = [
    { category: 'Communication', score: 8.5, reasoning: 'Clear articulation, good pace, maintained eye contact' },
    { category: 'Technical Skills', score: 7.8, reasoning: 'Solid understanding of core concepts, some gaps in advanced topics' },
    { category: 'Problem Solving', score: 8.2, reasoning: 'Structured approach, good analytical thinking' },
    { category: 'Culture Fit', score: 9.0, reasoning: 'Enthusiastic, aligns with company values' },
    { category: 'Red Flags', score: 2.0, reasoning: 'Minor: Could improve on specific examples' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Candidate not found</h2>
        <Button variant="primary" onClick={() => router.push('/dashboard/candidates')} className="mt-4">
          Back to Candidates
        </Button>
      </div>
    );
  }

  const overallScore = mockScores.slice(0, 4).reduce((acc, s) => acc + s.score, 0) / 4;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {candidate.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{candidate.name}</h1>
              <p className="text-white/60">{candidate.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
                {job && (
                  <span className="text-white/40 text-sm">• {job.title}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={copyInterviewLink}>
              {copiedLink ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Link
                </>
              )}
            </Button>
            <Button variant="primary">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Reminder
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">AI Assessment</h2>
            <p className="text-white/60 text-sm">Based on video interview analysis</p>
          </div>
          <div className="text-right">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {overallScore.toFixed(1)}
            </motion.div>
            <p className="text-white/40 text-sm">Overall Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {mockScores.map((score, index) => (
            <motion.div
              key={score.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`p-4 rounded-xl ${
                score.category === 'Red Flags' ? 'bg-coral-500/10' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{score.category}</span>
                <span className={`font-bold ${
                  score.category === 'Red Flags'
                    ? score.score <= 3 ? 'text-emerald-400' : 'text-coral-400'
                    : score.score >= 8 ? 'text-emerald-400' : score.score >= 6 ? 'text-amber-400' : 'text-coral-400'
                }`}>
                  {score.score}/10
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score.score * 10}%` }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className={`h-full rounded-full ${
                    score.category === 'Red Flags'
                      ? score.score <= 3 ? 'bg-emerald-500' : 'bg-coral-500'
                      : score.score >= 8 ? 'bg-emerald-500' : score.score >= 6 ? 'bg-amber-500' : 'bg-coral-500'
                  }`}
                />
              </div>
              <p className="text-white/40 text-xs mt-2 line-clamp-2">{score.reasoning}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interview Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="aspect-video bg-navy-900 flex items-center justify-center relative">
            {interview?.video_url ? (
              <video src={interview.video_url} controls className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white/60">No video recorded yet</p>
                <p className="text-white/40 text-sm">Waiting for candidate to complete interview</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Candidate Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 space-y-6"
        >
          <div>
            <h3 className="text-white font-semibold mb-4">Candidate Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-white/80 text-sm">{candidate.email}</span>
              </div>
              {candidate.phone && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white/80 text-sm">{candidate.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white/80 text-sm">Added {new Date(candidate.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule Follow-up
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Add Notes
              </Button>
              <Button variant="secondary" className="w-full justify-start text-coral-400 hover:bg-coral-500/10">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove Candidate
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transcript */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Interview Transcript</h3>
        {interview?.transcript ? (
          <div className="bg-white/5 rounded-xl p-4 max-h-64 overflow-y-auto">
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {interview.transcript}
            </p>
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl p-8 text-center">
            <p className="text-white/60">Transcript will appear here after the interview is completed and processed.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}