'use client';

import Topbar from '@/components/layout/Topbar';
import StatsCards from '@/components/dashboard/StatsCards';
import PipelineOverview from '@/components/dashboard/PipelineOverview';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

export default function DashboardPage() {
  return (
    <>
      <Topbar title="لوحة التحكم" subtitle="نظرة عامة على التوظيف والتحليلات" />
      <div className="p-8 space-y-6 max-w-[1440px]">
        <StatsCards />
        <PipelineOverview />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentCandidates />
          </div>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
