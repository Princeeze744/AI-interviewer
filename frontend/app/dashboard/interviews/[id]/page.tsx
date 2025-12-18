'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/src/components/ui/Button';

// Mock data for demo
const mockInterview = {
  id: '1',
  candidate: {
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'JS',
  },
  job: {
    title: 'Senior Developer',
    company: 'Acme Corp',
  },
  status: 'completed',
  duration: '30:45',
  completedAt: '2024-01-15T14:30:00Z',
  scores: {
    overall: 8.4,
    communication: 8.5,
    technical: 7.8,
    problemSolving: 8.2,
    cultureFit: 9.0,
    redFlags: 2.0,
  },
  questions: [
    {
      id: 1,
      question: 'Tell me about yourself and your background.',
      duration: '2:15',
      score: 8.5,
      transcript: "I'm a software engineer with 5 years of experience, primarily working with React and Node.js. I started my career at a startup where I learned to wear many hats, and then moved to a larger company where I specialized in frontend architecture. I'm passionate about building user-friendly applications and mentoring junior developers.",
      aiNotes: 'Clear and concise introduction. Good balance of technical and soft skills. Mentioned mentoring which shows leadership potential.',
    },
    {
      id: 2,
      question: 'Describe a challenging technical problem you solved.',
      duration: '4:30',
      score: 8.0,
      transcript: "At my previous company, we had a performance issue where our dashboard was taking 15 seconds to load. I identified that we were making too many API calls and not caching properly. I implemented React Query for caching, lazy loading for components, and optimized our GraphQL queries. We reduced load time to under 2 seconds.",
      aiNotes: 'Excellent technical depth. Showed systematic approach to problem-solving. Could have elaborated more on team collaboration aspects.',
    },
    {
      id: 3,
      question: 'How do you handle disagreements with team members?',
      duration: '3:00',
      score: 9.0,
      transcript: "I believe in data-driven discussions. When there's a disagreement, I try to understand the other person's perspective first. Then I present my viewpoint with supporting evidence. If we still can't agree, I'm open to running small experiments or seeking input from others. The goal is always what's best for the project, not winning the argument.",
      aiNotes: 'Mature and professional approach. Shows emotional intelligence and collaborative mindset. Excellent culture fit indicator.',
    },
  ],
};

export default function InterviewDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [activeQuestion, setActiveQuestion] = useState(0);

  const interview = mockInterview;

  const getScoreColor = (score: number, isRedFlag = false) => {
    if (isRedFlag) {
      return score <= 3 ? 'text-emerald-400' : 'text-coral-400';
    }
    if (score >= 8) return 'text-emerald-400';
    if (score >= 6) return 'text-amber-400';
    return 'text-coral-400';
  };

  const getScoreBarColor = (score: number, isRedFlag = false) => {
    if (isRedFlag) {
      return score <= 3 ? 'bg-emerald-500' : 'bg-coral-500';
    }
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 6) return 'bg-amber-500';
    return 'bg-coral-500';
  };

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
          Back to Interviews
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{interview.candidate.avatar}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{interview.candidate.name}</h1>
              <p className="text-white/60">{interview.job.title} at {interview.job.company}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Completed
                </span>
                <span className="text-white/40 text-sm">• {interview.duration} total</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report
            </Button>
            <Button variant="primary">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Results
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Overall Score */}
          <div className="md:col-span-2 text-center md:text-left">
            <p className="text-white/60 mb-2">Overall Score</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-7xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {interview.scores.overall}
            </motion.div>
            <p className="text-white/40 text-sm mt-2">out of 10</p>

            <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
              <Button variant="primary" size="sm">
                ✅ Advance
              </Button>
              <Button variant="ghost" size="sm" className="text-coral-400">
                ❌ Reject
              </Button>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Communication', score: interview.scores.communication, icon: '💬' },
              { label: 'Technical', score: interview.scores.technical, icon: '💻' },
              { label: 'Problem Solving', score: interview.scores.problemSolving, icon: '🧩' },
              { label: 'Culture Fit', score: interview.scores.cultureFit, icon: '🤝' },
              { label: 'Red Flags', score: interview.scores.redFlags, icon: '🚩', isRedFlag: true },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`p-4 rounded-xl ${item.isRedFlag ? 'bg-coral-500/10' : 'bg-white/5'} text-center`}
              >
                <span className="text-2xl">{item.icon}</span>
                <p className={`text-2xl font-bold mt-2 ${getScoreColor(item.score, item.isRedFlag)}`}>
                  {item.score}
                </p>
                <p className="text-white/40 text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Questions & Responses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Questions</h3>
          <div className="space-y-3">
            {interview.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestion(index)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  activeQuestion === index
                    ? 'bg-gradient-to-r from-electric-500/20 to-cyan-500/20 border border-cyan-500/30'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                    activeQuestion === index
                      ? 'bg-gradient-to-br from-electric-500 to-cyan-500 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{q.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/40 text-xs">{q.duration}</span>
                      <span className={`text-xs font-medium ${getScoreColor(q.score)}`}>{q.score}/10</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Question Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Video Player Placeholder */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-video bg-navy-900 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Question {activeQuestion + 1}</p>
                <p className="text-white/40 text-sm">{interview.questions[activeQuestion].duration}</p>
              </div>
            </div>
          </div>

          {/* Question & Transcript */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Question {activeQuestion + 1}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(interview.questions[activeQuestion].score)}`}>
                Score: {interview.questions[activeQuestion].score}/10
              </span>
            </div>
            <p className="text-cyan-400 mb-6">"{interview.questions[activeQuestion].question}"</p>

            <h4 className="text-white/60 text-sm font-medium mb-2">Transcript</h4>
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/80 text-sm leading-relaxed">
                {interview.questions[activeQuestion].transcript}
              </p>
            </div>

            <h4 className="text-white/60 text-sm font-medium mb-2">AI Analysis</h4>
            <div className="bg-gradient-to-br from-electric-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🤖</span>
                <p className="text-white/80 text-sm leading-relaxed">
                  {interview.questions[activeQuestion].aiNotes}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}