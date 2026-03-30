import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'هوبو ديجيتال - منصة الموارد البشرية',
  description: 'منصة توظيف ذكية مدعومة بالذكاء الاصطناعي من هوبو ديجيتال',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full antialiased font-bold">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
