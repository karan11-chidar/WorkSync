import React from "react";

/**
 * Renders a fully responsive, ultra-smooth skeleton loading screen for the administrator dashboard.
 * Perfectly optimized for mobile, tablet, and desktop screens.
 *
 * @component
 * @returns {JSX.Element} The responsive dashboard skeleton loader.
 */
function DashboardSkeleton() {
  return (
    <main className="flex-1 bg-slate-50 px-3 sm:px-4 py-4 sm:py-5 md:px-6 md:py-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
        {/* 1. Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="space-y-2 w-full sm:w-auto">
            <div className="h-5 sm:h-6 w-40 sm:w-48 bg-slate-200 rounded-lg"></div>
            <div className="h-3.5 sm:h-4 w-60 sm:w-72 bg-slate-100 rounded-md"></div>
          </div>
          <div className="h-6 sm:h-7 w-28 sm:w-32 bg-slate-100 rounded-full self-start sm:self-auto"></div>
        </div>

        {/* 2. Cards Grid Skeleton (2 cols on mobile, 4 on large screens) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-2 min-w-0"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="h-2.5 sm:h-3 w-16 sm:w-20 bg-slate-200 rounded-md"></div>
                <div className="h-5 sm:h-6 w-12 sm:w-16 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="h-8 w-8 sm:h-12 sm:w-12 bg-slate-200 rounded-xl shrink-0"></div>
            </div>
          ))}
        </div>

        {/* 3. Analytics Charts Skeleton (Stacked on mobile, 3 columns on XL) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 h-auto sm:h-85 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-4 sm:h-5 w-48 sm:w-56 bg-slate-200 rounded-lg"></div>
              <div className="h-3 w-32 sm:w-40 bg-slate-100 rounded-md"></div>
            </div>
            <div className="space-y-3 sm:space-y-4 py-2">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div key={bar} className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3 w-24 sm:w-28 bg-slate-200 rounded-md"></div>
                    <div className="h-3 w-6 sm:w-8 bg-slate-200 rounded-md"></div>
                  </div>
                  <div className="h-2 sm:h-2.5 w-full bg-slate-100 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 h-auto sm:h-85 flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-full flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 sm:h-5 w-32 sm:w-36 bg-slate-200 rounded-lg"></div>
                <div className="h-3 w-24 sm:w-28 bg-slate-100 rounded-md"></div>
              </div>
            </div>
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-slate-200 border-8 border-slate-100"></div>
            <div className="w-full space-y-2">
              <div className="h-2.5 sm:h-3 w-full bg-slate-100 rounded-md"></div>
              <div className="h-2.5 sm:h-3 w-3/4 bg-slate-100 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Section Skeleton (Stacked on mobile/tablet, 2 columns on LG) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2].map((section) => (
            <div
              key={section}
              className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 h-105 sm:h-125 flex flex-col space-y-4"
            >
              <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-slate-100">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="h-4 sm:h-5 w-36 sm:w-44 bg-slate-200 rounded-lg"></div>
                  <div className="h-3 w-28 sm:w-32 bg-slate-100 rounded-md"></div>
                </div>
                <div className="h-3.5 sm:h-4 w-10 sm:w-12 bg-slate-200 rounded-md"></div>
              </div>
              <div className="flex-1 space-y-3 sm:space-y-4 overflow-hidden">
                {[1, 2, 3, 4].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between py-1.5 sm:py-2"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 bg-slate-200 rounded-full shrink-0"></div>
                      <div className="space-y-1 min-w-0">
                        <div className="h-3.5 sm:h-4 w-28 sm:w-32 bg-slate-200 rounded-md"></div>
                        <div className="h-2.5 sm:h-3 w-16 sm:w-20 bg-slate-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="space-y-1 text-right shrink-0">
                      <div className="h-2.5 sm:h-3 w-12 sm:w-16 bg-slate-200 rounded-md ml-auto"></div>
                      <div className="h-4 sm:h-5 w-10 sm:w-12 bg-slate-100 rounded-full ml-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DashboardSkeleton;
