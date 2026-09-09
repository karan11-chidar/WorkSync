import React from "react";

/**
 * AttendancePageSkeleton - Full-page shimmering skeleton loader matching EmployeeAttendance UI.
 *
 * @component
 * @returns {JSX.Element} Full-page shimmer skeleton layout.
 */
export default function AttendancePageSkeleton() {
  return (
    <div className="w-full space-y-6 p-1 animate-pulse">
      {/* 1. Top 5 State Summary Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col justify-between items-center space-y-3"
          >
            {/* Header: Title & Icon placeholder */}
            <div className="flex items-center justify-between w-full">
              <div className="h-2.5 bg-slate-200 rounded-md w-16" />
              <div className="h-8 w-8 bg-slate-200 rounded-xl" />
            </div>

            {/* Middle: Big Value Placeholder */}
            <div className="h-7 bg-slate-200 rounded-lg w-20 my-1" />

            {/* Bottom: Subtitle Placeholder */}
            <div className="h-2 bg-slate-150 rounded-md w-24" />
          </div>
        ))}
      </div>

      {/* 2. Main Calendar Board Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden space-y-5">
        {/* Calendar Header Control Bar Skeleton */}
        <div className="bg-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-slate-800 rounded-xl" />
            <div className="space-y-1.5">
              <div className="h-3.5 bg-slate-800 rounded-md w-36" />
              <div className="h-2.5 bg-slate-800 rounded-md w-24" />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="h-8 w-8 bg-slate-800 rounded-xl" />
            <div className="h-8 w-16 bg-slate-800 rounded-xl" />
            <div className="h-8 w-8 bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* Calendar Day Grid Canvas Skeleton */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Weekday Names Row */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-slate-200 rounded-md mx-auto w-8"
              />
            ))}
          </div>

          {/* 35 Grid Cells (7x5) */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
            {[...Array(35)].map((_, idx) => (
              <div
                key={idx}
                className="p-2 border border-slate-100 bg-slate-50/50 rounded-2xl flex flex-col justify-between min-h-14 sm:min-h-20 space-y-2"
              >
                <div className="h-4 w-4 bg-slate-200 rounded-full" />
                <div className="hidden sm:block space-y-1 mt-auto">
                  <div className="h-2.5 bg-slate-200 rounded-md w-12" />
                  <div className="h-2 bg-slate-150 rounded-md w-16" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Legend Row Skeleton */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 bg-slate-200 rounded-full" />
                <div className="h-2.5 bg-slate-200 rounded-md w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
