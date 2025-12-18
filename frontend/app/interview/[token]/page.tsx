'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';

interface InterviewData {
  name: string;
  job_title: string;
  company: string;
  questions: { id: number; question: string; time_limit: number }[];
}

export default function InterviewPage() {
  const params = useParams();
  const token = params.token as string;

  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<'welcome' | 'setup' | 'interview' | 'uploading' | 'complete'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraReady, setCameraReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    fetchInterviewData();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [token]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const fetchInterviewData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/candidates/interview/${token}`);
      if (!response.ok) throw new Error('Interview not found');
      const data = await response.json();
      setInterviewData(data);
    } catch (err) {
      setError('Interview link is invalid or expired');
    } finally {
      setIsLoading(false);
    }
  };

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraReady(true);
    } catch (err) {
      setError('Unable to access camera. Please allow camera permissions.');
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9',
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
    setTimeLeft(interviewData!.questions[currentQuestion].time_limit);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const uploadVideo = async (videoBlob: Blob, questionId: number): Promise<boolean> => {
    const formData = new FormData();
    formData.append('file', videoBlob, `question_${questionId}.webm`);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/videos/upload/${token}/${questionId}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      console.log('Upload successful:', result);
      return true;
    } catch (error) {
      console.error('Error uploading video:', error);
      return false;
    }
  };

  const completeInterview = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/videos/complete/${token}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to complete interview:', error);
    }
  };

  const nextQuestion = async () => {
    // Create blob from recorded chunks
    if (recordedChunks.length > 0) {
      setStage('uploading');
      setUploadProgress(0);
      
      const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      try {
        // Upload the video
        const success = await uploadVideo(videoBlob, interviewData!.questions[currentQuestion].id);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        if (!success) {
          console.error('Failed to upload video');
        }
        
        // Wait a bit to show 100%
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error('Failed to upload video:', error);
        clearInterval(progressInterval);
      }
    }
    
    setRecordedChunks([]);
    setUploadProgress(0);
    
    if (currentQuestion < interviewData!.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(interviewData!.questions[currentQuestion + 1].time_limit);
      setStage('interview');
    } else {
      // Complete the interview
      await completeInterview();
      
      setStage('complete');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-coral-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-electric-500 rounded-full filter blur-[150px] opacity-20"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-20"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* Welcome Stage */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-8 max-w-lg text-center"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 relative"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-500 to-cyan-500 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl -rotate-6 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Hi {interviewData?.name}! 👋
              </h1>
              <p className="text-white/60 mb-6">
                Welcome to your video interview for <span className="text-cyan-400">{interviewData?.job_title}</span> at <span className="text-cyan-400">{interviewData?.company}</span>
              </p>

              <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                <h3 className="text-white font-medium mb-3">What to expect:</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    {interviewData?.questions.length} questions to answer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Each question has a time limit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">•</span>
                    Your videos will be uploaded automatically
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStage('setup');
                  setupCamera();
                }}
                className="w-full py-4 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/25"
              >
                Let's Begin
              </motion.button>
            </motion.div>
          )}

          {/* Setup Stage */}
          {stage === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-8 max-w-2xl w-full"
            >
              <h2 className="text-xl font-bold text-white text-center mb-6">Camera Setup</h2>

              <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!cameraReady && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                      <p className="text-white/60">Accessing camera...</p>
                    </div>
                  </div>
                )}
              </div>

              {cameraReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400">Camera and microphone are ready!</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStage('interview')}
                    className="w-full py-4 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/25"
                  >
                    Start Interview
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Interview Stage */}
          {stage === 'interview' && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/60 text-sm">
                  Question {currentQuestion + 1} of {interviewData?.questions.length}
                </span>
                <div className="flex gap-2">
                  {interviewData?.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-2 rounded-full transition-all ${
                        index < currentQuestion
                          ? 'bg-emerald-500'
                          : index === currentQuestion
                          ? 'bg-cyan-500'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-white">
                  {interviewData?.questions[currentQuestion].question}
                </h2>
              </motion.div>

              {/* Video & Timer */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Recording indicator */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-coral-500 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">REC</span>
                      </div>
                    )}

                    {/* Timer */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur rounded-xl">
                      <span className={`text-2xl font-mono font-bold ${timeLeft < 30 ? 'text-coral-400' : 'text-white'}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">
                  {!isRecording ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startRecording}
                      className="flex-1 py-4 bg-gradient-to-r from-coral-500 to-amber-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <div className="w-4 h-4 bg-white rounded-full" />
                      Start Recording
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={stopRecording}
                      className="flex-1 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <div className="w-4 h-4 bg-coral-500 rounded" />
                      Stop Recording
                    </motion.button>
                  )}

                  {!isRecording && recordedChunks.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextQuestion}
                      className="flex-1 py-4 bg-gradient-to-r from-electric-500 to-cyan-500 rounded-xl text-white font-semibold"
                    >
                      {currentQuestion < interviewData!.questions.length - 1 ? 'Submit & Next Question' : 'Submit & Finish'}
                    </motion.button>
                  )}

                  <div className="glass rounded-xl p-4 mt-auto">
                    <h4 className="text-white/60 text-sm mb-2">Tips:</h4>
                    <ul className="text-white/40 text-xs space-y-1">
                      <li>• Look at the camera</li>
                      <li>• Speak clearly</li>
                      <li>• Take your time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Uploading Stage */}
          {stage === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass rounded-2xl p-8 max-w-md text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-electric-500/20 to-cyan-500/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
                />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Uploading Your Response</h2>
              <p className="text-white/60 mb-6">Please wait while we save your video...</p>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-electric-500 to-cyan-500 rounded-full"
                />
              </div>
              <p className="text-white/40 text-sm mt-2">{uploadProgress}%</p>
            </motion.div>
          )}

          {/* Complete Stage */}
          {stage === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 max-w-lg text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Interview Complete! 🎉
              </h1>
              <p className="text-white/60 mb-6">
                Thank you for completing your interview. The hiring team at <span className="text-cyan-400">{interviewData?.company}</span> will review your responses and get back to you soon.
              </p>

              <div className="bg-white/5 rounded-xl p-4 text-left">
                <h3 className="text-white font-medium mb-2">What happens next?</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Your responses have been saved
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    AI analysis will be generated
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    The team will reach out via email
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}