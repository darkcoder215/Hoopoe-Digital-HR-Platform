import { PipelineStage } from './types';

export const PIPELINE_STAGES: { key: PipelineStage; label: string; icon: string; description: string }[] = [
  { key: 'cv_received', label: 'تم استلام السيرة', icon: 'FileText', description: 'تم تقديم السيرة الذاتية للمراجعة' },
  { key: 'ai_analysis', label: 'تحليل الذكاء الاصطناعي', icon: 'Brain', description: 'جاري التحليل الآلي للسيرة الذاتية' },
  { key: 'screening', label: 'الفرز الأولي', icon: 'Filter', description: 'فحص المؤهلات الأساسية' },
  { key: 'interview', label: 'المقابلة', icon: 'Users', description: 'تم جدولة مقابلة الموارد البشرية' },
  { key: 'ceo_interview', label: 'مقابلة المدير التنفيذي', icon: 'Crown', description: 'المقابلة التنفيذية النهائية' },
  { key: 'technical_task', label: 'المهمة التقنية', icon: 'Code', description: 'تم تعيين التقييم التقني' },
  { key: 'offer_sent', label: 'تم إرسال العرض', icon: 'Send', description: 'تم إرسال عرض العمل' },
  { key: 'offer_accepted', label: 'تم قبول العرض', icon: 'CheckCircle', description: 'قبل المرشح العرض' },
  { key: 'onboarding', label: 'التهيئة', icon: 'Rocket', description: 'مرحباً بك على متن الفريق!' },
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
  'مطور واجهات أمامية أول',
  'مهندس خلفية',
  'مطور متكامل',
  'مهندس DevOps',
  'مصمم واجهات المستخدم',
  'مدير منتجات',
  'عالم بيانات',
  'مهندس ضمان جودة',
  'مطور تطبيقات الجوال',
  'مهندس سحابي',
];
