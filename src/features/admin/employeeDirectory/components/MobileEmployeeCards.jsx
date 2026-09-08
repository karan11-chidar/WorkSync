import { useState } from "react";
import { Eye, Star, Building2, IndianRupee } from "lucide-react";

/**
 * Renders employee records as cards for narrow screens.
 *
 * @param {Object} props - Card list props.
 * @param {Function} props.handleSelectEmployee - Selects an employee for details.
 * @param {Array} props.employees - Employee records to display.
 * @returns {JSX.Element} The mobile employee card list.
 */
function MobileEmployeeCards({ handleSelectEmployee, employees = [] }) {
  const statusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            Active
          </span>
        );

      case "On Leave":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
            On Leave
          </span>
        );

      case "Inactive":
      case "Terminated":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            {status}
          </span>
        );

      case "Suspended":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Suspended
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            {status || "Active"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-3 p-3">
      {employees.map((emp) => {
        const firstNameInitial = emp.firstName?.[0] || "";
        const lastNameInitial = emp.lastName?.[0] || "";
        const initials = `${firstNameInitial}${lastNameInitial}` || "E";

        return (
          <div
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 active:scale-[0.98] transition-all"
          >
            {/* Top Row: Avatar/Image, Info, Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSelectEmployee(emp)}
                className="relative shrink-0 cursor-pointer"
                title="View Profile"
              >
                {emp?.avatarUrl ? (
                  <img
                    src={emp.avatarUrl}
                    alt={`${emp.firstName} Avatar`}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100 shadow-xs bg-slate-100"
                  />
                ) : (
                  <div
                    className={`h-12 w-12 rounded-full bg-linear-to-br ${
                      emp.avatarColor || "from-indigo-600 to-indigo-800"
                    } flex items-center justify-center text-white font-bold text-sm shadow-xs uppercase`}
                  >
                    {initials}
                  </div>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-slate-900 truncate text-sm">
                  {emp.firstName} {emp.lastName}
                </h2>

                <p className="text-xs text-slate-500 truncate">{emp.jobRole}</p>

                <p className="text-[11px] text-slate-400 truncate">
                  <a
                    href={`mailto:${emp.email}`}
                    className="hover:text-indigo-600"
                  >
                    {emp.email}
                  </a>
                </p>
              </div>

              {statusBadge(emp.employmentStatus)}
            </div>

            {/* Details: Department, Salary, Rating, Employee ID */}
            <div className="mt-4 flex justify-between items-center">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Building2 size={14} className="text-slate-400" />
                  <span>{emp.department || "N/A"}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                  <IndianRupee size={13} />
                  <span>
                    {Number(emp.salary || 0).toLocaleString("en-IN")} / yr
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-0.5 justify-end">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3 w-3 ${
                        index < (emp.performanceRating || 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[10px] text-slate-400 font-mono mt-1">
                  ID: {emp.employeeId || emp.id}
                </p>
              </div>
            </div>

            {/* View Details Action Button */}
            <button
              onClick={() => handleSelectEmployee(emp)}
              className="
                mt-4
                w-full
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                py-2.5
                text-white
                text-xs
                font-semibold
                active:scale-95
                transition-all
                cursor-pointer
                shadow-xs
              "
            >
              <Eye size={15} />
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MobileEmployeeCards;
