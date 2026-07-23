import React from "react";

export default function PremiumUniversalLoader({ variant = "list", rows = 3 }) {
  // लूप चलाने के लिए रोज़ की एरे
  const iterations = Array.from({ length: rows });

  // 1. LIST VARIANT (टास्क लिस्ट या लीव हिस्ट्री के लिए)
  if (variant === "list") {
    return (
      <div className="w-full space-y-4 p-1 animate-pulse">
        {iterations.map((_, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden"
          >
            {/* Shimmer Effect Wave Indicator */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-200/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />

            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-slate-200/80 rounded-full" />
                <div className="h-4 w-12 bg-slate-200/80 rounded-full" />
                <div className="h-3 w-20 bg-slate-200/50 rounded font-mono" />
              </div>
              <div className="h-4 bg-slate-200/80 rounded w-2/3" />
              <div className="h-3 bg-slate-200/40 rounded w-full" />
            </div>
            <div className="h-9 w-24 bg-slate-200/80 rounded-xl shrink-0 self-end sm:self-center" />
          </div>
        ))}
        <style>{shimmerKeyframe}</style>
      </div>
    );
  }

  // 2. GRID VARIANT (स्टैट्स कार्ड्स या डैशबोर्ड मैट्रिक्स के लिए)
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full animate-pulse">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between relative overflow-hidden min-h-19"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-100 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-slate-200/60 rounded w-16" />
              <div className="h-5 bg-slate-200/80 rounded w-24" />
            </div>
            <div className="h-8 w-8 bg-slate-200/60 rounded-xl shrink-0" />
          </div>
        ))}
        <style>{shimmerKeyframe}</style>
      </div>
    );
  }

  // 3. PROFILE VIEW VARIANT (एम्प्लॉई प्रोफाइल या आईडी कंसोल के लिए)
  if (variant === "profile") {
    return (
      <div className="w-full max-w-xl mx-auto p-4 bg-white rounded-3xl border border-slate-100 shadow-xs animate-pulse relative overflow-hidden space-y-6">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-100 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />

        {/* Mock Top Cover */}
        <div className="h-24 bg-slate-100/70 rounded-2xl w-full" />

        {/* Avatar Matrix */}
        <div className="flex flex-col items-center text-center space-y-3 -mt-14">
          <div className="h-20 w-20 rounded-2xl bg-slate-200 ring-4 ring-white" />
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="h-3 bg-slate-200/60 rounded w-48" />
        </div>

        {/* Mock Content Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50/50 rounded-2xl space-y-2">
            <div className="h-3 bg-slate-200 w-16 rounded" />
            <div className="h-4 bg-slate-200/70 w-full rounded" />
          </div>
          <div className="p-4 bg-slate-50/50 rounded-2xl space-y-2">
            <div className="h-3 bg-slate-200 w-16 rounded" />
            <div className="h-4 bg-slate-200/70 w-full rounded" />
          </div>
        </div>
        <style>{shimmerKeyframe}</style>
      </div>
    );
  }

  return null;
}

// ⏳ Shimmer Matrix Animation Keyframe String
const shimmerKeyframe = `
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
`;
