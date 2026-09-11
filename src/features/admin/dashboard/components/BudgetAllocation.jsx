import React from "react";
import { IndianRupee } from "lucide-react";
import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Displays the dashboard budget allocation breakdown with safe number parsing.
 *
 * @component
 * @returns {JSX.Element} The budget allocation view.
 */
function BudgetAllocation() {
  const { departmentRecords  } = useDashboardContext();
  // Safely parse budget string to number to prevent string concatenation during reduce
  const totalBudget = departmentRecords?.reduce(
    (sum, dept) => sum + (Number(dept.budget) || 0),
    0,
  );

  let currentOffset = 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
          Budget Allocation
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
          Budget distribution across organizational departments.
        </p>
      </div>

      {departmentRecords.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-10 text-xs text-slate-400">
          No budget records available.
        </div>
      ) : (
        <>
          {/* Donut Chart */}
          <div className="flex justify-center py-5 relative my-auto">
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

              {departmentRecords.map((dept) => {
                const numericBudget = Number(dept.budget) || 0;
                const percent =
                  totalBudget > 0 ? numericBudget / totalBudget : 0;
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
                    stroke={dept.color || "#6366f1"}
                    strokeWidth="10"
                    strokeDasharray={`${strokeDash} ${circumference}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Total Budget
              </span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900">
                {(totalBudget / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {departmentRecords.map((dept) => {
              const numericBudget = Number(dept.budget) || 0;
              const pct =
                totalBudget > 0
                  ? Math.round((numericBudget / totalBudget) * 100)
                  : 0;

              return (
                <div
                  key={dept.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        dept.dot || "bg-indigo-500"
                      }`}
                    />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium truncate">
                      {dept.departmentName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-0.5">
                      <IndianRupee className="h-3 w-3" />
                      {(numericBudget / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans">
                      ({pct}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default BudgetAllocation;
