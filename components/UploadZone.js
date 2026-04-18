'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ImageIcon, VideoIcon, Sparkles, AlertCircle,
  X, Brain, Zap, BarChart3, Eye, Tag,
} from 'lucide-react';

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const FEATURES = [
  { icon: Brain,    label: 'Emotion Detection',   desc: 'Detect dominant emotions in faces' },
  { icon: Eye,      label: 'Attention Heatmaps',   desc: 'See where viewers focus' },
  { icon: BarChart3,label: 'Creative Scoring',     desc: '0-100 effectiveness score' },
  { icon: Zap,      label: 'AI Insights',          desc: 'Powered by Google Gemini' },
  { icon: Tag,      label: 'Object & Brand Detection', desc: 'YOLO + OCR analysis' },
  { icon: Sparkles, label: 'Color Intelligence',   desc: 'Dominant palette extraction' },
];

const FORMATS = ['JPG', 'PNG', 'WebP', 'GIF', 'MP4', 'MOV', 'WebM'];

export default function UploadZone({ file, previewUrl, onFileSelect, onAnalyze, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const isVideo = file?.type?.startsWith('video/');

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) onFileSelect(dropped);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        {/* Logo */}
        <motion.div
          className="inline-flex items-center justify-center gap-3 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl blur-md opacity-60" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-black tracking-tight gradient-text leading-none">
              AdMind
            </h1>
            <p className="text-[11px] text-violet-400/70 font-medium tracking-[0.2em] uppercase mt-0.5">
              AI Creative Intelligence
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-xl font-light max-w-lg mx-auto leading-relaxed"
        >
          Drop your ad creative. Get deep AI analysis{' '}
          <span className="text-violet-300 font-medium">in seconds.</span>
        </motion.p>
      </motion.div>

      {/* ── Upload Card ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        <div className="glass-card rounded-3xl p-7 shadow-2xl shadow-black/40">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !file && inputRef.current?.click()}
            className={`
              relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden
              ${isDragging
                ? 'border-violet-400 drop-active scale-[1.01]'
                : file
                  ? 'border-gray-700/70 cursor-default'
                  : 'border-gray-700 hover:border-violet-600/70 hover:drop-active cursor-pointer group'
              }
            `}
          >
            <AnimatePresence mode="wait">
              {/* ── Empty state ── */}
              {!file && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-14 px-8 select-none"
                >
                  <div
                    className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300
                      ${isDragging
                        ? 'bg-violet-600 scale-110 shadow-lg shadow-violet-500/40'
                        : 'bg-gray-800 group-hover:bg-gray-700/80'
                      }
                    `}
                  >
                    <Upload
                      className={`w-9 h-9 transition-colors ${
                        isDragging ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    />
                  </div>

                  <p className="text-gray-100 font-semibold text-xl mb-2">
                    {isDragging ? 'Release to analyze' : 'Drop your creative here'}
                  </p>
                  <p className="text-gray-500 text-sm mb-6">or click to browse files</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {FORMATS.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2.5 py-1 bg-gray-800/80 border border-gray-700/60 rounded-lg text-xs text-gray-400 font-mono"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs">Maximum file size: 200 MB</p>
                </motion.div>
              )}

              {/* ── Preview state ── */}
              {file && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  {isVideo ? (
                    <video
                      src={previewUrl}
                      className="w-full max-h-72 object-contain bg-black rounded-xl"
                      controls
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Ad preview"
                      className="w-full max-h-72 object-contain rounded-xl bg-gray-900"
                    />
                  )}

                  {/* File info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      {isVideo
                        ? <VideoIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        : <ImageIcon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      }
                      <span className="text-sm text-white font-medium truncate flex-1">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-black/40 px-2 py-0.5 rounded-md flex-shrink-0">
                        {formatBytes(file.size)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileSelect && inputRef.current?.click();
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors border border-white/10"
                    title="Change file"
                  >
                    <X className="w-3.5 h-3.5 text-gray-300" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileSelect(f);
              e.target.value = '';
            }}
          />

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-4 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-3">
            {file && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => inputRef.current?.click()}
                className="px-5 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all text-sm font-medium flex-shrink-0"
              >
                Change
              </motion.button>
            )}
            <button
              onClick={file ? onAnalyze : () => inputRef.current?.click()}
              className={`
                flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2.5
                ${file
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.99]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              {file ? 'Analyze Creative →' : 'Select a File'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Feature Pills ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10 w-full max-w-3xl"
      >
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-5 font-medium">
          What AdMind analyzes
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FEATURES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              className="flex items-start gap-3 px-4 py-3 bg-gray-900/40 border border-white/5 rounded-xl hover:border-violet-500/20 hover:bg-violet-900/10 transition-all duration-200 group cursor-default"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-900/40 border border-violet-700/30 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-700/30 transition-colors">
                <Icon className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-300 leading-tight">{label}</p>
                <p className="text-[11px] text-gray-600 mt-0.5 leading-tight">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-xs text-gray-700"
      >
        Built by Roszhan · Powered by Gemini AI + YOLOv8 + FER
      </motion.p>
    </div>
  );
}
