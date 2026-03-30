'use client';

import { use, useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import Button from '@/components/ui/Button';
import { useCandidatesStore } from '@/stores/candidates-store';
import { PIPELINE_STAGES } from '@/lib/constants';
import { PipelineStage } from '@/lib/types';
import { cn, getInitials, formatDate, getScoreColor } from '@/lib/utils';
import Link from 'next/link';
import {
  ArrowRight, Mail, Phone, FileText, Download, ChevronLeft,
  CheckCircle, AlertTriangle, Briefcase, GraduationCap, Clock,
  MessageSquare, Send, Brain, Zap, Shield, Target, Star,
} from 'lucide-react';

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const candidate = useCandidatesStore((s) => s.getCandidate(id));
  const updateStage = useCandidatesStore((s) => s.updateStage);
  const addNote = useCandidatesStore((s) => s.addNote);
  const [noteText, setNoteText] = useState('');

  if (!candidate) {
    return (
      <>
        <Topbar title="المرشح غير موجود" />
        <div className="p-8 text-center">
          <p className="text-hoopoe-black/40 font-bold">هذا المرشح غير موجود.</p>
          <Link href="/candidates"><Button variant="secondary" className="mt-4">العودة للمرشحين</Button></Link>
        </div>
      </>
    );
  }

  const report = candidate.aiReport;
  const stageIndex = PIPELINE_STAGES.findIndex((s) => s.key === candidate.stage);
  const nextStage = PIPELINE_STAGES[stageIndex + 1];

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(candidate.id, {
      id: Date.now().toString(),
      author: 'مدير الموارد البشرية',
      content: noteText,
      createdAt: new Date().toISOString(),
    });
    setNoteText('');
  };

  return (
    <>
      <Topbar title={candidate.name} subtitle={candidate.position} />
      <div className="p-8 max-w-[1280px]">
        {/* Back link */}
        <Link href="/candidates" className="inline-flex items-center gap-1.5 text-xs font-bold text-hoopoe-black/40 hover:text-hoopoe-orange transition-colors mb-6">
          <ArrowRight size={14} /> العودة للمرشحين
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left column - Report */}
          <div className="xl:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="card-entrance">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-xl font-black flex-shrink-0">
                  {getInitials(candidate.name)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-black text-hoopoe-black">{candidate.name}</h2>
                      <p className="text-sm text-hoopoe-black/50 mt-0.5 font-bold">{candidate.position}</p>
                    </div>
                    {report && <ScoreGauge score={report.overallScore} size="md" />}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-hoopoe-black/50 font-bold">
                    <span className="flex items-center gap-1"><Mail size={12} />{candidate.email}</span>
                    {candidate.phone && <span className="flex items-center gap-1"><Phone size={12} />{candidate.phone}</span>}
                    <span className="flex items-center gap-1"><FileText size={12} />{candidate.cvFileName}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="stage" stage={candidate.stage} />
                    <span className="text-[10px] text-hoopoe-black/30 font-bold">تم الرفع {formatDate(candidate.uploadedAt)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pipeline Progress */}
            <Card className="card-entrance stagger-2">
              <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-4 flex items-center gap-2">
                <Target size={14} className="text-hoopoe-orange" /> تقدم مراحل التوظيف
              </h3>
              <div className="flex items-center gap-0.5">
                {PIPELINE_STAGES.map((stage, i) => {
                  const isPast = i < stageIndex;
                  const isCurrent = i === stageIndex;
                  return (
                    <div key={stage.key} className="flex-1 flex flex-col items-center">
                      <div className={cn(
                        'w-full h-1.5 rounded-full transition-all duration-500',
                        isPast ? 'bg-hoopoe-success' : isCurrent ? 'bg-hoopoe-orange animate-pulse-orange' : 'bg-hoopoe-lt-gray'
                      )} />
                      <span className={cn(
                        'text-[8px] mt-1.5 text-center leading-tight font-bold',
                        isCurrent ? 'text-hoopoe-orange font-black' : isPast ? 'text-hoopoe-success/70' : 'text-hoopoe-black/20'
                      )}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* AI Report */}
            {report ? (
              <>
                {/* Summary */}
                <Card className="card-entrance stagger-3">
                  <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-3 flex items-center gap-2">
                    <Brain size={14} className="text-hoopoe-orange" /> ملخص تحليل الذكاء الاصطناعي
                  </h3>
                  <p className="text-sm text-hoopoe-black/70 leading-relaxed font-bold">{report.summary}</p>
                </Card>

                {/* Skills */}
                <Card className="card-entrance stagger-4">
                  <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-hoopoe-orange" /> تقييم المهارات
                  </h3>
                  <div className="space-y-3">
                    {report.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-hoopoe-black">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={cn('text-xs font-black', getScoreColor(skill.score))}>{skill.score}</span>
                            {skill.yearsOfExperience && (
                              <span className="text-[9px] text-hoopoe-black/30 font-bold">{skill.yearsOfExperience} سنة خبرة</span>
                            )}
                          </div>
                        </div>
                        <div className="h-2 bg-hoopoe-lt-gray/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.score}%`,
                              background: skill.score >= 80 ? '#2D7D46' : skill.score >= 60 ? 'linear-gradient(90deg, #CE8345, #E7A15E)' : '#E7A15E',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Strengths & Concerns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="card-entrance stagger-5">
                    <h3 className="text-xs font-black text-hoopoe-success tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle size={14} /> نقاط القوة
                    </h3>
                    <div className="space-y-2">
                      {report.strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-hoopoe-success/[0.06]">
                          <Star size={12} className="text-hoopoe-success mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-hoopoe-black/70 font-bold">{s}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card className="card-entrance stagger-6">
                    <h3 className="text-xs font-black text-hoopoe-brown tracking-wider mb-3 flex items-center gap-2">
                      <AlertTriangle size={14} /> ملاحظات
                    </h3>
                    <div className="space-y-2">
                      {report.concerns.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-hoopoe-brown/[0.06]">
                          <Shield size={12} className="text-hoopoe-brown mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-hoopoe-black/70 font-bold">{c}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Experience */}
                <Card className="card-entrance stagger-7">
                  <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase size={14} className="text-hoopoe-orange" /> الخبرات العملية
                  </h3>
                  <div className="relative space-y-4 pr-6">
                    <div className="absolute right-[7px] top-2 bottom-2 w-px bg-hoopoe-lt-gray" />
                    {report.experience.map((exp, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -right-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-hoopoe-orange bg-white z-10" />
                        <h4 className="text-sm font-bold text-hoopoe-black">{exp.role}</h4>
                        <p className="text-xs text-hoopoe-orange font-bold">{exp.company}</p>
                        <p className="text-[10px] text-hoopoe-black/30 mt-0.5 font-bold">{exp.startDate} — {exp.endDate}</p>
                        <p className="text-xs text-hoopoe-black/60 mt-1.5 leading-relaxed font-bold">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Education */}
                <Card className="card-entrance stagger-8">
                  <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap size={14} className="text-hoopoe-orange" /> التعليم
                  </h3>
                  {report.education.map((edu, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-hoopoe-surface/50">
                      <div className="w-9 h-9 rounded-xl bg-hoopoe-orange/10 flex items-center justify-center">
                        <GraduationCap size={16} className="text-hoopoe-orange" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-hoopoe-black">{edu.degree} في {edu.field}</p>
                        <p className="text-[10px] text-hoopoe-black/40 font-bold">{edu.institution} • {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </Card>
              </>
            ) : (
              <Card className="animate-scale-in text-center py-12">
                <Brain size={40} className="mx-auto text-hoopoe-lt-gray mb-3 animate-pulse-orange" />
                <h3 className="text-sm font-bold text-hoopoe-black mb-1">تحليل الذكاء الاصطناعي قيد الانتظار</h3>
                <p className="text-xs text-hoopoe-black/40 font-bold">هذه السيرة الذاتية في قائمة الانتظار للتحليل الآلي</p>
              </Card>
            )}
          </div>

          {/* Right column - Actions */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="card-entrance stagger-2">
              <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-3">الإجراءات</h3>
              <div className="space-y-2">
                {nextStage && (
                  <Button
                    onClick={() => updateStage(candidate.id, nextStage.key)}
                    className="w-full justify-between"
                  >
                    نقل إلى {nextStage.label}
                    <ChevronLeft size={14} />
                  </Button>
                )}
                <select
                  value={candidate.stage}
                  onChange={(e) => updateStage(candidate.id, e.target.value as PipelineStage)}
                  className="w-full px-4 py-2.5 text-xs font-bold border border-hoopoe-lt-gray rounded-xl bg-white focus:border-hoopoe-orange outline-none"
                >
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
                <Button variant="ghost" className="w-full" size="sm">
                  <Download size={14} /> تحميل السيرة الذاتية
                </Button>
              </div>
            </Card>

            {/* Notes */}
            <Card className="card-entrance stagger-3">
              <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-3 flex items-center gap-2">
                <MessageSquare size={12} /> الملاحظات ({candidate.notes.length})
              </h3>
              <div className="space-y-2 mb-3 max-h-[300px] overflow-y-auto">
                {candidate.notes.length === 0 && (
                  <p className="text-[10px] text-hoopoe-black/30 italic font-bold py-4 text-center">لا توجد ملاحظات بعد</p>
                )}
                {candidate.notes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-hoopoe-surface/50 border border-hoopoe-lt-gray/30">
                    <p className="text-xs text-hoopoe-black/70 font-bold">{note.content}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[9px] font-black text-hoopoe-orange">{note.author}</span>
                      <span className="text-[9px] text-hoopoe-black/30 font-bold">{formatDate(note.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أضف ملاحظة..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  className="flex-1 px-3 py-2 text-xs font-bold border border-hoopoe-lt-gray rounded-xl focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none"
                />
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>
                  <Send size={12} />
                </Button>
              </div>
            </Card>

            {/* Stage History */}
            {candidate.transitions.length > 0 && (
              <Card className="card-entrance stagger-4">
                <h3 className="text-xs font-black text-hoopoe-black tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={12} /> سجل المراحل
                </h3>
                <div className="space-y-2">
                  {[...candidate.transitions].reverse().map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-hoopoe-orange flex-shrink-0" />
                      <span className="text-hoopoe-black/50 font-bold">
                        <span className="font-black text-hoopoe-black/70">
                          {PIPELINE_STAGES.find((s) => s.key === t.to)?.label}
                        </span>
                        {' '}بواسطة {t.by}
                      </span>
                      <span className="mr-auto text-hoopoe-black/30 font-bold">{formatDate(t.date)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
