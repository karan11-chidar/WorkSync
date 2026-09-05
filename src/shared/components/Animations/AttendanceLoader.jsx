import React from "react";
import { Clock3, Loader2 } from "lucide-react";

const AttendanceLoader = ({ message = "Syncing attendance..." }) => {
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-[3px]">
      <div className="relative w-[280px] rounded-2xl border border-white/60 bg-white/90 p-7 shadow-2xl backdrop-blur-xl">
        {/* Animated glow */}
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-2xl animate-pulse" />

        {/* Loader */}
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200" />

          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-indigo-600 border-r-indigo-400" />

          {/* Inner circle */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
            <Clock3 className="h-5 w-5 text-indigo-600 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="relative text-center">
          <h3 className="text-sm font-bold text-slate-800">{message}</h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Please wait while we update your records
          </p>
        </div>

        {/* Bottom progress indicator */}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-[loaderProgress_1.4s_ease-in-out_infinite] rounded-full bg-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default AttendanceLoader;
