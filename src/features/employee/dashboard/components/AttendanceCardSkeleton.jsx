import React from "react";

/**
 * Displays a loading placeholder for the attendance summary card.
 *
 * @returns {JSX.Element} The attendance card skeleton.
 */
export default function AttendanceCardSkeleton() {
  return (
    <div className="relative overflow-hidden w-full bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-slate-200/60 via-30% to-transparent animate-[shimmer_1.6s_infinite]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100/60">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-slate-200/80 rounded-full animate-pulse" />
          <div className="h-4 bg-slate-200/90 rounded-md w-44 animate-pulse" />
        </div>
        <div className="h-7 w-36 bg-slate-100 rounded-lg animate-pulse hidden sm:block" />
      </div>

      {/* Status Box */}
      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 bg-amber-100/70 rounded-2xl shrink-0 animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-200/70 rounded w-24 animate-pulse" />
            <div className="h-5 bg-slate-200/90 rounded-md w-36 sm:w-44 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-3 sm:pt-0 sm:pl-4">
          <div className="space-y-1.5">
            <div className="h-3 bg-slate-200/60 rounded w-16 animate-pulse" />
            <div className="h-3 bg-slate-200/60 rounded w-14 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="h-12 w-full bg-emerald-200/60 rounded-xl animate-pulse" />
        <div className="h-12 w-full bg-slate-200/80 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
