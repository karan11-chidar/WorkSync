import React from "react";

export default function LinearProgressStream({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-0.75 bg-slate-800 z-50 overflow-hidden">
      <div className="h-full bg-linear-to-r from-red-600 via-purple-500 to-indigo-500 w-full absolute top-0 left-0 animate-[loadingStream_1.5s_infinite_ease-in-out]" />
      <style>{`
        @keyframes loadingStream {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
