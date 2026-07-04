import { Star, Eye } from "lucide-react";
import { useState } from "react";
function DesktopEmployeeTable(props) {
  const employees = [
    {
      id: "EMP-001",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul@company.com",
      role: "Frontend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 850000,
      avatarColor: "from-blue-500 to-cyan-500",
    },
    {
      id: "EMP-002",
      firstName: "Priya",
      lastName: "Verma",
      email: "priya@company.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "On Leave",
      performanceRating: 4,
      salary: 720000,
      avatarColor: "from-pink-500 to-rose-500",
    },
    {
      id: "EMP-003",
      firstName: "Aman",
      lastName: "Singh",
      email: "aman@company.com",
      role: "Backend Developer",
      department: "Engineering",
      status: "Active",
      performanceRating: 5,
      salary: 980000,
      avatarColor: "from-violet-500 to-indigo-500",
    },
    {
      id: "EMP-004",
      firstName: "Neha",
      lastName: "Patel",
      email: "neha@company.com",
      role: "HR Executive",
      department: "Human Resource",
      status: "Inactive",
      performanceRating: 3,
      salary: 560000,
      avatarColor: "from-emerald-500 to-green-500",
    },
    {
      id: "EMP-005",
      firstName: "Rohit",
      lastName: "Gupta",
      email: "rohit@company.com",
      role: "Financial Analyst",
      department: "Finance",
      status: "Active",
      performanceRating: 4,
      salary: 910000,
      avatarColor: "from-orange-500 to-red-500",
    },
  ];

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
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            Inactive
          </span>
        );
      case "Suspended":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Suspended
          </span>
        );

      default:
        return null;
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
              const initials = emp.firstName[0] + emp.lastName[0];

              return (
                <tr
                  key={emp.id}
                  className="group cursor-pointer hover:bg-indigo-50/40 transition-all duration-200"
                >
                  {/* Employee */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => props.handleSelectEmployee(emp)}
                        className={`h-10 w-10 rounded-full bg-linear-to-br ${emp.avatarColor}
flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white hover:ring-indigo-500 transition-all hover:scale-105`}
                      >
                        {initials}
                      </button>

                      <div className=" group ">
                        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-all ">
                          {emp.firstName} {emp.lastName}
                        </h3>

                        <p className="text-[11px] hover:text-slate-700 hover:underline text-slate-500 mt-1 ">
                          <a
                            href={`mailto:${emp.email}`}
                            className="hover:text-slate-600"
                          >
                            {emp.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}

                  <td className="px-6 py-5 font-mono text-xs tracking-wide text-slate-500">
                    {emp.id}
                  </td>

                  {/* Department */}

                  <td className="px-6 py-5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {emp.role}
                    </h4>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {emp.department}
                    </p>
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">{renderStatus(emp.status)}</td>

                  {/* Rating */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < emp.performanceRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Salary */}

                  <td className="px-6 py-5 text-right">
                    <h3 className="text-sm font-bold text-slate-900">
                      ₹{emp.salary.toLocaleString("en-IN")}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">Annual CTC</p>
                  </td>

                  {/* Action */}

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => props.handleSelectEmployee(emp)}
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
                        transition-all
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
