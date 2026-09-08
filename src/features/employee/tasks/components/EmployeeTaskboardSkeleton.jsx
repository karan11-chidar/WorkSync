import React from "react";

/**
 * EmployeeTaskboardSkeleton
 *
 * Renders a full-page shimmering skeleton layout that matches the
 * Employee Assigned Tasks Portal structure to prevent layout shifts during loading.
 *
 * @component
 * @returns {JSX.Element} Shimmer skeleton layout for employee taskboard.
 */
export default function EmployeeTaskboardSkeleton() {
  return (
    <div className="w-full space-y-6 p-1 animate-pulse">
      {/* 1. Header Section Skeleton */}
      <div className="border border-slate-100 rounded-2xl p-4 sm:p-5 mt-5 bg-white shadow-2xs flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4.5 w-4.5 bg-slate-200 rounded-md" />
            <div className="h-4 bg-slate-200 rounded-md w-48 sm:w-64" />
          </div>
          <div className="h-2.5 bg-slate-150 rounded-md w-64 sm:w-96 hidden lg:block" />
        </div>
        <div className="h-8 w-8 bg-slate-200 rounded-xl shrink-0" />
      </div>

      {/* 2. Top 4 Metric Cards Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-2.5 bg-slate-200 rounded-md w-16" />
              <div className="h-6 bg-slate-200 rounded-md w-12" />
            </div>
            <div className="h-9 w-9 bg-slate-100 rounded-xl shrink-0" />
          </div>
        ))}
      </div>

      {/* 3. Main Tasks List Canvas Skeleton */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-slate-200"
          >
            {/* Left Metadata & Content Placeholder */}
            <div className="space-y-3 flex-1 min-w-0">
              {/* Badges Row */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-slate-200 rounded-full w-20" />
                <div className="h-4 bg-slate-200 rounded-full w-24" />
                <div className="h-3 bg-slate-150 rounded-md w-28" />
              </div>

              {/* Title & Description */}
              <div className="h-4 bg-slate-200 rounded-md w-3/4" />
              <div className="space-y-1.5">
                <div className="h-3 bg-slate-150 rounded-md w-full" />
                <div className="h-3 bg-slate-150 rounded-md w-2/3" />
              </div>

              {/* Bottom Metadata Badges */}
              <div className="flex items-center gap-4 pt-1">
                <div className="h-2.5 bg-slate-200 rounded-md w-24" />
                <div className="h-2.5 bg-slate-200 rounded-md w-28" />
                <div className="h-2.5 bg-slate-200 rounded-md w-16" />
              </div>
            </div>

            {/* Right Action Buttons Placeholder */}
            <div className="flex flex-row sm:flex-col gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <div className="h-8 bg-slate-200 rounded-xl w-full sm:w-28" />
              <div className="h-8 bg-slate-200 rounded-xl w-full sm:w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
