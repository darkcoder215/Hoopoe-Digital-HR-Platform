import { PipelineStage } from './types';

export const PIPELINE_STAGES: { key: PipelineStage; label: string; icon: string; description: string }[] = [
  { key: 'cv_received', label: 'CV Received', icon: 'FileText', description: 'Resume submitted for review' },
  { key: 'ai_analysis', label: 'AI Analysis', icon: 'Brain', description: 'Automated CV analysis in progress' },
  { key: 'screening', label: 'Screening', icon: 'Filter', description: 'Initial qualification screening' },
  { key: 'interview', label: 'Interview', icon: 'Users', description: 'HR interview scheduled' },
  { key: 'ceo_interview', label: 'CEO Interview', icon: 'Crown', description: 'Final executive interview' },
  { key: 'technical_task', label: 'Technical Task', icon: 'Code', description: 'Technical assessment assigned' },
  { key: 'offer_sent', label: 'Offer Sent', icon: 'Send', description: 'Job offer dispatched' },
  { key: 'offer_accepted', label: 'Offer Accepted', icon: 'CheckCircle', description: 'Candidate accepted the offer' },
  { key: 'onboarding', label: 'Onboarding', icon: 'Rocket', description: 'Welcome aboard!' },
];

export const STAGE_COLORS: Record<PipelineStage, string> = {
  cv_received: '#E8E3E1',
  ai_analysis: '#F9CF9D',
  screening: '#E7A15E',
  interview: '#CE8345',
  ceo_interview: '#A34823',
  technical_task: '#252A35',
  offer_sent: '#CE8345',
  offer_accepted: '#2D7D46',
  onboarding: '#2D7D46',
};

export const POSITIONS = [
  'Senior Frontend Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'QA Engineer',
  'Mobile Developer',
  'Cloud Architect',
];
