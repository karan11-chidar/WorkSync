import React, { useState, useEffect } from "react";
import { Cpu, Loader2, Lock, LogOutIcon, RefreshCw,  } from "lucide-react";
import { useAuth } from "../../../features/auth/context/AuthContext";

export default function PremiumLoader() {
  const { loaderState } = useAuth();
  const { active, mode } = loaderState;
  const [progress, setProgress] = useState(0);

  // अलग-अलग मोड्स के लिए प्रीमियम टेक्स्ट, आइकॉन्स और स्पीड का कॉन्फ़िगरेशन
  const modeSettings = {
    login: {
      badge: "Security Decryption Gateway",
      heading: "AUTHORIZING ACCOUNT",
      status: "Verifying credentials on secure cluster...",
      icon: <Lock className="h-9 w-9 text-emerald-400 animate-pulse" />,
      increment: 5, // तेज़ बढ़ेगा
      intervalTime: 80,
    },
    logout: {
      badge: "Account Provisioning Node",
      heading: "Logout User",
      status: "Initializing secure database schema...",
      icon: <LogOutIcon className="h-9 w-9 text-indigo-400 animate-pulse" />,
      increment: 4, // थोड़ा आराम से बढ़ेगा (डेटाबेस सेटअप फील)
      intervalTime: 80,
    },
    refresh: {
      badge: "Telemetry Sync Portal",
      heading: "REFRESHING WORKSYNC",
      status: "Re-syncing live system states...",
      icon: (
        <RefreshCw className="h-9 w-9 text-amber-400 animate-spin [animation-duration:2s]" />
      ),
      increment: 8, // बहुत तेज़ बढ़ेगा
      intervalTime: 60,
    },
    default: {
      badge: "Secure System Node",
      heading: "LOADING WORKSYNC",
      status: "Connecting to secure cluster...",
      icon: <Cpu className="h-10 w-10 text-indigo-400 animate-pulse" />,
      increment: 5,
      intervalTime: 70,
    },
  };

  const currentConfig = modeSettings[mode] || modeSettings.default;

  // प्रोग्रेस नंबर और लाइन को ऑटोमैटिकली चलाने का लॉजिक
  useEffect(() => {
    if (!active) {
      setProgress(0); // अगर लोडिंग बंद हो, तो प्रोग्रेस रीसेट कर दो
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // मोड के हिसाब से थोड़ा रैंडम और नेचुरल इंक्रीमेंट
        const next =
          prev + Math.floor(Math.random() * 5) + currentConfig.increment;
        return Math.min(next, 100);
      });
    }, currentConfig.intervalTime);

    return () => clearInterval(interval);
  }, [active, mode]);

  if (!active) return null;

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
        {/* Dynamic Premium Icon Gate */}
        <div className="relative transform scale-100">
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/25 blur-xl animate-pulse scale-110" />
          <div className="h-20 w-20 rounded-3xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center relative z-10 shadow-lg">
            {currentConfig.icon}
          </div>
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full animate-ping opacity-75" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 rounded-full" />
        </div>

        {/* Headline Matrix */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest border border-indigo-500/20 font-mono">
              {currentConfig.badge}
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2 uppercase tracking-wide">
            {currentConfig.heading}
          </h2>
        </div>

        {/* Progress Metrics & Bar */}
        <div className="w-full space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5 truncate">
              <Loader2 className="h-3 w-3 animate-spin text-indigo-400 shrink-0" />
              {currentConfig.status}
            </span>
            {/* मोड के हिसाब से खुद चलने वाला डायनेमिक नंबर */}
            <span className="font-mono font-bold text-indigo-400 shrink-0">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Container - Line भी मोड की स्पीड से आगे बढ़ेगी */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800/40 pt-2.5">
            <span>TLSv1.3 AES-256</span>
            <span className="animate-pulse text-indigo-400/80">
              PROCESSING REQUEST
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
