import React from "react";

function RecentOnboardings() {
  const recentHires = [
    {
      id: 1,
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Frontend Developer",
      department: "Engineering",
      dateJoined: "12 Jul 2026",
      avatarColor: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      firstName: "Priya",
      lastName: "Verma",
      role: "UI/UX Designer",
      department: "Design",
      dateJoined: "10 Jul 2026",
      avatarColor: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      firstName: "Aman",
      lastName: "Singh",
      role: "HR Executive",
      department: "Human Resources",
      dateJoined: "08 Jul 2026",
      avatarColor: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      firstName: "Neha",
      lastName: "Patel",
      role: "Financial Analyst",
      department: "Finance",
      dateJoined: "05 Jul 2026",
      avatarColor: "from-emerald-500 to-green-500",
    },
    {
      id: 5,
      firstName: "Rohit",
      lastName: "Kumar",
      role: "Backend Developer",
      department: "Engineering",
      dateJoined: "03 Jul 2026",
      avatarColor: "from-violet-500 to-indigo-500",
    },
    {
      id: 6,
      firstName: "Sneha",
      lastName: "Gupta",
      role: "QA Engineer",
      department: "Testing",
      dateJoined: "01 Jul 2026",
      avatarColor: "from-cyan-500 to-sky-500",
    },
    {
      id: 7,
      firstName: "Aditya",
      lastName: "Jain",
      role: "DevOps Engineer",
      department: "Infrastructure",
      dateJoined: "28 Jun 2026",
      avatarColor: "from-green-500 to-lime-500",
    },
  ];

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

        <button className="text-xs md:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          See All
        </button>
      </div>

      {/* Scrollable Employee List */}

      <div
        className="
          flex-1
          overflow-y-auto
          divide-y
          divide-slate-100
          px-4
          md:px-6
          custom-scroll
        "
      >
        {recentHires.map((emp) => {
          const initials = emp.firstName.charAt(0) + emp.lastName.charAt(0);

          return (
            <div
              key={emp.id}
              className="py-4 flex items-center justify-between gap-3"
            >
              {/* Left */}

              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`
                    h-10
                    w-10
                    md:h-11
                    md:w-11
                    rounded-full
                    bg-linear-to-br
                    ${emp.avatarColor}
                    flex
                    items-center
                    justify-center
                    text-white
                    text-xs
                    md:text-sm
                    font-bold
                    shrink-0
                  `}
                >
                  {initials}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-slate-900 truncate">
                    {emp.firstName} {emp.lastName}
                  </h4>

                  <p className="text-[11px] md:text-xs text-slate-500 truncate">
                    {emp.role}
                  </p>

                  <span className="text-[10px] md:text-xs text-slate-400">
                    {emp.department}
                  </span>
                </div>
              </div>

              {/* Right */}

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
        })}
      </div>
    </div>
  );
}

export default RecentOnboardings;
