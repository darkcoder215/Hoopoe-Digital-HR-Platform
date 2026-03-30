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
  TrendingUp, Award, BarChart3, Layers, Users, Activity, Gauge,
} from 'lucide-react';

/* ── Radar Chart SVG ── */
function SkillRadar({ skills }: { skills: { name: string; score: number }[] }) {
  const top = skills.slice(0, 6);
  const cx = 100, cy = 100, maxR = 70;
  const levels = [0.25, 0.5, 0.75, 1];
  const n = top.length;

  const getPoint = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPolygons = levels.map((l) =>
    top.map((_, i) => getPoint(i, maxR * l)).map((p) => `${p.x},${p.y}`).join(' ')
  );

  const dataPoints = top.map((s, i) => getPoint(i, maxR * (s.score / 100)));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px]">
        {/* Grid */}
        {gridPolygons.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="#E8E3E1" strokeWidth={i === levels.length - 1 ? 1 : 0.5} opacity={0.6} />
        ))}
        {/* Axes */}
        {top.map((_, i) => {
          const p = getPoint(i, maxR);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E8E3E1" strokeWidth={0.5} opacity={0.5} />;
        })}
        {/* Data */}
        <polygon points={dataPolygon} fill="rgba(206,131,69,0.15)" stroke="#CE8345" strokeWidth={1.5} />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#CE8345" />
        ))}
        {/* Labels */}
        {top.map((s, i) => {
          const p = getPoint(i, maxR + 18);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="text-[7px] font-bold fill-hoopoe-black/50">
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Compatibility Score Ring ── */
function CompatibilityRing({ label, score, color }: { label: string; score: number; color: string }) {
  const r = 22, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <svg width={52} height={52} className="-rotate-90">
          <circle cx={26} cy={26} r={r} stroke="#E8E3E1" strokeWidth={3.5} fill="none" />
          <circle cx={26} cy={26} r={r} stroke={color} strokeWidth={3.5} fill="none"
            strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000 ease-out" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black" style={{ color }}>{score}%</span>
      </div>
      <span className="text-[9px] font-bold text-hoopoe-black/40 text-center leading-tight">{label}</span>
    </div>
  );
}

/* ── Mini Metric Card ── */
function MiniMetric({ icon: Icon, label, value, color, bg }: {
  icon: React.ElementType; label: string; value: string; color: string; bg: string;
}) {
  return (
    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-hoopoe-lt-gray/40">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={14} className={color} />
      </div>
      <div>
        <p className="text-[9px] text-hoopoe-black/35 font-bold">{label}</p>
        <p className="text-sm font-black text-hoopoe-black leading-tight">{value}</p>
      </div>
    </div>
  );
}

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

  // Computed analytics
  const daysInPipeline = Math.floor((Date.now() - new Date(candidate.uploadedAt).getTime()) / 86400000);
  const avgSkillScore = report ? Math.round(report.skills.reduce((s, sk) => s + sk.score, 0) / report.skills.length) : 0;
  const topSkill = report ? [...report.skills].sort((a, b) => b.score - a.score)[0] : null;
  const expertSkills = report ? report.skills.filter((s) => s.score >= 80).length : 0;

  // Compatibility scores (derived from report data for richer display)
  const technicalFit = report ? Math.min(100, Math.round(avgSkillScore * 1.1)) : 0;
  const culturalFit = report ? Math.min(100, Math.round(60 + report.strengths.length * 8 - report.concerns.length * 5)) : 0;
  const experienceFit = report ? Math.min(100, Math.round(report.experience.length * 25 + report.education.length * 15)) : 0;
  const overallFit = report ? Math.round((technicalFit + culturalFit + experienceFit) / 3) : 0;

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
      <div className="p-8 max-w-[1400px]">
        {/* Back link */}
        <Link href="/candidates" className="inline-flex items-center gap-1.5 text-xs font-bold text-hoopoe-black/40 hover:text-hoopoe-orange transition-colors mb-6">
          <ArrowRight size={14} /> العودة للمرشحين
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ═══ Left column — Report & Analytics ═══ */}
          <div className="xl:col-span-2 space-y-6">

            {/* ── Header Card ── */}
            <Card className="card-entrance">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hoopoe-orange/15 to-hoopoe-orange/5 text-hoopoe-orange flex items-center justify-center text-xl font-black flex-shrink-0">
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
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-hoopoe-black/50 font-bold">
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

            {/* ── Quick Metrics Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 card-entrance stagger-2">
              <MiniMetric icon={Clock} label="أيام في المسار" value={`${daysInPipeline} يوم`} color="text-hoopoe-navy" bg="bg-hoopoe-navy/8" />
              <MiniMetric icon={Layers} label="المرحلة الحالية" value={`${stageIndex + 1} من ${PIPELINE_STAGES.length}`} color="text-hoopoe-orange" bg="bg-hoopoe-orange/8" />
              <MiniMetric icon={Zap} label="مهارات متقدمة" value={`${expertSkills} مهارة`} color="text-hoopoe-success" bg="bg-hoopoe-success/8" />
              <MiniMetric icon={Award} label="أعلى مهارة" value={topSkill?.name || '—'} color="text-hoopoe-brown" bg="bg-hoopoe-brown/8" />
            </div>

            {/* ── Pipeline Progress ── */}
            <Card className="card-entrance stagger-3">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="section-icon bg-hoopoe-orange/8">
                  <Target size={14} className="text-hoopoe-orange" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-hoopoe-black">تقدم مراحل التوظيف</h3>
                  <p className="text-[10px] text-hoopoe-black/30 font-semibold">المرحلة {stageIndex + 1} من {PIPELINE_STAGES.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {PIPELINE_STAGES.map((stage, i) => {
                  const isPast = i < stageIndex;
                  const isCurrent = i === stageIndex;
                  return (
                    <div key={stage.key} className="flex-1 flex flex-col items-center">
                      <div className={cn(
                        'w-full h-2 rounded-full transition-all duration-500',
                        isPast ? 'bg-hoopoe-success' : isCurrent ? 'bg-hoopoe-orange animate-pulse-orange' : 'bg-hoopoe-lt-gray/60'
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

            {/* ── AI Report ── */}
            {report ? (
              <>
                {/* Summary + Compatibility */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Card className="md:col-span-3 card-entrance stagger-4">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-orange/8">
                        <Brain size={14} className="text-hoopoe-orange" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-black">ملخص تحليل الذكاء الاصطناعي</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">تقرير شامل عن المرشح</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-hoopoe-black/65 leading-relaxed font-semibold">{report.summary}</p>
                    <div className="mt-4 pt-3 border-t border-hoopoe-lt-gray/30 flex items-center gap-4 text-[10px] text-hoopoe-black/35 font-bold">
                      <span className="flex items-center gap-1"><Activity size={10} /> تم التحليل {formatDate(report.analyzedAt)}</span>
                      <span className="flex items-center gap-1"><BarChart3 size={10} /> {report.skills.length} مهارات تم تقييمها</span>
                    </div>
                  </Card>

                  <Card className="md:col-span-2 card-entrance stagger-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-success/8">
                        <Gauge size={14} className="text-hoopoe-success" />
                      </div>
                      <h3 className="text-xs font-black text-hoopoe-black">مؤشر التوافق</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 place-items-center">
                      <CompatibilityRing label="تقني" score={technicalFit} color="#CE8345" />
                      <CompatibilityRing label="ثقافي" score={culturalFit} color="#2D7D46" />
                      <CompatibilityRing label="الخبرة" score={experienceFit} color="#252A35" />
                      <CompatibilityRing label="الإجمالي" score={overallFit} color={overallFit >= 75 ? '#2D7D46' : '#CE8345'} />
                    </div>
                  </Card>
                </div>

                {/* Skills Radar + Bar Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="card-entrance stagger-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-navy/8">
                        <BarChart3 size={14} className="text-hoopoe-navy" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-black">خريطة المهارات</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">توزيع المهارات بشكل رادار</p>
                      </div>
                    </div>
                    <SkillRadar skills={report.skills} />
                    <div className="mt-3 text-center">
                      <span className="text-[10px] font-bold text-hoopoe-black/30">متوسط المهارات: </span>
                      <span className={cn('text-[11px] font-black', getScoreColor(avgSkillScore))}>{avgSkillScore}/١٠٠</span>
                    </div>
                  </Card>

                  <Card className="card-entrance stagger-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-orange/8">
                        <Zap size={14} className="text-hoopoe-orange" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-black">تقييم المهارات</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">{report.skills.length} مهارات تم تحليلها</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report.skills.map((skill) => (
                        <div key={skill.name} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-hoopoe-black">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className={cn('text-[11px] font-black', getScoreColor(skill.score))}>{skill.score}</span>
                              {skill.yearsOfExperience && (
                                <span className="text-[9px] text-hoopoe-black/25 font-bold bg-hoopoe-surface px-1.5 py-0.5 rounded-md">{skill.yearsOfExperience} سنة</span>
                              )}
                            </div>
                          </div>
                          <div className="h-1.5 bg-hoopoe-lt-gray/40 rounded-full overflow-hidden">
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
                </div>

                {/* Strengths & Concerns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="card-entrance stagger-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-success/8">
                        <CheckCircle size={14} className="text-hoopoe-success" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-success">نقاط القوة</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">{report.strengths.length} نقاط إيجابية</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {report.strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-hoopoe-success/[0.05] border border-hoopoe-success/10">
                          <Star size={12} className="text-hoopoe-success mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-hoopoe-black/65 font-semibold">{s}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card className="card-entrance stagger-7">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="section-icon bg-hoopoe-brown/8">
                        <AlertTriangle size={14} className="text-hoopoe-brown" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-brown">ملاحظات</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">{report.concerns.length} نقاط للمراجعة</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {report.concerns.map((c, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-hoopoe-brown/[0.05] border border-hoopoe-brown/10">
                          <Shield size={12} className="text-hoopoe-brown mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-hoopoe-black/65 font-semibold">{c}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Experience + Education side by side */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Card className="md:col-span-3 card-entrance stagger-7">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="section-icon bg-hoopoe-orange/8">
                        <Briefcase size={14} className="text-hoopoe-orange" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-black">الخبرات العملية</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">{report.experience.length} خبرات مسجلة</p>
                      </div>
                    </div>
                    <div className="relative space-y-4 pr-6">
                      <div className="absolute right-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-hoopoe-orange/40 via-hoopoe-lt-gray/50 to-transparent" />
                      {report.experience.map((exp, i) => (
                        <div key={i} className="relative slide-in-rtl" style={{ animationDelay: `${i * 0.1}s` }}>
                          <div className="absolute -right-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-hoopoe-orange bg-white z-10" />
                          <div className="p-3 rounded-xl bg-hoopoe-surface/30 border border-hoopoe-lt-gray/20">
                            <h4 className="text-[12px] font-bold text-hoopoe-black">{exp.role}</h4>
                            <p className="text-[11px] text-hoopoe-orange font-bold">{exp.company}</p>
                            <p className="text-[9px] text-hoopoe-black/25 mt-0.5 font-bold">{exp.startDate} — {exp.endDate}</p>
                            <p className="text-[11px] text-hoopoe-black/55 mt-1.5 leading-relaxed font-semibold">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="md:col-span-2 card-entrance stagger-8">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="section-icon bg-hoopoe-navy/8">
                        <GraduationCap size={14} className="text-hoopoe-navy" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-hoopoe-black">التعليم</h3>
                        <p className="text-[10px] text-hoopoe-black/30 font-semibold">{report.education.length} شهادة</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {report.education.map((edu, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-hoopoe-surface/40 border border-hoopoe-lt-gray/20">
                          <div className="w-10 h-10 rounded-xl bg-hoopoe-navy/8 flex items-center justify-center flex-shrink-0">
                            <GraduationCap size={16} className="text-hoopoe-navy" />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-hoopoe-black">{edu.degree} في {edu.field}</p>
                            <p className="text-[10px] text-hoopoe-black/40 font-semibold">{edu.institution}</p>
                            <p className="text-[9px] text-hoopoe-black/25 font-bold mt-0.5">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Recommendation */}
                    <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-l from-hoopoe-orange/8 to-hoopoe-brown/5 border border-hoopoe-orange/15">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={12} className="text-hoopoe-orange" />
                        <span className="text-[10px] font-black text-hoopoe-orange">توصية الذكاء الاصطناعي</span>
                      </div>
                      <p className="text-[11px] text-hoopoe-black/55 font-semibold leading-relaxed">
                        {report.overallScore >= 85 ? 'مرشح متميز — يُنصح بالمضي قدماً في عملية التوظيف بأسرع وقت' :
                         report.overallScore >= 70 ? 'مرشح جيد — يحتاج إلى تقييم إضافي في بعض المجالات' :
                         'مرشح واعد — يُنصح بإجراء مقابلة تقنية معمقة'}
                      </p>
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="animate-scale-in text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-hoopoe-orange/8 flex items-center justify-center mx-auto mb-4">
                  <Brain size={28} className="text-hoopoe-orange animate-pulse-orange" />
                </div>
                <h3 className="text-sm font-black text-hoopoe-black mb-1">تحليل الذكاء الاصطناعي قيد الانتظار</h3>
                <p className="text-xs text-hoopoe-black/40 font-semibold">هذه السيرة الذاتية في قائمة الانتظار للتحليل الآلي</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-hoopoe-orange/40 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* ═══ Right column — Actions & Notes ═══ */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="card-entrance stagger-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="section-icon bg-hoopoe-orange/8">
                  <TrendingUp size={14} className="text-hoopoe-orange" />
                </div>
                <h3 className="text-xs font-black text-hoopoe-black">الإجراءات</h3>
              </div>
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
                  className="w-full px-4 py-2.5 text-xs font-bold border border-hoopoe-lt-gray rounded-xl bg-white focus:border-hoopoe-orange outline-none transition-colors"
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

            {/* Score Breakdown (sidebar) */}
            {report && (
              <Card className="card-entrance stagger-3">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="section-icon bg-hoopoe-brown/8">
                    <BarChart3 size={14} className="text-hoopoe-brown" />
                  </div>
                  <h3 className="text-xs font-black text-hoopoe-black">ملخص التقييم</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'التقييم العام', value: report.overallScore, color: getScoreColor(report.overallScore) },
                    { label: 'متوسط المهارات', value: avgSkillScore, color: getScoreColor(avgSkillScore) },
                    { label: 'التوافق التقني', value: technicalFit, color: getScoreColor(technicalFit) },
                    { label: 'التوافق الثقافي', value: culturalFit, color: getScoreColor(culturalFit) },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-hoopoe-black/50">{item.label}</span>
                        <span className={cn('text-[11px] font-black', item.color)}>{item.value}%</span>
                      </div>
                      <div className="h-1 bg-hoopoe-lt-gray/40 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-hoopoe-orange transition-all duration-1000 ease-out" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes */}
            <Card className="card-entrance stagger-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="section-icon bg-hoopoe-mid-orange/10">
                  <MessageSquare size={14} className="text-hoopoe-mid-orange" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-hoopoe-black">الملاحظات</h3>
                  <p className="text-[10px] text-hoopoe-black/30 font-semibold">{candidate.notes.length} ملاحظة</p>
                </div>
              </div>
              <div className="space-y-2 mb-3 max-h-[300px] overflow-y-auto">
                {candidate.notes.length === 0 && (
                  <p className="text-[10px] text-hoopoe-black/30 font-semibold py-6 text-center">لا توجد ملاحظات بعد</p>
                )}
                {candidate.notes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-hoopoe-surface/50 border border-hoopoe-lt-gray/20">
                    <p className="text-[11px] text-hoopoe-black/65 font-semibold">{note.content}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[9px] font-black text-hoopoe-orange">{note.author}</span>
                      <span className="text-[9px] text-hoopoe-black/25 font-bold">{formatDate(note.createdAt)}</span>
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
                  className="flex-1 px-3 py-2 text-[11px] font-semibold border border-hoopoe-lt-gray rounded-xl focus:border-hoopoe-orange focus:ring-2 focus:ring-hoopoe-focus outline-none transition-all placeholder:text-hoopoe-black/25"
                />
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>
                  <Send size={12} />
                </Button>
              </div>
            </Card>

            {/* Stage History */}
            {candidate.transitions.length > 0 && (
              <Card className="card-entrance stagger-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="section-icon bg-hoopoe-navy/8">
                    <Clock size={14} className="text-hoopoe-navy" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-hoopoe-black">سجل المراحل</h3>
                    <p className="text-[10px] text-hoopoe-black/30 font-semibold">{candidate.transitions.length} انتقال</p>
                  </div>
                </div>
                <div className="relative space-y-2 pr-4">
                  <div className="absolute right-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-hoopoe-orange/40 via-hoopoe-lt-gray/50 to-transparent" />
                  {[...candidate.transitions].reverse().map((t, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[10px] relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-hoopoe-orange/80 border-2 border-white flex-shrink-0 z-10" />
                      <div className="flex-1">
                        <span className="font-black text-hoopoe-black/70">
                          {PIPELINE_STAGES.find((s) => s.key === t.to)?.label}
                        </span>
                        <span className="text-hoopoe-black/40 font-semibold"> بواسطة {t.by}</span>
                      </div>
                      <span className="text-hoopoe-black/25 font-bold text-[9px]">{formatDate(t.date)}</span>
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
