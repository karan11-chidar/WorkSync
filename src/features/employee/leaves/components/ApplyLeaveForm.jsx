import React, { useState } from "react";
import { Calendar, AlertTriangle, Send } from "lucide-react";

export default function ApplyLeaveForm() {
  // लोकल स्टेट्स (Static UI Testing Mode)
  const [leaveType, setLeaveType] = useState("Vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [localLeaveError, setLocalLeaveError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalLeaveError(null);

    if (!startDate || !endDate) {
      setLocalLeaveError("Please select both start and end dates.");
      return;
    }

    console.log("Leave application submitted:", {
      leaveType,
      startDate,
      endDate,
      reason,
    });
    // फॉर्म रीसेट
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div
      className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4"
      id="request-leave-card"
    >
      {/* Card Header */}
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="h-4 w-4 text-indigo-500" />
          Apply For Leave
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Submit formal leave applications directly to human resources.
        </p>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-xs font-medium text-slate-600"
      >
        {localLeaveError && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-start gap-1.5">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-semibold">{localLeaveError}</span>
          </div>
        )}

        {/* Leave Type Select */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Leave Type
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="block w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-700 font-semibold cursor-pointer"
          >
            <option value="Vacation">Vacation Time off</option>
            <option value="Sick">Sick / Medical Leave</option>
            <option value="Personal">Personal Leave</option>
            <option value="Maternity/Paternity">Maternity/Paternity Off</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
        </div>

        {/* Date Row Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Start Date
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 font-mono font-bold text-slate-700"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              End Date
            </label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 font-mono font-bold text-slate-700"
            />
          </div>
        </div>

        {/* Reason Textarea */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Leave Reason
          </label>
          <textarea
            required
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide short justification describing your request..."
            className="block w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-700 font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Send size={13} />
          Submit Request to HR
        </button>
      </form>
    </div>
  );
}
