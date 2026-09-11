import React from "react";
import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Displays employees who were recently onboarded with profile image support.
 *
 * @component
 * @returns {JSX.Element} The recent onboarding list.
 */
function RecentOnboardings() {
  const { recentHires } = useDashboardContext();

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm h-125 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900">
            Recent Onboardings
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            Newly joined employees across the organization.
          </p>
        </div>
      </div>

      {/* Scrollable Employee List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 px-4 md:px-6 custom-scroll">
        {recentHires.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-12">
            No recent onboardings found.
          </p>
        ) : (
          recentHires.map((emp) => {
            const rawName =
              `${emp.firstName || ""} ${emp.lastName || ""}`.trim();
            const initials =
              rawName
                .split(" ")
                .filter(Boolean)
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase() || "ST";

            return (
              <div
                key={emp.id}
                className="py-4 flex items-center justify-between gap-3"
              >
                {/* Left: Avatar / Photo & Details */}
                <div className="flex items-center gap-3 min-w-0">
                  {emp.avatarUrl ? (
                    <img
                      src={emp.avatarUrl}
                      alt={rawName}
                      className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover ring-2 ring-indigo-50 shrink-0 bg-slate-100"
                    />
                  ) : (
                    <div
                      className={`h-10 w-10 md:h-11 md:w-11 rounded-full bg-linear-to-br ${emp.avatarColor} flex items-center justify-center text-white text-xs md:text-sm font-bold shrink-0 shadow-2xs`}
                    >
                      {initials}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-slate-900 truncate">
                      {rawName}
                    </h4>
                    <p className="text-[11px] md:text-xs text-slate-500 truncate">
                      {emp.role}
                    </p>
                    <span className="text-[10px] md:text-xs text-slate-400 truncate block">
                      {emp.department}
                    </span>
                  </div>
                </div>

                {/* Right: Joining Date & Badge */}
                <div className="text-right shrink-0">
                  <p className="text-[10px] md:text-xs text-slate-500">
                    {emp.dateJoined}
                  </p>
                  <span className="inline-block mt-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-semibold">
                    Joined
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RecentOnboardings;
