'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { api, candidatesAPI, jobsAPI } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import Modal from '@/src/components/ui/Modal';

interface Job {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  questions: { id: number; question: string; time_limit: number }[];
  status: string;
  created_at: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: string;
  interview_token: string;
  created_at: string;
}

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // New candidate form
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', phone: '' });
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);

  useEffect(() => {
    fetchJobData();
  }, [jobId]);

  const fetchJobData = async () => {
    try {
      const [jobResponse, candidatesResponse] = await Promise.all([
        api.get(`/jobs/${jobId}`),
        api.get(`/candidates/job/${jobId}`),
      ]);
      setJob(jobResponse.data);
      setCandidates(candidatesResponse.data);
    } catch (error) {
      console.error('Error fetching job data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCandidate = async () => {
    setIsAddingCandidate(true);
    try {
      const response = await candidatesAPI.create(jobId, newCandidate);
      setCandidates([response, ...candidates]);
      setNewCandidate({ name: '', email: '', phone: '' });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Error adding candidate:', error);
      alert(error.response?.data?.detail || 'Failed to add candidate');
    } finally {
      setIsAddingCandidate(false);
    }
  };

  const handleDeleteJob = async () => {
    setIsDeleting(true);
    try {
      await jobsAPI.delete(jobId);
      router.push('/dashboard/jobs');
    } catch (error: any) {
      console.error('Error deleting job:', error);
      alert(error.response?.data?.detail || 'Failed to delete job');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    if (!confirm('Are you sure you want to remove this candidate?')) return;
    
    try {
      await candidatesAPI.delete(candidateId);
      setCandidates(candidates.filter((c) => c.id !== candidateId));
    } catch (error: any) {
      console.error('Error deleting candidate:', error);
      alert(error.response?.data?.detail || 'Failed to delete candidate');
    }
  };

  const copyInterviewLink = (token: string) => {
    const link = `${window.location.origin}/interview/${token}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(token);
    setTimeout(() => setCopiedLink(null), 2000);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Job not found</h2>
        <Button variant="primary" onClick={() => router.push('/dashboard/jobs')} className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => router.push('/dashboard/jobs')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{job.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                job.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                job.status === 'paused' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                'bg-white/10 text-white/60 border-white/20'
              }`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
            <p className="text-white/60 mt-2">
              Created {new Date(job.created_at).toLocaleDateString()} • {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-coral-400 hover:text-coral-300 hover:bg-coral-500/10"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </Button>
            <Button variant="secondary">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Candidate
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Job Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            {job.description || 'No description provided.'}
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.required_skills && job.required_skills.length > 0 ? (
              job.required_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-white/40 text-sm">No skills specified</p>
            )}
          </div>
        </motion.div>

        {/* Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Interview Questions ({job.questions?.length || 0})
          </h3>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {job.questions && job.questions.map((q, index) => (
              <div key={q.id} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-500/20 text-electric-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <p className="text-white/60 text-sm">{q.question}</p>
                  <span className="text-white/30 text-xs">{q.time_limit / 60} min</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-lg">Candidates</h2>
            <p className="text-white/40 text-sm">Manage and track candidate progress</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Candidate
          </Button>
        </div>

        {candidates.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric-500/20 to-cyan-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">No candidates yet</h3>
            <p className="text-white/40 text-sm mb-4">Add candidates to start collecting interviews</p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Add First Candidate
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Candidate</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Added</th>
                  <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Interview Link</th>
                  <th className="text-right text-white/40 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {candidates.map((candidate, index) => (
                  <motion.tr
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {candidate.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{candidate.name}</p>
                          <p className="text-white/40 text-sm">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/60 text-sm">
                      {new Date(candidate.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => copyInterviewLink(candidate.interview_token)}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                      >
                        {copiedLink === candidate.interview_token ? (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy Link
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteCandidate(candidate.id)}
                          className="p-2 rounded-lg text-white/40 hover:text-coral-400 hover:bg-coral-500/10 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Add Candidate Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Candidate"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
            placeholder="e.g. John Smith"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <Input
            label="Email Address"
            type="email"
            value={newCandidate.email}
            onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
            placeholder="e.g. john@example.com"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          <Input
            label="Phone (Optional)"
            type="tel"
            value={newCandidate.phone}
            onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
            placeholder="e.g. +1 234 567 8900"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          />

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleAddCandidate}
              isLoading={isAddingCandidate}
              disabled={!newCandidate.name || !newCandidate.email}
            >
              Add Candidate
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Job Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Job"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-coral-500/10 border border-coral-500/30 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-coral-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Are you sure?</h3>
              <p className="text-white/60 text-sm">
                This will permanently delete <span className="text-coral-400 font-medium">{job.title}</span> and all {candidates.length} associated candidates.
              </p>
            </div>
          </div>

          <p className="text-white/40 text-sm">
            This action cannot be undone. All interview data, recordings, and candidate information will be permanently removed.
          </p>

          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 !bg-gradient-to-r !from-coral-500 !to-red-500"
              onClick={handleDeleteJob}
              isLoading={isDeleting}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Job
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}