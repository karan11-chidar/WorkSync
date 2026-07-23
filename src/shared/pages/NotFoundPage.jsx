import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Premium Tech Background Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl" />

      {/* Main Error Card Content */}
      <div className="relative z-10 bg-slate-800/80 border border-slate-700/60 p-6 sm:p-10 rounded-3xl max-w-md w-full text-center shadow-2xl backdrop-blur-md space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Error Badge Frame */}
        <div className="mx-auto w-16 h-16 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-sm shadow-rose-500/5 animate-bounce [animation-duration:3s]">
          <ShieldAlert className="h-8 w-8 stroke-[1.5]" />
        </div>

        {/* Big Code Text Typography */}
        <div className="space-y-1">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-400 font-mono tracking-tighter">
            404
          </h1>
          <h2 className="text-md font-bold text-white uppercase tracking-wider">
            Security & Route Conflict
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed pt-1.5 px-2">
            The workspace ledger page block you are attempting to audit has
            either been relocated across console structures or does not exist
            under your credentials.
          </p>
        </div>

        {/* Divider Grid */}
        <div className="border-t border-slate-700/50 my-2" />

        {/* Navigation Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 h-11 border border-slate-700 hover:bg-slate-700/50 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-indigo-600/10 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Home size={14} />
            Return Home
          </button>
        </div>

        {/* Corporate Micro Footnote */}
        <span className="block text-[10px] font-mono font-medium text-slate-500 uppercase tracking-widest pt-2">
          Enterprise Workspace System v2.0
        </span>
      </div>
    </div>
  );
}
