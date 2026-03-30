'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PIPELINE_STAGES } from '@/lib/constants';
import {
  Settings, Brain, Bell, Users, Shield, Palette, Sliders,
  Check, ToggleLeft, ToggleRight, Mail,
} from 'lucide-react';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="cursor-pointer">
      {enabled ? (
        <ToggleRight size={28} className="text-hoopoe-orange" />
      ) : (
        <ToggleLeft size={28} className="text-hoopoe-lt-gray" />
      )}
    </button>
  );
}

export default function SettingsPage() {
  const [autoAnalysis, setAutoAnalysis] = useState(true);
  const [minScore, setMinScore] = useState(60);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [stageNotifs, setStageNotifs] = useState(true);
  const [reportNotifs, setReportNotifs] = useState(true);

  return (
    <>
      <Topbar title="Settings" subtitle="Platform configuration" />
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        {/* AI Settings */}
        <Card className="animate-slide-up">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-orange/10 flex items-center justify-center">
              <Brain size={18} className="text-hoopoe-orange" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-hoopoe-black">AI Analysis</h2>
              <p className="text-xs text-hoopoe-black/40">Configure automated screening behavior</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-hoopoe-surface/50">
              <div>
                <p className="text-xs font-medium text-hoopoe-black">Auto-analyze on upload</p>
                <p className="text-[10px] text-hoopoe-black/40">Automatically run AI analysis when a CV is uploaded</p>
              </div>
              <Toggle enabled={autoAnalysis} onToggle={() => setAutoAnalysis(!autoAnalysis)} />
            </div>
            <div className="p-3 rounded-lg bg-hoopoe-surface/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-hoopoe-black">Minimum score threshold</p>
                  <p className="text-[10px] text-hoopoe-black/40">Candidates below this score will be flagged for review</p>
                </div>
                <span className="text-sm font-bold text-hoopoe-orange">{minScore}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-hoopoe-orange"
              />
              <div className="flex justify-between text-[9px] text-hoopoe-black/30 mt-1">
                <span>0 (Accept all)</span>
                <span>100 (Very strict)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Pipeline Config */}
        <Card className="animate-slide-up stagger-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-navy/10 flex items-center justify-center">
              <Sliders size={18} className="text-hoopoe-navy" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-hoopoe-black">Pipeline Stages</h2>
              <p className="text-xs text-hoopoe-black/40">Active recruitment pipeline stages</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.key} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-hoopoe-surface/50 transition-colors group">
                <span className="text-[10px] text-hoopoe-black/30 w-4 text-center font-mono">{i + 1}</span>
                <div className="w-2 h-2 rounded-full bg-hoopoe-orange" />
                <span className="text-xs font-medium text-hoopoe-black flex-1">{stage.label}</span>
                <span className="text-[10px] text-hoopoe-black/30">{stage.description}</span>
                <Check size={14} className="text-hoopoe-success" />
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="animate-slide-up stagger-3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-mid-orange/15 flex items-center justify-center">
              <Bell size={18} className="text-hoopoe-mid-orange" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-hoopoe-black">Notifications</h2>
              <p className="text-xs text-hoopoe-black/40">Manage alert preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Email notifications', desc: 'Receive email alerts for important events', enabled: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
              { label: 'Stage change alerts', desc: 'Notify when candidates move between stages', enabled: stageNotifs, toggle: () => setStageNotifs(!stageNotifs) },
              { label: 'AI report completion', desc: 'Alert when AI analysis is ready', enabled: reportNotifs, toggle: () => setReportNotifs(!reportNotifs) },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-3 rounded-lg bg-hoopoe-surface/50">
                <div>
                  <p className="text-xs font-medium text-hoopoe-black">{n.label}</p>
                  <p className="text-[10px] text-hoopoe-black/40">{n.desc}</p>
                </div>
                <Toggle enabled={n.enabled} onToggle={n.toggle} />
              </div>
            ))}
          </div>
        </Card>

        {/* Team */}
        <Card className="animate-slide-up stagger-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-success/10 flex items-center justify-center">
              <Users size={18} className="text-hoopoe-success" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-hoopoe-black">Team Members</h2>
              <p className="text-xs text-hoopoe-black/40">People with access to this platform</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Mohammad Y. Omara', role: 'CEO', email: 'mohammad@hoopoe.digital' },
              { name: 'HR Admin', role: 'Administrator', email: 'hr@hoopoe.digital' },
              { name: 'Tech Lead', role: 'Reviewer', email: 'tech@hoopoe.digital' },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-hoopoe-surface/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-[10px] font-bold">
                  {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-hoopoe-black">{m.name}</p>
                  <p className="text-[10px] text-hoopoe-black/40">{m.email}</p>
                </div>
                <span className="text-[10px] font-medium text-hoopoe-orange bg-hoopoe-orange/10 px-2 py-0.5 rounded-full">{m.role}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-3">
            <Mail size={12} /> Invite Team Member
          </Button>
        </Card>

        {/* Brand */}
        <Card className="animate-slide-up stagger-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-lt-orange/30 flex items-center justify-center">
              <Palette size={18} className="text-hoopoe-brown" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-hoopoe-black">Branding</h2>
              <p className="text-xs text-hoopoe-black/40">Hoopoe Digital brand colors</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { name: 'Black', hex: '#20242C' },
              { name: 'Orange', hex: '#CE8345' },
              { name: 'Brown', hex: '#A34823' },
              { name: 'Mid Orange', hex: '#E7A15E' },
              { name: 'Light Orange', hex: '#F9CF9D' },
              { name: 'Navy', hex: '#252A35' },
            ].map((c) => (
              <div key={c.hex} className="flex-1 text-center">
                <div className="w-full aspect-square rounded-lg mb-1.5" style={{ backgroundColor: c.hex }} />
                <p className="text-[9px] text-hoopoe-black/50">{c.name}</p>
                <p className="text-[8px] text-hoopoe-black/30 font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
          <div className="brand-bar mt-4" />
        </Card>
      </div>
    </>
  );
}
