import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  ShieldAlert,
  Save,
  Landmark,
  MapPin,
  FileText,
} from "lucide-react";
const COLOR_MAP = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
};

 const  CreateDepartment = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
      id="dept-modal-overlay"
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] scale-100 opacity-100 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="flex items-center gap-2 text-md font-bold text-indigo-600">
            <Building2 className="h-5 w-5" />
            {editingDept
              ? `Edit Department: ${editingDept.name}`
              : "Add Custom Department"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-medium text-slate-600"
        >
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {/* Name & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Department Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sales, Operations"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-600 flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" /> Location / Hub *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Block A, SF Hub or Remote"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white font-medium"
              />
            </div>
          </div>

          {/* Manager & Budget Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Manager / Leader *
              </label>
              <select
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600 outline-none"
              >
                <option value="">-- Choose a Leader --</option>
                {employees?.map((emp) => {
                  const fullName =
                    typeof emp === "object"
                      ? `${emp.firstName} ${emp.lastName}`
                      : emp;
                  return (
                    <option key={fullName} value={fullName}>
                      {fullName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-600 flex items-center gap-1">
                <Landmark size={12} className="text-slate-400" /> Starting
                Budget Allocation (INR) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 150000"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white font-semibold"
              />
            </div>
          </div>

          {/* Theme Color Selection Pills */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-600">Theme Color</label>
            <div className="flex flex-wrap gap-2.5 pt-1.5">
              {Object.keys(COLOR_MAP).map((colorKey) => {
                const isActive = color === colorKey;
                const config = COLOR_MAP[colorKey];
                return (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() => setColor(colorKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? `${config.bg} ${config.text} ${config.border} ring-2 ring-indigo-500/30 scale-105`
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${config.dot}`}
                    />
                    {colorKey}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description area */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-600 flex items-center gap-1">
              <FileText size={12} className="text-slate-400" /> Description /
              Focus Areas *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the department's operational mandate and core deliverables..."
              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none resize-none bg-white font-medium"
            />
          </div>

          {/* Actions Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <Save size={14} />
              {editingDept ? "Save Profile Changes" : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDepartment;
