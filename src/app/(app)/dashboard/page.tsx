
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudentDashboard } from "@/components/app/dashboard/student-dashboard";
import { PmDashboard } from "@/components/app/dashboard/pm-dashboard";
import { AdminDashboard } from "@/components/app/dashboard/admin-dashboard";
import { Skeleton } from '@/components/ui/skeleton';

function Dashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const renderDashboard = () => {
    switch (role) {
      case 'pm':
        return <PmDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'student':
      default:
        return <StudentDashboard />;
    }
  };

  return <div className="flex flex-col gap-4">{renderDashboard()}</div>;
}

function DashboardLoading() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-10 w-2/3" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
            </div>
        </div>
    )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard />
    </Suspense>
  );
}
