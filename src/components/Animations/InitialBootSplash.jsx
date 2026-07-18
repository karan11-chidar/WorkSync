import React, { useState, useEffect } from "react";
import { Cpu, Lock, Loader2 } from "lucide-react";

export default function InitialBootSplash({
  onComplete,
  variant = "boot",
  userEmail,
}) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing core modules...");
  const [logs, setLogs] = useState([]);

  const bootSteps = [
    { text: "Activating secure sandbox environment...", threshold: 15 },
    { text: "Mounting localStorage cache schemas...", threshold: 35 },
    { text: "Resolving REST API Advice Slip gateway...", threshold: 55 },
    { text: "Compiling real-time operational ledger...", threshold: 75 },
    { text: "Checking authentication cookies & hashes...", threshold: 90 },
    {
      text: "Establishing secure workspace portal connection...",
      threshold: 100,
    },
  ];

  const decryptSteps = [
    { text: "Decrypting biometrics & enterprise vault...", threshold: 20 },
    { text: "Authenticating credentials on secure cluster...", threshold: 45 },
    { text: "Validating role-based access control policies...", threshold: 70 },
    { text: "Generating live workspace session JWT...", threshold: 90 },
    { text: "Syncing system telemetry state...", threshold: 100 },
  ];

  const steps = variant === "boot" ? bootSteps : decryptSteps;

  useEffect(() => {
    setLogs([
      variant === "boot"
        ? "SYSTEM BOOTSTRAP INITIATED"
        : "AUTHENTICATION PROTOCOL STARTED",
    ]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(next, 100);

        const currentStep = steps.find(
          (s) => bounded >= s.threshold - 10 && prev < s.threshold,
        );
        if (currentStep) {
          setStatusText(currentStep.text);
          setLogs((l) => {
            const timestamp = new Date().toLocaleTimeString();
            return [...l, `[${timestamp}] ${currentStep.text}`].slice(-4);
          });
        }

        return bounded;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [variant]);

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 p-6 overflow-hidden select-none font-sans text-white">
      {/* Dynamic Futuristic Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radiant Glow Behind Loader */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 flex flex-col items-center space-y-8 text-center">
        {/* Pure HTML/Tailwind Icon Gate */}
        <div className="relative transform scale-100 transition-transform duration-500 ease-out">
          {/* Pulsing Outer Neon Circles */}
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/25 blur-xl animate-pulse scale-110" />
          <div className="h-20 w-20 rounded-3xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 relative z-10 shadow-lg">
            {variant === "boot" ? (
              <Cpu className="h-10 w-10 text-indigo-400 animate-pulse" />
            ) : (
              <Lock className="h-9 w-9 text-emerald-400 animate-pulse" />
            )}
          </div>
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full animate-ping opacity-75" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full" />
        </div>

        {/* Headline Matrix */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest border border-indigo-500/20 font-mono">
              {variant === "boot"
                ? "B2B Enterprise Node"
                : "Security Decryption Gateway"}
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            {variant === "boot"
              ? "WORKSPACE PRE-LOADING"
              : "AUTHORIZING ACCOUNT"}
          </h2>
          {variant === "login" && userEmail && (
            <p className="text-xs text-slate-400 font-semibold font-mono">
              Principal: {userEmail}
            </p>
          )}
        </div>

        {/* Progress Metrics & Bar */}
        <div className="w-full space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5 truncate">
              <Loader2 className="h-3 w-3 animate-spin text-indigo-400 shrink-0" />
              {statusText}
            </span>
            <span className="font-mono font-bold text-indigo-400 shrink-0">
              {progress}%
            </span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800/40 pt-2.5">
            <span>TLSv1.3 AES-256</span>
            <span className="animate-pulse">STREAMING LEDGER DATA...</span>
          </div>
        </div>

        {/* Real-time System Debug Logs Console */}
        <div className="w-full bg-black/50 p-4 rounded-xl border border-slate-900 font-mono text-[10px] text-left text-slate-400 h-28 overflow-hidden space-y-1 relative shadow-inner">
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          {logs.map((log, i) => (
            <div
              key={i}
              className={`truncate ${i === logs.length - 1 ? "text-indigo-300 font-bold" : ""}`}
            >
              <span className="text-slate-500 font-bold">&gt;&nbsp;</span>
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <span className="text-slate-600 italic">
              No logs published yet...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
