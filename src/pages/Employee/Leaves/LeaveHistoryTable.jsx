import React from "react";
import { FileText } from "lucide-react";

export default function LeaveHistoryTable() {
  // UI टेस्टिंग के लिए स्टेटिक रिकॉर्ड्स एरे (स्क्रॉल टेस्ट करने के लिए 7 रिकॉर्ड्स रखे हैं)
  const myLeaves = [
    {
      id: "L-01",
      type: "Sick Leave",
      startDate: "06/07/2026",
      endDate: "08/07/2026",
      days: 2,
      reason: "Dental surgery recovery time",
      status: "Approved",
    },
    {
      id: "L-02",
      type: "Vacation Time",
      startDate: "15/07/2026",
      endDate: "20/07/2026",
      days: 5,
      reason: "Annual family trip planned since long",
      status: "Pending",
    },
    {
      id: "L-03",
      type: "Personal Leave",
      startDate: "02/06/2026",
      endDate: "02/06/2026",
      days: 1,
      reason: "Urgent vehicle registration work at RTO",
      status: "Rejected",
    },
    {
      id: "L-04",
      type: "Casual Leave",
      startDate: "12/08/2026",
      endDate: "13/08/2026",
      days: 1,
      reason: "Attending a close friend's wedding ceremony",
      status: "Approved",
    },
    {
      id: "L-05",
      type: "Sick Leave",
      startDate: "22/08/2026",
      endDate: "23/08/2026",
      days: 1,
      reason: "Routine medical checkup and body scans",
      status: "Approved",
    },
    {
      id: "L-06",
      type: "Personal Leave",
      startDate: "05/09/2026",
      endDate: "06/09/2026",
      days: 1,
      reason: "Emergency household repair works",
      status: "Pending",
    },
    {
      id: "L-07",
      type: "Vacation Time",
      startDate: "24/12/2026",
      endDate: "28/12/2026",
      days: 4,
      reason: "Winter festival holidays with extended family",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100"; // Pending
    }
  };

  return (
    <div
      className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
      id="my-leaves-history"
    >
      {/* Header Container */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          My Filed Leave Requests
        </h3>
        <span className="text-[11px] font-bold text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
          Total requested: {myLeaves.length}
        </span>
      </div>

      {myLeaves.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs italic">
          No leave requests submitted yet. Use the application form on the left.
        </div>
      ) : (
        <>
          {/* A. MOBILE VIEW CARD LAYOUT WITH SCROLLER (md:hidden) */}
          {/* FIX: max-h-[560px] सेट किया है ताकि मोबाइल पर 5 कार्ड्स के बाद स्क्रॉल बार आए */}
          <div className="flex flex-col gap-3 md:hidden max-h-140 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-100">
            {myLeaves.map((r) => (
              <div
                key={r.id}
                className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3 shadow-xxs mr-0.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">
                    {r.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(r.status)}`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 block font-bold">
                      DURATION
                    </span>
                    <span className="font-mono text-slate-700 font-bold">
                      {r.startDate} to {r.endDate}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-slate-400 block font-bold">
                      TOTAL DAYS
                    </span>
                    <span className="font-mono text-slate-700 font-bold">
                      {r.days} Days
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 italic truncate">
                  "{r.reason}"
                </div>
              </div>
            ))}
          </div>

          {/* B. DESKTOP VIEW TABLE LAYOUT WITH SCROLLER (hidden md:block) */}
          {/* FIX: max-h-[275px] सेट किया है ताकि 5 रोज़ के बाद टेबल हेडर अपनी जगह टिका रहे और बॉडी स्क्रॉल हो */}
          <div
            className="hidden md:block overflow-x-auto border border-slate-100 rounded-xl max-h-68.75 overflow-y-auto"
            id="leaves-history-table"
          >
            <table className="w-full text-xs text-left text-slate-500 sticky-header">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-50/90 font-bold font-mono border-b border-slate-100 sticky top-0 backdrop-blur-xs z-10">
                <tr>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Dates Matrix</th>
                  <th className="px-5 py-3.5">Span</th>
                  <th className="px-5 py-3.5">Reason Statement</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {myLeaves.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-slate-900 font-bold">
                      {r.type}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      <span className="font-mono font-semibold">
                        {r.startDate}
                      </span>{" "}
                      <span className="text-slate-300 mx-0.5">to</span>{" "}
                      <span className="font-mono font-semibold">
                        {r.endDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-800 font-bold">
                      {r.days} Days
                    </td>
                    <td
                      className="px-5 py-3.5 max-w-45 truncate text-slate-600"
                      title={r.reason}
                    >
                      {r.reason}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(r.status)}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
