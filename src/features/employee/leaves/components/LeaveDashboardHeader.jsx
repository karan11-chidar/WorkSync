import React from "react";
import { CalendarDays, CheckCircle, Clock, ShieldAlert } from "lucide-react";
import { useLeaveContext } from "../context/LeaveContext";

/**
 * Displays live leave balances and summary statistics for an employee.
 *
 * @component
 * @returns {JSX.Element} The employee leave dashboard header.
 */
export default function LeaveDashboardHeader() {
  const { stats } = useLeaveContext();

  const cards = [
    {
      label: "Annual Balance",
      value: stats?.annualBalance || "24 Days",
      icon: CalendarDays,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      label: "Approved Leaves",
      value: stats?.approvedDays || "00 Days",
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Pending Review",
      value: stats?.pendingRequests || "00 Requests",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="w-full space-y-5 p-1 mb-2">
      {/* Title Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono bg-indigo-50 px-2 py-0.5 rounded w-fit">
            Employee Portal
          </div>
          <h1 className="text-[1rem] font-black text-slate-900 tracking-tight sm:text-2xl mt-2">
            Time-Off & Leave Management
          </h1>
          <p className="hidden lg:block text-xs text-slate-400 leading-relaxed max-w-xl">
            Track your personal holiday metrics, apply for medical or casual
            leaves, and audit your real-time approval history sheets.
          </p>
        </div>

        {/* Notice Alert */}
        <div className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl max-w-xs md:max-w-sm shrink-0">
          <ShieldAlert className="h-5 w-5 text-indigo-500 shrink-0 animate-pulse" />
          <p className="text-[11px] text-slate-500 font-medium leading-normal">
            All medical leave submissions require official digital certificate
            uploads for HR audit verification blocks.
          </p>
        </div>
      </div>

      {/* Metrics Row Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs flex items-center justify-between group hover:border-slate-200 transition-all duration-200"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {s.label}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">
                  {s.value}
                </h3>
              </div>
              <div
                className={`p-2.5 rounded-xl ${s.color} transition-transform group-hover:scale-105 duration-200`}
              >
                <Icon size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
