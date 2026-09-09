import React from "react";

/**
 * LeaveCardSkeleton
 *
 * Renders a shimmering 2-card skeleton grid matching the Leave Ledger list view
 * to prevent layout shifts during data fetching.
 *
 * @component
 * @returns {JSX.Element} Shimmer skeleton cards layout.
 */
export default function LeaveCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-150 border-l-4 border-l-slate-300 shadow-2xs p-5 space-y-4 flex flex-col justify-between min-w-0"
          >
            {/* Upper Section */}
            <div className="space-y-4 min-w-0">
              {/* Header Row: Avatar & Status Badge */}
              <div className="flex items-center justify-between gap-3 min-w-0 pb-1">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="h-4 bg-slate-200 rounded-md w-32" />
                    <div className="h-3 bg-slate-150 rounded-md w-20" />
                  </div>
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full shrink-0" />
              </div>

              {/* Middle Specs Box Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-150/80">
                <div className="space-y-1.5">
                  <div className="h-2.5 bg-slate-200 rounded-md w-12" />
                  <div className="h-5 bg-slate-200 rounded-lg w-16" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 bg-slate-200 rounded-md w-12" />
                  <div className="h-5 bg-slate-200 rounded-lg w-14" />
                </div>
                <div className="space-y-1.5 text-right">
                  <div className="h-2.5 bg-slate-200 rounded-md w-16 ml-auto" />
                  <div className="h-5 bg-slate-200 rounded-lg w-20 ml-auto" />
                </div>
              </div>

              {/* Justification Box */}
              <div className="p-3 rounded-xl bg-slate-50/50 border border-slate-100/80 space-y-2">
                <div className="h-2.5 bg-slate-200 rounded-md w-28" />
                <div className="h-3.5 bg-slate-150 rounded-md w-full" />
              </div>
            </div>

            {/* Bottom Actions Panel */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="h-3 bg-slate-200 rounded-md w-24" />
              <div className="flex items-center gap-2">
                <div className="h-8 bg-slate-200 rounded-xl w-16" />
                <div className="h-8 bg-slate-200 rounded-xl w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
