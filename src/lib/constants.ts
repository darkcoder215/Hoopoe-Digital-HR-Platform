import { PipelineStage } from './types';

export const PIPELINE_STAGES: { key: PipelineStage; label: string; icon: string; description: string }[] = [
  { key: 'cv_received', label: 'CV Received', icon: 'FileText', description: 'Resume submitted for review' },
  { key: 'ai_analysis', label: 'AI Analysis', icon: 'Brain', description: 'Automated CV analysis in progress' },
  { key: 'screening', label: 'Screening', icon: 'Filter', description: 'Basic qualifications check' },
  { key: 'interview', label: 'Interview', icon: 'Users', description: 'HR interview scheduled' },
  { key: 'ceo_interview', label: 'CEO Interview', icon: 'Crown', description: 'Final executive interview' },
  { key: 'technical_task', label: 'Technical Task', icon: 'Code', description: 'Technical assessment assigned' },
  { key: 'offer_sent', label: 'Offer Sent', icon: 'Send', description: 'Job offer has been sent' },
  { key: 'offer_accepted', label: 'Offer Accepted', icon: 'CheckCircle', description: 'Candidate accepted the offer' },
  { key: 'onboarding', label: 'Onboarding', icon: 'Rocket', description: 'Welcome aboard!' },
];

export const STAGE_COLORS: Record<PipelineStage, string> = {
  cv_received: '#E5E0DD',
  ai_analysis: '#F7C97D',
  screening: '#E8994A',
  interview: '#D4793A',
  ceo_interview: '#B04A1E',
  technical_task: '#1E2332',
  offer_sent: '#D4793A',
  offer_accepted: '#22875A',
  onboarding: '#22875A',
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
