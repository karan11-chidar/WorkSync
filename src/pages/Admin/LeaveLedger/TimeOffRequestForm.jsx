import React, { useState } from "react";
import {
  PlusCircle,
  AlertCircle,
  Calendar,
  FileText,
  User,
  Layers,
} from "lucide-react";

export default function TimeOffRequestForm() {
  // 1. Static Employees Data (ड्रॉपडाउन लिस्ट को भरने के लिए)
  const activeEmployees = [
    {
      id: "EMP-001",
      firstName: "Rahul",
      lastName: "Sharma",
      department: "Engineering",
    },
    {
      id: "EMP-002",
      firstName: "Priya",
      lastName: "Verma",
      department: "Design",
    },
    {
      id: "EMP-003",
      firstName: "Aman",
      lastName: "Singh",
      department: "Engineering",
    },
    { id: "EMP-004", firstName: "Neha", lastName: "Patel", department: "HR" },
  ];

  // Form की स्टेट्स (Static UI Mode)
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("Vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [formError, setFormError] = useState(null);

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!employeeId) {
      setFormError("Please select a target employee.");
      return;
    }
    if (!startDate || !endDate) {
      setFormError("Both Start and End dates are required.");
      return;
    }
    if (!reason.trim()) {
      setFormError("Please provide a written excuse or context.");
      return;
    }

    console.log("Time-off request filed:", {
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    // सबमिशन के बाद फॉर्म रीसेट
    setEmployeeId("");
    setLeaveType("Vacation");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6" id="leave-form-column">
      <div
        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4"
        id="leave-creation-card"
      >
        {/* Card Header */}
        <div className="border-b border-slate-50 pb-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PlusCircle className="h-4 w-4 text-indigo-600" />
            File Time-Off
          </h2>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Submit formal absence logs instantly for company analytics
            processing.
          </p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleLocalSubmit}
          className="space-y-4 text-xs font-medium text-slate-600"
          id="timeoff-request-form"
        >
          {/* Error Handler View */}
          {formError && (
            <div
              className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-start gap-1.5"
              id="timeoff-error"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="font-semibold text-[11px]">{formError}</span>
            </div>
          )}

          {/* Select Employee */}
          <div className="space-y-1">
            <label className="text-slate-600 font-bold  flex items-center gap-1">
              <User size={12} className="text-slate-400" /> Target Employee{" "}
              <span className="text-rose-500">*</span>
            </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer text-slate-700 font-medium"
              id="form-target-employee"
              required
            >
              <option value="">-- Choose Employee --</option>
              {activeEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.department})
                </option>
              ))}
            </select>
          </div>

          {/* Select Category */}
          <div className="space-y-1">
            <label className="text-slate-600 font-bold  flex items-center gap-1">
              <Layers size={12} className="text-slate-400" /> Absence Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer text-slate-700 font-medium"
              id="form-absence-type"
            >
              <option value="Vacation">Vacation Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Personal">Personal Leave</option>
              <option value="Maternity/Paternity">
                Maternity/Paternity Leave
              </option>
              <option value="Unpaid">Unpaid Absences</option>
            </select>
          </div>

          {/* Start and End Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-600 font-bold  flex items-center gap-1">
                <Calendar size={12} className="text-slate-400" /> Start Date{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white font-medium text-slate-700"
                id="form-start-date"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-bold  flex items-center gap-1">
                <Calendar size={12} className="text-slate-400" /> End Date{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white font-medium text-slate-700"
                id="form-end-date"
              />
            </div>
          </div>

          {/* Reason Description */}
          <div className="space-y-1">
            <label className="text-slate-600 font-bold  flex items-center gap-1">
              <FileText size={12} className="text-slate-400" /> Written Excuse /
              Context <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="State the core details, emergency back-ups or timeline contexts clearly..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-600 resize-none font-medium text-slate-700 bg-white"
              id="form-reason"
            />
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-bold transition-all cursor-pointer text-center text-xs active:scale-[0.98] shadow-xs"
            id="form-submit-timeoff"
          >
            File Leave Request
          </button>
        </form>
      </div>
    </div>
  );
}
