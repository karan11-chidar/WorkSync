import React from "react";

export default function PremiumUniversalLoader({
  isLoading = true,
  variant = "card", // 'list' | 'grid' | 'profile' | 'card'
  rows = 3,
  gridCount = 3,
  children = null,
}) {
  if (!isLoading) {
    return children ? <>{children}</> : null;
  }

  const iterations = Array.from({ length: rows });
  const gridItems = Array.from({ length: gridCount });

  // 🎨 Palette of 6 Dynamic Colors for auto-rotation
  const colorPalette = [
    {
      border: "border-l-emerald-500",
      badge: "bg-emerald-100/70",
      icon: "bg-emerald-200/80",
      gridIconBg: "bg-emerald-50/80",
    },
    {
      border: "border-l-blue-500",
      badge: "bg-blue-100/70",
      icon: "bg-blue-200/80",
      gridIconBg: "bg-blue-50/80",
    },
    {
      border: "border-l-indigo-500",
      badge: "bg-indigo-100/70",
      icon: "bg-indigo-200/80",
      gridIconBg: "bg-indigo-50/80",
    },
    {
      border: "border-l-purple-500",
      badge: "bg-purple-100/70",
      icon: "bg-purple-200/80",
      gridIconBg: "bg-purple-50/80",
    },
    {
      border: "border-l-amber-500",
      badge: "bg-amber-100/70",
      icon: "bg-amber-200/80",
      gridIconBg: "bg-amber-50/80",
    },
    {
      border: "border-l-rose-500",
      badge: "bg-rose-100/70",
      icon: "bg-rose-200/80",
      gridIconBg: "bg-rose-50/80",
    },
  ];

  // 🌟 Premium Shimmer Effect Overlay
  const ShimmerOverlay = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-slate-200/60 via-30% to-transparent animate-[shimmer_1.6s_infinite]" />
    </div>
  );

  return (
    <div
      className="w-full select-none"
      role="status"
      aria-label="Loading content"
    >
      {/* ==================== 1. AUTO-COLOR CARD VARIANT ==================== */}
      {variant === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {gridItems.map((_, idx) => {
            // Pick a color dynamically using modulo operator based on index
            const theme = colorPalette[idx % colorPalette.length];

            return (
              <div
                key={idx}
                className={`relative overflow-hidden bg-white rounded-2xl border border-slate-100 border-l-4 ${theme.border} p-5 shadow-xs space-y-4`}
              >
                <ShimmerOverlay />

                {/* Card Header: Title & Dynamic Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-5 bg-slate-200/90 rounded-md w-28 animate-pulse" />
                    <div className="h-3 bg-slate-200/50 rounded-md w-16 animate-pulse" />
                  </div>
                  <div
                    className={`h-6 w-20 ${theme.badge} rounded-lg animate-pulse shrink-0`}
                  />
                </div>

                {/* Stats Rows */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-16 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-24 animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-12 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-20 animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-20 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-6 animate-pulse" />
                  </div>
                </div>

                {/* Inner Budget Box */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-slate-200/70 rounded w-20 animate-pulse" />
                    <div
                      className={`h-4 w-4 ${theme.icon} rounded-md animate-pulse`}
                    />
                  </div>
                  <div className="flex justify-between items-end pt-1">
                    <div className="h-6 bg-slate-200/90 rounded-md w-24 animate-pulse" />
                    <div className="h-5 w-10 bg-slate-200/60 rounded-md animate-pulse" />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="h-3 bg-slate-200/50 rounded w-28 animate-pulse" />
                  <div className="h-4 w-4 bg-red-100 rounded-md animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================== 2. LIST VARIANT ==================== */}
      {variant === "list" && (
        <div className="w-full space-y-3.5 p-0.5">
          {iterations.map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden p-3.5 sm:p-5 rounded-2xl border border-slate-200/70 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
            >
              <ShimmerOverlay />
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-14 bg-slate-200/80 rounded-full animate-pulse" />
                  <div className="h-3.5 w-10 bg-slate-200/60 rounded-full animate-pulse" />
                </div>
                <div
                  className={`h-4 bg-slate-200/90 rounded-md animate-pulse ${
                    idx % 2 === 0 ? "w-4/5 sm:w-2/3" : "w-3/5"
                  }`}
                />
                <div className="h-3 bg-slate-200/50 rounded-md w-11/12 animate-pulse" />
              </div>
              <div className="h-8 sm:h-9 w-full sm:w-24 bg-slate-200/80 rounded-xl shrink-0 self-stretch sm:self-center animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* ==================== 3. AUTO-COLOR GRID VARIANT ==================== */}
      {variant === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
          {gridItems.map((_, idx) => {
            const theme = colorPalette[idx % colorPalette.length];

            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-white border border-slate-200/70 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs min-h-18"
              >
                <ShimmerOverlay />
                <div className="space-y-2 flex-1 pr-2">
                  <div className="h-2.5 sm:h-3 bg-slate-200/60 rounded-sm w-12 sm:w-16 animate-pulse" />
                  <div
                    className={`h-4 sm:h-5 bg-slate-200/90 rounded-md animate-pulse ${
                      idx % 2 === 0 ? "w-20 sm:w-24" : "w-16 sm:w-20"
                    }`}
                  />
                </div>
                <div
                  className={`h-7 sm:h-9 w-7 sm:w-9 ${theme.gridIconBg} rounded-xl shrink-0 flex items-center justify-center animate-pulse`}
                >
                  <div
                    className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${theme.icon} rounded-md`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================== 4. PROFILE VARIANT ==================== */}
      {variant === "profile" && (
        <div className="relative w-full max-w-xl mx-auto p-3.5 sm:p-5 bg-white rounded-3xl border border-slate-200/70 shadow-xs overflow-hidden space-y-5">
          <ShimmerOverlay />
          <div className="h-20 sm:h-28 bg-slate-200/70 rounded-2xl w-full animate-pulse" />
          <div className="flex flex-col items-center text-center space-y-2.5 -mt-12 sm:-mt-16 relative z-10">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-200 ring-4 ring-white shadow-md animate-pulse" />
            <div className="h-4 bg-slate-200/90 rounded-md w-28 sm:w-36 animate-pulse" />
            <div className="h-3 bg-slate-200/50 rounded-md w-40 sm:w-48 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-2 border border-slate-100">
              <div className="h-2.5 bg-slate-200/70 w-14 rounded" />
              <div className="h-3.5 bg-slate-200/90 w-full rounded" />
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-2 border border-slate-100">
              <div className="h-2.5 bg-slate-200/70 w-14 rounded" />
              <div className="h-3.5 bg-slate-200/90 w-full rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Keyframe Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
