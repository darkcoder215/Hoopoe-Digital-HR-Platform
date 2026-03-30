'use client';

import { create } from 'zustand';
import { Candidate, PipelineStage, CandidateNote } from '@/lib/types';
import { mockCandidates } from '@/lib/mock-data';

interface CandidatesStore {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  updateStage: (id: string, stage: PipelineStage) => void;
  getCandidatesByStage: (stage: PipelineStage) => Candidate[];
  getCandidate: (id: string) => Candidate | undefined;
  addNote: (id: string, note: CandidateNote) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
}

export const useCandidatesStore = create<CandidatesStore>((set, get) => ({
  candidates: mockCandidates,

  addCandidate: (candidate) =>
    set((state) => ({ candidates: [candidate, ...state.candidates] })),

  updateStage: (id, stage) =>
    set((state) => ({
      candidates: state.candidates.map((c) => {
        if (c.id !== id) return c;
        const transition = {
          from: c.stage,
          to: stage,
          date: new Date().toISOString(),
          by: 'HR Team',
        };
        return { ...c, stage, transitions: [...c.transitions, transition] };
      }),
    })),

  getCandidatesByStage: (stage) => get().candidates.filter((c) => c.stage === stage),

  getCandidate: (id) => get().candidates.find((c) => c.id === id),

  addNote: (id, note) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === id ? { ...c, notes: [...c.notes, note] } : c
      ),
    })),

  updateCandidate: (id, updates) =>
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
}));
