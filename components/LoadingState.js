'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Brain, BarChart3, Sparkles, CheckCircle2, ImageIcon, VideoIcon } from 'lucide-react';

const IMAGE_STEPS = [
  {
    icon: Scan,
    label: 'Uploading creative',
    description: 'Transferring your file securely to the analysis engine',
    color: 'from-blue-600 to-cyan-600',
    done_color: 'bg-green-600',
  },
  {
    icon: Brain,
    label: 'Running computer vision',
    description: 'Detecting faces, emotions, objects, and layout balance',
    color: 'from-violet-600 to-purple-600',
    done_color: 'bg-green-600',
  },
  {
    icon: BarChart3,
    label: 'Scoring your creative',
    description: 'Calculating effectiveness, palette, and brand alignment',
    color: 'from-purple-600 to-pink-600',
    done_color: 'bg-green-600',
  },
  {
    icon: Sparkles,
    label: 'Generating AI insights',
    description: 'Asking Gemini for strategic recommendations',
    color: 'from-amber-500 to-orange-500',
    done_color: 'bg-green-600',
  },
];

const VIDEO_STEPS = [
  {
    icon: Scan,
    label: 'Uploading video',
    description: 'Transferring your video file to the ML engine',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: VideoIcon,
    label: 'Sampling frames',
    description: 'Extracting keyframes at 1 FPS for analysis',
    color: 'from-violet-600 to-purple-600',
  },
  {
    icon: Brain,
    label: 'Analyzing each frame',
    description: 'Running emotion detection, YOLO, and OCR per frame',
    color: 'from-purple-600 to-pink-600',
  },
  {
    icon: BarChart3,
    label: 'Aggregating results',
    description: 'Building emotion timeline and global color palette',
    color: 'from-pink-600 to-rose-600',
  },
  {
    icon: Sparkles,
    label: 'Generating AI insights',
    description: 'Asking Gemini for video-level strategic recommendations',
    color: 'from-amber-500 to-orange-500',
  },
];

const WITTY_MESSAGES = [
  'Teaching the AI what "good" looks like…',
  'Counting pixels so you don\'t have to…',
  'Running neural networks at full speed…',
  'Asking the AI for its honest opinion…',
  'Detecting vibes with computer vision…',
  'Heatmapping viewer attention zones…',
  'Cross-referencing with 10,000 ads…',
  'Almost there — this is the fun part…',
];

export default function LoadingState({ progress, fileName, isVideo }) {
  const STEPS = isVideo ? VIDEO_STEPS : IMAGE_STEPS;
  const [currentStep, setCurrentStep] = useState(0);
  const [wittyIdx, setWittyIdx] = useState(0);

  // Drive steps by upload progress
  useEffect(() => {
    const total = STEPS.length;
    const step = Math.min(Math.floor((progress / 100) * (total - 1)), total - 2);
    setCurrentStep(step);
  }, [progress, STEPS.length]);

  // After upload (100%), auto-advance remaining steps
  useEffect(() => {
    if (progress < 100) return;
    const timer = setInterval(() => {
      setCurrentStep((s) => {
        if (s < STEPS.length - 1) return s + 1;
        clearInterval(timer);
        return s;
      });
    }, isVideo ? 4500 : 3000);
    return () => clearInterval(timer);
  }, [progress, STEPS.length, isVideo]);

  // Rotate witty messages
  useEffect(() => {
    const t = setInterval(() => {
      setWittyIdx((i) => (i + 1) % WITTY_MESSAGES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Pulsing logo */}
      <div className="relative mb-10">
        {/* Outer ring */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 -m-4 rounded-full bg-violet-500/20 blur-xl"
        />
        {/* Inner ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.25, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute inset-0 -m-1 rounded-3xl bg-violet-500/30 blur-md"
        />
        {/* Core */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-600 to-purple-800 flex items-center justify-center shadow-2xl shadow-violet-500/40"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-1"
      >
        Analyzing Your Creative
      </motion.h2>

      {fileName && (
        <p className="text-gray-500 text-sm mb-2 max-w-xs truncate text-center">
          {isVideo ? <VideoIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-cyan-500" /> : <ImageIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-violet-500" />}
          {fileName}
        </p>
      )}

      {/* Witty message */}
      <div className="h-6 mb-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={wittyIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-xs text-gray-600 italic text-center"
          >
            {WITTY_MESSAGES[wittyIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-2.5 mb-8">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          const isPending = i > currentStep;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`
                flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-500
                ${isActive
                  ? 'border-violet-500/40 bg-violet-900/20 shadow-lg shadow-violet-500/10'
                  : isDone
                    ? 'border-green-500/20 bg-green-900/10'
                    : 'border-white/5 bg-gray-900/30'
                }
              `}
            >
              {/* Step icon */}
              <div
                className={`
                  w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500
                  ${isActive
                    ? `bg-gradient-to-br ${step.color} shadow-md`
                    : isDone
                      ? 'bg-green-600'
                      : 'bg-gray-800'
                  }
                `}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-gray-500'}`} style={{ width: 18, height: 18 }} />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold leading-tight transition-colors ${
                    isActive ? 'text-white' : isDone ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-gray-500 mt-0.5 leading-tight"
                  >
                    {step.description}
                  </motion.p>
                )}
              </div>

              {/* Active spinner */}
              {isActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-violet-400/60 border-t-violet-300 rounded-full flex-shrink-0"
                />
              )}
              {isDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500 text-sm flex-shrink-0"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Upload progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
          <span>Upload progress</span>
          <motion.span
            key={progress}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {progress >= 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-violet-400 text-center mt-2"
          >
            Upload complete — running ML analysis…
          </motion.p>
        )}
      </div>
    </div>
  );
}
