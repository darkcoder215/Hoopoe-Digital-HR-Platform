'use client';

import { useState, useCallback, useRef } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Badge from '@/components/ui/Badge';
import { useCandidatesStore } from '@/stores/candidates-store';
import { POSITIONS } from '@/lib/constants';
import { Candidate } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Upload, FileText, X, CheckCircle, Brain, Loader2, Sparkles,
  CloudUpload, File, AlertCircle,
} from 'lucide-react';

type AnalysisStep = 'idle' | 'uploading' | 'parsing' | 'analyzing' | 'complete';

const analysisSteps: { key: AnalysisStep; label: string; icon: React.ElementType }[] = [
  { key: 'uploading', label: 'Uploading file...', icon: CloudUpload },
  { key: 'parsing', label: 'Parsing CV content...', icon: FileText },
  { key: 'analyzing', label: 'AI analyzing qualifications...', icon: Brain },
  { key: 'complete', label: 'Analysis complete!', icon: CheckCircle },
];

function generateMockReport() {
  const score = 60 + Math.floor(Math.random() * 35);
  return {
    overallScore: score,
    summary: 'The candidate demonstrates strong technical skills with relevant industry experience. Their background shows progressive growth in responsibilities and a solid educational foundation. Communication skills appear well-developed based on CV presentation.',
    skills: [
      { name: 'Technical Proficiency', level: 'advanced' as const, score: 65 + Math.floor(Math.random() * 30), yearsOfExperience: 3 },
      { name: 'Problem Solving', level: 'advanced' as const, score: 60 + Math.floor(Math.random() * 35), yearsOfExperience: 4 },
      { name: 'Communication', level: 'intermediate' as const, score: 55 + Math.floor(Math.random() * 30), yearsOfExperience: 3 },
      { name: 'Leadership', level: 'intermediate' as const, score: 50 + Math.floor(Math.random() * 30), yearsOfExperience: 2 },
      { name: 'Domain Knowledge', level: 'advanced' as const, score: 60 + Math.floor(Math.random() * 30), yearsOfExperience: 3 },
    ],
    experience: [
      { company: 'Previous Company', role: 'Senior Role', startDate: '2021', endDate: 'Present', description: 'Led key initiatives and delivered impactful results.' },
      { company: 'Earlier Company', role: 'Mid-Level Role', startDate: '2018', endDate: '2021', description: 'Contributed to team projects and grew technical skills.' },
    ],
    education: [
      { institution: 'University', degree: 'BSc', field: 'Computer Science', year: '2018' },
    ],
    strengths: ['Strong technical foundation', 'Clear career progression', 'Well-structured CV presentation'],
    concerns: ['Could benefit from more leadership experience', 'Limited cross-functional exposure'],
    recommendedStage: 'screening' as const,
    analyzedAt: new Date().toISOString(),
  };
}

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState(POSITIONS[0]);
  const [step, setStep] = useState<AnalysisStep>('idle');
  const [newCandidate, setNewCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addCandidate = useCandidatesStore((s) => s.addCandidate);

  const handleFile = useCallback((f: File) => {
    setError('');
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(f.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const startAnalysis = async () => {
    if (!file) return;
    setStep('uploading');
    await new Promise((r) => setTimeout(r, 1200));
    setStep('parsing');
    await new Promise((r) => setTimeout(r, 1500));
    setStep('analyzing');
    await new Promise((r) => setTimeout(r, 2000));

    const candidate: Candidate = {
      id: Date.now().toString(),
      name: file.name.replace(/\.(pdf|doc|docx)$/i, '').replace(/[_-]/g, ' '),
      email: 'candidate@email.com',
      stage: 'ai_analysis',
      cvFileName: file.name,
      uploadedAt: new Date().toISOString(),
      position,
      aiReport: generateMockReport(),
      notes: [],
      transitions: [
        { from: 'cv_received', to: 'ai_analysis', date: new Date().toISOString(), by: 'System' },
      ],
    };
    addCandidate(candidate);
    setNewCandidate(candidate);
    setStep('complete');
  };

  const reset = () => {
    setFile(null);
    setStep('idle');
    setNewCandidate(null);
    setError('');
  };

  const currentStepIndex = analysisSteps.findIndex((s) => s.key === step);

  return (
    <>
      <Topbar title="Upload CV" subtitle="AI-powered candidate analysis" />
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        {/* Drop Zone */}
        {step === 'idle' && (
          <Card className="animate-scale-in">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
                dragOver
                  ? 'border-hoopoe-orange bg-hoopoe-lt-orange/20 scale-[1.01]'
                  : 'border-hoopoe-lt-gray bg-hoopoe-surface/30 hover:border-hoopoe-mid-orange hover:bg-hoopoe-lt-orange/10'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className={cn(
                'w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-200',
                dragOver ? 'bg-hoopoe-orange text-white scale-110' : 'bg-hoopoe-orange/10 text-hoopoe-orange'
              )}>
                <Upload size={28} />
              </div>
              <h3 className="text-base font-semibold text-hoopoe-black mb-1">
                {dragOver ? 'Drop your CV here' : 'Drag & drop CV file'}
              </h3>
              <p className="text-xs text-hoopoe-black/40 mb-4">
                or click to browse — PDF, DOC, DOCX up to 10MB
              </p>
              <div className="flex items-center justify-center gap-6 text-[10px] text-hoopoe-black/30">
                <span className="flex items-center gap-1"><Sparkles size={10} /> AI-Powered Analysis</span>
                <span className="flex items-center gap-1"><Brain size={10} /> Instant Results</span>
                <span className="flex items-center gap-1"><CheckCircle size={10} /> No Human Intervention</span>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-hoopoe-brown/10 text-hoopoe-brown text-xs animate-scale-in">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
          </Card>
        )}

        {/* File selected - pre-analysis */}
        {file && step === 'idle' && (
          <Card className="animate-slide-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-hoopoe-orange/10 flex items-center justify-center">
                <File size={22} className="text-hoopoe-orange" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-hoopoe-black">{file.name}</p>
                <p className="text-xs text-hoopoe-black/40">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="p-1.5 rounded-lg hover:bg-hoopoe-surface transition-colors cursor-pointer">
                <X size={16} className="text-hoopoe-black/40" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-hoopoe-black/70 mb-2">Position Applying For</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-hoopoe-lt-gray rounded-lg bg-white focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none transition-all"
              >
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <Button onClick={startAnalysis} className="w-full" size="lg">
              <Brain size={18} />
              Start AI Analysis
            </Button>
          </Card>
        )}

        {/* Analysis Progress */}
        {step !== 'idle' && step !== 'complete' && (
          <Card className="animate-scale-in" padding="lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-hoopoe-orange/10 mx-auto mb-4 flex items-center justify-center">
                <Loader2 size={28} className="text-hoopoe-orange animate-spin" />
              </div>
              <h3 className="text-base font-semibold text-hoopoe-black">Analyzing CV</h3>
              <p className="text-xs text-hoopoe-black/40 mt-1">{file?.name}</p>
            </div>

            <div className="space-y-3">
              {analysisSteps.map((s, i) => {
                const Icon = s.icon;
                const isActive = s.key === step;
                const isDone = i < currentStepIndex;
                return (
                  <div
                    key={s.key}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
                      isActive && 'bg-hoopoe-lt-orange/20',
                      isDone && 'opacity-60'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
                      isActive ? 'bg-hoopoe-orange text-white' : isDone ? 'bg-hoopoe-success/20 text-hoopoe-success' : 'bg-hoopoe-lt-gray/50 text-hoopoe-black/20'
                    )}>
                      {isDone ? <CheckCircle size={16} /> : isActive ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
                    </div>
                    <span className={cn(
                      'text-sm',
                      isActive ? 'text-hoopoe-black font-medium' : isDone ? 'text-hoopoe-black/50' : 'text-hoopoe-black/25'
                    )}>
                      {s.label}
                    </span>
                    {isActive && (
                      <div className="ml-auto flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-hoopoe-orange animate-pulse-orange" />
                        <div className="w-1.5 h-1.5 rounded-full bg-hoopoe-orange animate-pulse-orange stagger-2" />
                        <div className="w-1.5 h-1.5 rounded-full bg-hoopoe-orange animate-pulse-orange stagger-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-1.5 bg-hoopoe-lt-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-hoopoe-orange to-hoopoe-mid-orange rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((currentStepIndex + 1) / analysisSteps.length) * 100}%` }}
              />
            </div>
          </Card>
        )}

        {/* Analysis Complete */}
        {step === 'complete' && newCandidate?.aiReport && (
          <Card className="animate-scale-in" padding="lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-hoopoe-success/10 mx-auto mb-4 flex items-center justify-center animate-float">
                <CheckCircle size={28} className="text-hoopoe-success" />
              </div>
              <h3 className="text-lg font-bold text-hoopoe-black">Analysis Complete</h3>
              <p className="text-xs text-hoopoe-black/40 mt-1">{file?.name} has been processed</p>
            </div>

            <div className="flex items-center justify-center gap-8 mb-6 p-4 bg-hoopoe-surface/50 rounded-xl">
              <ScoreGauge score={newCandidate.aiReport.overallScore} size="lg" />
              <div className="text-left">
                <p className="text-sm font-semibold text-hoopoe-black mb-2">{newCandidate.name}</p>
                <p className="text-xs text-hoopoe-black/50 mb-2">{newCandidate.position}</p>
                <Badge variant="stage" stage={newCandidate.stage} />
                <div className="mt-3 space-y-1">
                  {newCandidate.aiReport.strengths.slice(0, 2).map((s, i) => (
                    <p key={i} className="text-[11px] text-hoopoe-success flex items-center gap-1">
                      <CheckCircle size={10} /> {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href={`/candidates/${newCandidate.id}`} className="flex-1">
                <Button className="w-full">View Full Report</Button>
              </Link>
              <Button variant="secondary" onClick={reset}>Upload Another</Button>
            </div>
          </Card>
        )}

        {/* Features */}
        {step === 'idle' && !file && (
          <div className="grid grid-cols-3 gap-4 animate-slide-up stagger-3">
            {[
              { icon: Brain, title: 'AI-Powered', desc: 'Deep analysis of skills, experience, and qualifications' },
              { icon: Sparkles, title: 'Instant Results', desc: 'Get comprehensive reports in seconds, not days' },
              { icon: CheckCircle, title: 'Zero Bias', desc: 'Objective scoring without human intervention' },
            ].map((f) => (
              <Card key={f.title} padding="sm" className="text-center">
                <div className="w-10 h-10 rounded-xl bg-hoopoe-orange/10 mx-auto mb-3 flex items-center justify-center">
                  <f.icon size={18} className="text-hoopoe-orange" />
                </div>
                <h4 className="text-xs font-semibold text-hoopoe-black mb-1">{f.title}</h4>
                <p className="text-[10px] text-hoopoe-black/40 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
