import React from "react";
import { Users, Mail, MessageSquare, ShieldAlert } from "lucide-react";

export default function PremiumTeamColleagues() {
  // 1. Static Dummy Data (UI स्क्रॉलर टेस्ट करने के लिए 7 एम्प्लॉइज़ डाले हैं)
  const currentEmployee = { department: "Engineering" };

  const myColleagues = [
    {
      id: "COL-01",
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Lead Frontend Dev",
      avatarColor: "from-blue-500 to-cyan-500",
      workStatus: "Active",
    },
    {
      id: "COL-02",
      firstName: "Priya",
      lastName: "Verma",
      role: "UI/UX Specialist",
      avatarColor: "from-pink-500 to-rose-500",
      workStatus: "On Break",
    },
    {
      id: "COL-03",
      firstName: "Aman",
      lastName: "Singh",
      role: "Senior Backend Dev",
      avatarColor: "from-violet-500 to-indigo-500",
      workStatus: "Remote",
    },
    {
      id: "COL-04",
      firstName: "Neha",
      lastName: "Patel",
      role: "QA Engineer",
      avatarColor: "from-emerald-500 to-green-500",
      workStatus: "Active",
    },
    {
      id: "COL-05",
      firstName: "Rohit",
      lastName: "Gupta",
      role: "DevOps Specialist",
      avatarColor: "from-orange-500 to-red-500",
      workStatus: "Active",
    },
    {
      id: "COL-06",
      firstName: "Amit",
      lastName: "Mishra",
      role: "Data Scientist",
      avatarColor: "from-teal-500 to-emerald-600",
      workStatus: "Remote",
    },
    {
      id: "COL-07",
      firstName: "Vikas",
      lastName: "Soni",
      role: "Full Stack Intern",
      avatarColor: "from-slate-600 to-slate-800",
      workStatus: "On Break",
    },
  ];

  // स्टेटस डॉट कलर मैप
  const getStatusDotColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500 ring-emerald-100";
      case "On Break":
        return "bg-amber-500 ring-amber-100";
      default:
        return "bg-sky-500 ring-sky-100";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-2">
      <div
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
        id="team-colleagues-card"
      >
        {/* Card Header */}
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3.5">
          <Users className="h-4 w-4 text-indigo-500" />
          My Team ({currentEmployee.department})
        </h3>

        {myColleagues.length === 0 ? (
          /* Empty State */
          <div className="text-center text-slate-400 py-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
            <ShieldAlert className="h-5 w-5 text-slate-300" />
            <p className="text-xs italic">
              No other active colleagues in this department.
            </p>
          </div>
        ) : (
          /* FIX: 5 एम्प्लॉइज़ के बाद ऑटोमैटिक स्क्रॉल करने के लिए max-h और overflow-y सेट किया है */
          <div className="space-y-3 max-h-85 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            {myColleagues.map((colleague) => {
              const initials = `${colleague.firstName[0]}${colleague.lastName[0]}`;
              const dotColor = getStatusDotColor(colleague.workStatus);

              return (
                <div
                  key={colleague.id}
                  className="flex items-center justify-between p-3 bg-white border border-slate-100 hover:border-slate-200 rounded-xl gap-3 transition-all duration-200 group shadow-xxs mr-0.5"
                >
                  {/* Left: Avatar & Initials */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className={`h-9 w-9 rounded-full bg-linear-to-br ${colleague.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-sm uppercase font-sans`}
                      >
                        {initials}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white ${dotColor}`}
                      />
                    </div>

                    {/* Middle: Info */}
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                        {colleague.firstName} {colleague.lastName}
                      </h4>
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5 font-medium">
                        {colleague.role}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors active:scale-90"
                    >
                      <MessageSquare size={13} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors active:scale-90"
                    >
                      <Mail size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
