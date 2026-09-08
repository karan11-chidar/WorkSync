import React from "react";

/**
 * LeavePageSkeleton
 *
 * Full-page shimmer skeleton matching LeaveDashboardView layout to prevent layout shifts.
 *
 * @component
 * @returns {JSX.Element} Full-page shimmer layout for leave management view.
 */
export default function LeavePageSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* 1. Header Block Skeleton */}
      <div className="space-y-5 p-1 mb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
            <div className="h-6 w-64 bg-slate-200 rounded-md mt-2" />
            <div className="h-3 w-96 bg-slate-150 rounded-md hidden lg:block" />
          </div>
          <div className="h-12 w-80 bg-slate-100 rounded-xl shrink-0" />
        </div>

        {/* 3 Metric Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="h-2.5 w-20 bg-slate-200 rounded-md" />
                <div className="h-6 w-24 bg-slate-200 rounded-md" />
              </div>
              <div className="h-9 w-9 bg-slate-100 rounded-xl shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Form + Table Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Form Skeleton (Left) */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-36 bg-slate-200 rounded-md" />
            <div className="h-3 w-48 bg-slate-150 rounded-md" />
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="h-2.5 w-20 bg-slate-200 rounded-md" />
              <div className="h-10 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <div className="h-2.5 w-16 bg-slate-200 rounded-md" />
                <div className="h-10 w-full bg-slate-100 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-16 bg-slate-200 rounded-md" />
                <div className="h-10 w-full bg-slate-100 rounded-xl" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
              <div className="h-20 w-full bg-slate-100 rounded-xl" />
            </div>

            <div className="h-11 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>

        {/* Table Skeleton (Right) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="h-4 w-44 bg-slate-200 rounded-md" />
            <div className="h-5 w-28 bg-slate-100 rounded-md" />
          </div>

          <div className="border border-slate-100 rounded-xl overflow-hidden space-y-2">
            <div className="h-10 bg-slate-100 w-full" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 border-b border-slate-100 flex items-center justify-between px-4 gap-4"
              >
                <div className="h-3.5 w-16 bg-slate-200 rounded-md" />
                <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
                <div className="h-3.5 w-32 bg-slate-200 rounded-md" />
                <div className="h-3.5 w-16 bg-slate-200 rounded-md" />
                <div className="h-5 w-20 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
