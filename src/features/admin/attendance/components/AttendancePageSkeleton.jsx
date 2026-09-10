import React from "react";

/**
 * AttendancePageSkeleton
 *
 * Full-page shimmer skeleton matching Attendance Count Cards & Table layout.
 * Fully responsive for mobile cards and desktop table views.
 *
 * @component
 * @returns {JSX.Element} Shimmer skeleton layout for attendance view.
 */
export default function AttendancePageSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse p-2">
      {/* 1. Summary Cards Matrix Skeleton (Responsive Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-7">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="h-2.5 bg-slate-200 rounded-md w-16 sm:w-20" />
            <div className="h-5 sm:h-6 bg-slate-200 rounded-md w-12 sm:w-14 mt-1" />
          </div>
        ))}
      </div>

      {/* 2. Content Box Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-4 sm:p-5 space-y-4">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="space-y-2">
            <div className="h-4 sm:h-5 bg-slate-200 rounded-md w-44 sm:w-48" />
            <div className="h-3 bg-slate-150 rounded-md w-64 sm:w-72" />
          </div>
          <div className="h-9 bg-slate-100 rounded-lg w-full sm:w-64" />
        </div>

        {/* Mobile Cards View Skeleton (Visible on small screens) */}
        <div className="grid grid-cols-1 gap-4 md:hidden pt-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
                  <div className="space-y-1">
                    <div className="h-3.5 bg-slate-200 rounded-md w-28" />
                    <div className="h-2.5 bg-slate-150 rounded-md w-20" />
                  </div>
                </div>
                <div className="h-5 bg-slate-200 rounded-md w-14" />
              </div>
              <div className="h-12 bg-slate-200/60 rounded-xl w-full" />
              <div className="flex justify-end pt-1">
                <div className="h-7 bg-slate-200 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View Skeleton (Visible on md and above) */}
        <div className="hidden md:block border border-slate-100 rounded-xl overflow-hidden space-y-1 pt-1">
          <div className="h-10 bg-slate-100 w-full" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-16 border-b border-slate-100 flex items-center justify-between px-6 gap-4"
            >
              <div className="flex items-center gap-3 w-1/4">
                <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-1.5 w-full">
                  <div className="h-3.5 bg-slate-200 rounded-md w-28" />
                  <div className="h-2.5 bg-slate-150 rounded-md w-20" />
                </div>
              </div>
              <div className="h-5 bg-slate-200 rounded-full w-20" />
              <div className="h-3.5 bg-slate-200 rounded-md w-32" />
              <div className="h-7 bg-slate-200 rounded-lg w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}