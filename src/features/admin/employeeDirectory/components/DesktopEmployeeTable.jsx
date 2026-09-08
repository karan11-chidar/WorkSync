import { Star, Eye } from "lucide-react";
import { useState } from "react";

/**
 * Renders employee records in a desktop table layout.
 *
 * @param {Object} props - Table props.
 * @param {Array} props.employees - Employee records to display.
 * @param {Function} props.handleSelectEmployee - Selects an employee for details.
 * @returns {JSX.Element} The desktop employee table.
 */
function DesktopEmployeeTable({ employees = [], handleSelectEmployee }) {
  const renderStatus = (status) => {
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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
      <div className="overflow-x-auto cursor-pointer">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 bg-white border-b border-slate-200">
            <tr className="text-[11px] uppercase tracking-[0.15em] font-semibold text-slate-500">
              <th className="px-5 py-3 text-left">Employee</th>
              <th className="px-5 py-3 text-left">Employee ID</th>
              <th className="px-5 py-3 text-left">Department</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Performance</th>
              <th className="px-5 py-3 text-right">Salary</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => {
              const firstNameInitial = emp.firstName?.[0] || "";
              const lastNameInitial = emp.lastName?.[0] || "";
              const initials = `${firstNameInitial}${lastNameInitial}` || "E";

              return (
                <tr
                  key={emp.id}
                  className="group cursor-pointer hover:bg-indigo-50/40 transition-all duration-200"
                >
                  {/* Employee Avatar + Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleSelectEmployee(emp)}
                        className="relative shrink-0"
                        title="View Profile"
                      >
                        {emp?.avatarUrl ? (
                          <img
                            src={emp.avatarUrl}
                            alt={`${emp.firstName} Avatar`}
                            className="h-10 w-10 rounded-full object-cover shadow-md ring-2 ring-white group-hover:ring-indigo-500 transition-all group-hover:scale-105 bg-slate-100"
                          />
                        ) : (
                          <div
                            className={`h-10 w-10 rounded-full bg-linear-to-br ${
                              emp.avatarColor || "from-indigo-600 to-indigo-800"
                            } flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white group-hover:ring-indigo-500 transition-all group-hover:scale-105 uppercase`}
                          >
                            {initials}
                          </div>
                        )}
                      </button>

                      <div className="group">
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-all">
                          {emp.firstName} {emp.lastName}
                        </h3>

                        <p className="text-[11px] text-slate-500 mt-1">
                          <a
                            href={`mailto:${emp.email}`}
                            className="hover:text-indigo-600 hover:underline"
                          >
                            {emp.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}
                  <td className="px-6 py-5 font-mono text-xs tracking-wide text-slate-500">
                    {emp.employeeId || emp.id}
                  </td>

                  {/* Department & Role */}
                  <td className="px-6 py-5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {emp.jobRole || "N/A"}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {emp.department || "N/A"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    {renderStatus(emp.employmentStatus)}
                  </td>

                  {/* Performance Rating */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < (emp.performanceRating || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Salary */}
                  <td className="px-6 py-5 text-right">
                    <h3 className="text-sm font-bold text-slate-900">
                      ₹{Number(emp.salary || 0).toLocaleString("en-IN")}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">Annual CTC</p>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-center">
                    <button
                      type="button"
                      onClick={() => handleSelectEmployee(emp)}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3 py-1.5
                        rounded-xl
                        border
                        border-slate-200
                        hover:bg-indigo-50
                        hover:border-indigo-200
                        text-indigo-600
                        text-xs
                        font-medium
                        transition-all
                        cursor-pointer
                      "
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DesktopEmployeeTable;
