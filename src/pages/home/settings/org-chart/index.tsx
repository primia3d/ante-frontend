import React, { Suspense } from 'react';

// Dynamically import OrgChart using React.lazy
const DynamicOrgChart = React.lazy(() => import('@/features/OrgChart/OrgChart'));

export default function OrgChart() {
  return (
    <div className="relative h-full rounded-2xl border">
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicOrgChart />
      </Suspense>
    </div>
  );
}
