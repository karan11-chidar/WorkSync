import React from "react";
import { FolderKanban, Sparkles } from "lucide-react";

/**
 * ULTRA-PREMIUM EMPTY STATE COMPONENT
 *
 * Props:
 * @param {string} title - मुख्य मैसेज
 * @param {string} description - सब-मैसेज
 */
export default function EmptyState({
  title = "No Departments Found",
  description = "There are no departments created yet. Once added, your active department cards will show up here.",
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-slate-50/50 via-white to-slate-50/30 p-8 sm:p-14 text-center shadow-xs my-4">
      {/* 🌟 Background Decorative Grid Pattern & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [bg-size:16px_16px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* 🌟 Center Glassmorphism Icon Box */}
      <div className="relative z-10 flex justify-center mb-6">
        <div className="relative group">
          {/* Subtle Rotating Accent Ring */}
          <div className="absolute -inset-2 bg-linear-to-r from-emerald-400 via-teal-300 to-indigo-400 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />

          {/* Main Glossy Icon Container */}
          <div className="relative h-24 w-24 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:scale-105">
            <FolderKanban className="w-11 h-11 text-emerald-500 stroke-[1.5]" />

            {/* Sparkle Badge Accent */}
            <div className="absolute -top-1.5 -right-1.5 bg-linear-to-tr from-amber-400 to-yellow-300 p-1.5 rounded-xl shadow-xs border border-white">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Typography Content */}
      <div className="relative z-10 max-w-md mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* 🌟 Subtle Bottom Line Accent */}
      <div className="relative z-10 mt-8 flex justify-center">
        <div className="h-1 w-12 bg-linear-to-r from-emerald-400 to-indigo-400 rounded-full opacity-60" />
      </div>
    </div>
  );
}
