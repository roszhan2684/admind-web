'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import UploadZone from '../components/UploadZone';
import LoadingState from '../components/LoadingState';
import ResultsDashboard from '../components/ResultsDashboard';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? ''
    : 'http://127.0.0.1:5050');

export default function Home() {
  const [phase, setPhase] = useState('upload'); // 'upload' | 'loading' | 'results'
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = useCallback((selectedFile) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  }, [previewUrl]);

  const handleAnalyze = async () => {
    if (!file) return;

    setPhase('loading');
    setProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        onUploadProgress: (e) => {
          const pct = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          setProgress(pct);
        },
      });
      setResult(res.data);
      setPhase('results');
    } catch (err) {
      console.error('Upload error:', err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? 'Cannot reach backend. Make sure it is running and NEXT_PUBLIC_API_URL is set.'
          : 'Analysis failed. Please try again.');
      setError(msg);
      setPhase('upload');
    }
  };

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPhase('upload');
    setFile(null);
    setPreviewUrl('');
    setResult(null);
    setError(null);
    setProgress(0);
  }, [previewUrl]);

  return (
    <main className="min-h-screen bg-grid relative">
      {/* Ambient gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-56 -left-56 w-[700px] h-[700px] bg-violet-700/20 rounded-full blur-[130px] animate-float" />
        <div className="absolute -bottom-56 -right-56 w-[700px] h-[700px] bg-cyan-700/10 rounded-full blur-[130px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {phase === 'upload' && (
        <UploadZone
          file={file}
          previewUrl={previewUrl}
          onFileSelect={handleFileSelect}
          onAnalyze={handleAnalyze}
          error={error}
        />
      )}

      {phase === 'loading' && (
        <LoadingState progress={progress} fileName={file?.name} isVideo={file?.type?.startsWith('video/')} />
      )}

      {phase === 'results' && result && (
        <ResultsDashboard
          result={result}
          file={file}
          previewUrl={previewUrl}
          apiUrl={API_URL}
          onReset={handleReset}
        />
      )}
    </main>
  );
}
