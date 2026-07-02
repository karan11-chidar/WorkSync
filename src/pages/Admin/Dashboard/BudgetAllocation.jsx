import React from "react";
import {IndianRupee} from "lucide-react";
function BudgetAllocation() {
  const departments = [
    {
      id: "engineering",
      name: "Engineering",
      budget: 450000,
      color: "#10b981",
      dot: "bg-emerald-500",
    },
    {
      id: "marketing",
      name: "Marketing",
      budget: 220000,
      color: "#f43f5e",
      dot: "bg-rose-500",
    },
    {
      id: "hr",
      name: "Human Resources",
      budget: 120000,
      color: "#f59e0b",
      dot: "bg-amber-500",
    },
    {
      id: "finance",
      name: "Finance",
      budget: 180000,
      color: "#0ea5e9",
      dot: "bg-sky-500",
    },
    {
      id: "product",
      name: "Product",
      budget: 300000,
      color: "#6366f1",
      dot: "bg-indigo-500",
    },
  ];

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);

  let currentOffset = 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 h-full">
      
      {/* Header */}
      <div>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
          Budget Allocation
        </h2>

        <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
          Budget distribution across organizational departments.
        </p>
      </div>
      {/* Donut Chart */}
      <div className="flex justify-center py-5 relative">
        <svg
          viewBox="0 0 100 100"
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
          />

          {departments.map((dept) => {
            const percent = dept.budget / totalBudget;
            const strokeDash = percent * circumference;
            const offset = currentOffset;
            currentOffset += strokeDash;

            return (
              <circle
                key={dept.id}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={dept.color}
                strokeWidth="10"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Total Budget
          </span>

          <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900">
            {(totalBudget / 1000000).toFixed(2)}M
          </span>
        </div>
      </div>
      {/* Legend */}
      <div className="space-y-3">
        {departments.map((dept) => {
          const pct = Math.round((dept.budget / totalBudget) * 100);

          return (
            <div key={dept.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`h-2.5 w-2.5 rounded-full shrink-0 ${dept.dot}`}
                />

                <span className="text-xs sm:text-sm text-slate-700 font-medium truncate">
                  {dept.name}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-0.5">
                  <IndianRupee className="h-3 w-3" />
                  {(dept.budget / 1000).toFixed(0)}k
                </span>

                <span className="text-[11px] text-slate-400">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetAllocation;
