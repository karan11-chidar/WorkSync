import React, { useState } from "react";
import { Filter, Inbox, CheckCircle2, XCircle, Layers } from "lucide-react";

export default function LeaveHeader() {
  const [filterStatus, setFilterStatus] = useState("All");

  const filterOptions = [
    {
      name: "All",
      count: 12,
      icon: Layers,
      activeColor: "bg-indigo-600 text-white ring-2 ring-indigo-500/20",
    },
    {
      name: "Pending",
      count: 4,
      icon: Inbox,
      activeColor: "bg-amber-500 text-white ring-2 ring-amber-500/20",
    },
    {
      name: "Approved",
      count: 6,
      icon: CheckCircle2,
      activeColor: "bg-emerald-600 text-white ring-2 ring-emerald-500/20",
    },
    {
      name: "Rejected",
      count: 2,
      icon: XCircle,
      activeColor: "bg-rose-600 text-white ring-2 ring-rose-500/20",
    },
  ];

  return (
    <div className="w-full p-1">
      <div
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-5"
        id="leave-filter-banner"
      >
        {/* Left Side: Header Profile Info */}
        <div className="space-y-1">
          <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Leave Approvals Ledger
          </h1>
          <p className="hidden lg:flex text-xs text-slate-500 leading-relaxed max-w-xl">
            Authoritatively approve or deny operational leave requests logged by
            workers to maintain optimal staffing metrics.
          </p>
        </div>
        <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-slate-400" /> Filter:
        </span>

        {/* Right Side: Premium Quick Filter Selectors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-2.5 bg-slate-50 px-2 py-2 rounded-xl border border-slate-100 self-start xl:self-auto">
          {filterOptions.map((option) => {
            const isActive = filterStatus === option.name;
            const Icon = option.icon;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() => setFilterStatus(option.name)}
                className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 text-xs rounded-lg font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? option.activeColor
                    : "bg-transparent text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-xs"
                }`}
                id={`filter-leave-${option.name}`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span>{option.name}</span>

                {/* Count Pill */}
                <span
                  className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/60 text-slate-500"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
