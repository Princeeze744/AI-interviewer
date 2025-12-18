'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import Textarea from '@/src/components/ui/Textarea';

interface Question {
  id: number;
  question: string;
  time_limit: number;
}

export default function CreateJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: 'Tell me about yourself and your background.', time_limit: 120 },
  ]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id), 0) + 1;
    setQuestions([...questions, { id: newId, question: '', time_limit: 120 }]);
  };

  const updateQuestion = (id: number, field: 'question' | 'time_limit', value: string | number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/jobs', {
        title,
        description,
        required_skills: skills,
        questions: questions.filter((q) => q.question.trim()),
      });

      router.push(`/dashboard/jobs/${response.data.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
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
          Back to Jobs
        </button>
        <h1 className="text-3xl font-bold text-white">Create New Job</h1>
        <p className="text-white/60 mt-2">Fill in the details and add interview questions</p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4"
      >
        {[
          { num: 1, label: 'Basic Info' },
          { num: 2, label: 'Skills' },
          { num: 3, label: 'Questions' },
        ].map((s, index) => (
          <React.Fragment key={s.num}>
            <button
              onClick={() => setStep(s.num)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s.num
                    ? 'bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {step > s.num ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span className={`text-sm ${step >= s.num ? 'text-cyan-400' : 'text-white/40'}`}>
                {s.label}
              </span>
            </button>
            {index < 2 && (
              <div className={`flex-1 h-1 rounded-full transition-all ${
                step > s.num ? 'bg-gradient-to-r from-electric-500 to-cyan-500' : 'bg-white/10'
              }`} />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>

              <Input
                label="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <Textarea
                label="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />

              <div className="flex justify-end pt-4">
                <Button
                  variant="primary"
                  onClick={() => setStep(2)}
                  disabled={!title.trim()}
                >
                  Next: Add Skills
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Required Skills</h2>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="e.g. Python, React, SQL"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    }
                  />
                </div>
                <Button variant="secondary" onClick={addSkill} className="mt-1 h-[58px]">
                  Add
                </Button>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-white/5 rounded-xl border border-white/10">
                <AnimatePresence>
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="px-4 py-2 bg-gradient-to-r from-electric-500/20 to-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.span>
                    ))
                  ) : (
                    <p className="text-white/40 text-sm">No skills added yet. Add skills to help candidates understand the requirements.</p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)}>
                  Next: Add Questions
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Questions */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Interview Questions</h2>
                <Button variant="secondary" size="sm" onClick={addQuestion}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Question
                </Button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {questions.map((q, index) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {index + 1}
                        </span>

                        <div className="flex-1 space-y-4">
                          <textarea
                            value={q.question}
                            onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                            placeholder="Enter your interview question..."
                            className="w-full bg-navy-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 resize-none transition-colors"
                            rows={2}
                          />

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white/60">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm">Time limit:</span>
                            </div>
                            <select
                              value={q.time_limit}
                              onChange={(e) => updateQuestion(q.id, 'time_limit', parseInt(e.target.value))}
                              className="bg-navy-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                            >
                              <option value={60}>1 minute</option>
                              <option value={120}>2 minutes</option>
                              <option value={180}>3 minutes</option>
                              <option value={300}>5 minutes</option>
                            </select>
                          </div>
                        </div>

                        {questions.length > 1 && (
                          <button
                            onClick={() => removeQuestion(q.id)}
                            className="w-10 h-10 rounded-xl bg-coral-500/10 border border-coral-500/30 flex items-center justify-center text-coral-400 hover:bg-coral-500/20 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={!questions.some((q) => q.question.trim())}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create Job
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">Preview</h3>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg">{title || 'Job Title'}</h4>
            <p className="text-white/40 text-sm mt-1">
              {skills.length} skill{skills.length !== 1 ? 's' : ''} • {questions.filter((q) => q.question.trim()).length} question{questions.filter((q) => q.question.trim()).length !== 1 ? 's' : ''}
            </p>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-cyan-500/20 rounded text-cyan-400 text-xs">
                    {skill}
                  </span>
                ))}
                {skills.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 rounded text-white/60 text-xs">
                    +{skills.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}