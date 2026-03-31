'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PIPELINE_STAGES } from '@/lib/constants';
import {
  Brain, Bell, Users, Palette, Sliders,
  Check, ToggleLeft, ToggleRight, Mail,
} from 'lucide-react';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="cursor-pointer transition-transform duration-200 hover:scale-110">
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
      <Topbar title="Settings" subtitle="Platform Configuration" />
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        {/* AI Settings */}
        <Card className="card-entrance">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-orange/10 flex items-center justify-center">
              <Brain size={18} className="text-hoopoe-orange" />
            </div>
            <div>
              <h2 className="text-sm font-black text-hoopoe-black">AI Analysis</h2>
              <p className="text-xs text-hoopoe-black/40 font-bold">Configure automated screening behavior</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-hoopoe-surface/50">
              <div>
                <p className="text-xs font-bold text-hoopoe-black">Auto-Analyze on Upload</p>
                <p className="text-[10px] text-hoopoe-black/40 font-bold">Automatically run AI analysis when a CV is uploaded</p>
              </div>
              <Toggle enabled={autoAnalysis} onToggle={() => setAutoAnalysis(!autoAnalysis)} />
            </div>
            <div className="p-3 rounded-xl bg-hoopoe-surface/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-hoopoe-black">Minimum Score Threshold</p>
                  <p className="text-[10px] text-hoopoe-black/40 font-bold">Candidates below this score will be flagged for review</p>
                </div>
                <span className="text-sm font-black text-hoopoe-orange">{minScore}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-hoopoe-orange"
              />
              <div className="flex justify-between text-[9px] text-hoopoe-black/30 mt-1 font-bold">
                <span>0 (Accept All)</span>
                <span>100 (Very Strict)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Pipeline Config */}
        <Card className="card-entrance stagger-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-navy/10 flex items-center justify-center">
              <Sliders size={18} className="text-hoopoe-navy" />
            </div>
            <div>
              <h2 className="text-sm font-black text-hoopoe-black">Pipeline Stages</h2>
              <p className="text-xs text-hoopoe-black/40 font-bold">Active hiring pipeline stages</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.key} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-hoopoe-surface/50 transition-all duration-200 group">
                <span className="text-[10px] text-hoopoe-black/30 w-4 text-center font-mono font-black">{i + 1}</span>
                <div className="w-2 h-2 rounded-full bg-hoopoe-orange group-hover:scale-125 transition-transform duration-200" />
                <span className="text-xs font-bold text-hoopoe-black flex-1">{stage.label}</span>
                <span className="text-[10px] text-hoopoe-black/30 font-bold">{stage.description}</span>
                <Check size={14} className="text-hoopoe-success" />
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="card-entrance stagger-3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-mid-orange/15 flex items-center justify-center">
              <Bell size={18} className="text-hoopoe-mid-orange" />
            </div>
            <div>
              <h2 className="text-sm font-black text-hoopoe-black">Notifications</h2>
              <p className="text-xs text-hoopoe-black/40 font-bold">Manage alert preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Email Notifications', desc: 'Receive email alerts for important events', enabled: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
              { label: 'Stage Change Alerts', desc: 'Get notified when candidates move between stages', enabled: stageNotifs, toggle: () => setStageNotifs(!stageNotifs) },
              { label: 'AI Report Completion', desc: 'Alert when AI analysis is ready', enabled: reportNotifs, toggle: () => setReportNotifs(!reportNotifs) },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-3 rounded-xl bg-hoopoe-surface/50">
                <div>
                  <p className="text-xs font-bold text-hoopoe-black">{n.label}</p>
                  <p className="text-[10px] text-hoopoe-black/40 font-bold">{n.desc}</p>
                </div>
                <Toggle enabled={n.enabled} onToggle={n.toggle} />
              </div>
            ))}
          </div>
        </Card>

        {/* Team */}
        <Card className="card-entrance stagger-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-success/10 flex items-center justify-center">
              <Users size={18} className="text-hoopoe-success" />
            </div>
            <div>
              <h2 className="text-sm font-black text-hoopoe-black">Team Members</h2>
              <p className="text-xs text-hoopoe-black/40 font-bold">People with platform access</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Mohammad Y. Amara', role: 'CEO', email: 'mohammad@hoopoe.digital' },
              { name: 'HR Manager', role: 'Admin', email: 'hr@hoopoe.digital' },
              { name: 'Tech Lead', role: 'Reviewer', email: 'tech@hoopoe.digital' },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-hoopoe-surface/50 transition-all duration-200">
                <div className="w-8 h-8 rounded-full bg-hoopoe-orange/10 text-hoopoe-orange flex items-center justify-center text-[10px] font-black">
                  {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-hoopoe-black">{m.name}</p>
                  <p className="text-[10px] text-hoopoe-black/40 font-bold">{m.email}</p>
                </div>
                <span className="text-[10px] font-bold text-hoopoe-orange bg-hoopoe-orange/10 px-2 py-0.5 rounded-full">{m.role}</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-3">
            <Mail size={12} /> Invite Team Member
          </Button>
        </Card>

        {/* Brand */}
        <Card className="card-entrance stagger-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-hoopoe-lt-orange/30 flex items-center justify-center">
              <Palette size={18} className="text-hoopoe-brown" />
            </div>
            <div>
              <h2 className="text-sm font-black text-hoopoe-black">Brand Identity</h2>
              <p className="text-xs text-hoopoe-black/40 font-bold">Hoopoe Digital brand colors</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { name: 'Black', hex: '#1A1D24' },
              { name: 'Orange', hex: '#D4793A' },
              { name: 'Brown', hex: '#B04A1E' },
              { name: 'Amber', hex: '#E8994A' },
              { name: 'Gold', hex: '#F7C97D' },
              { name: 'Navy', hex: '#1E2332' },
            ].map((c) => (
              <div key={c.hex} className="flex-1 text-center group">
                <div className="w-full aspect-square rounded-xl mb-1.5 transition-transform duration-200 group-hover:scale-105 shadow-sm" style={{ backgroundColor: c.hex }} />
                <p className="text-[9px] text-hoopoe-black/50 font-bold">{c.name}</p>
                <p className="text-[8px] text-hoopoe-black/30 font-mono font-bold">{c.hex}</p>
              </div>
            ))}
          </div>
          <div className="brand-bar mt-4" />
        </Card>
      </div>
    </>
  );
}
