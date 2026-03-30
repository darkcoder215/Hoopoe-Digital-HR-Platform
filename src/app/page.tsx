'use client';

import Topbar from '@/components/layout/Topbar';
import StatsCards from '@/components/dashboard/StatsCards';
import PipelineOverview from '@/components/dashboard/PipelineOverview';
import RecentCandidates from '@/components/dashboard/RecentCandidates';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import HiringMetrics from '@/components/dashboard/HiringMetrics';

export default function DashboardPage() {
  return (
    <>
      <Topbar title="لوحة التحكم" subtitle="نظرة عامة على التوظيف والتحليلات" />
      <div className="p-8 space-y-8 max-w-[1440px]">
        {/* Stats Section */}
        <section>
          <StatsCards />
        </section>

        {/* Analytics Row */}
        <section className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <PipelineOverview />
          </div>
          <div className="xl:col-span-2">
            <HiringMetrics />
          </div>
        </section>

        {/* Recent Data Row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentCandidates />
          </div>
          <ActivityFeed />
        </section>
      </div>
    </>
  );
}
