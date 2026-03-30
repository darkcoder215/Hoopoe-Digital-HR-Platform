export type PipelineStage =
  | 'cv_received'
  | 'ai_analysis'
  | 'screening'
  | 'interview'
  | 'ceo_interview'
  | 'technical_task'
  | 'offer_sent'
  | 'offer_accepted'
  | 'onboarding';

export interface SkillAssessment {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number;
  yearsOfExperience?: number;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface AIReport {
  overallScore: number;
  summary: string;
  skills: SkillAssessment[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  strengths: string[];
  concerns: string[];
  recommendedStage: PipelineStage;
  analyzedAt: string;
}

export interface CandidateNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface StageTransition {
  from: PipelineStage;
  to: PipelineStage;
  date: string;
  by: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  stage: PipelineStage;
  cvFileName: string;
  uploadedAt: string;
  position: string;
  aiReport?: AIReport;
  notes: CandidateNote[];
  transitions: StageTransition[];
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'stage_change' | 'report_generated' | 'note_added' | 'offer_sent';
  candidateId: string;
  candidateName: string;
  description: string;
  timestamp: string;
}
