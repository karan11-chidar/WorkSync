import React, { useState } from "react";
import { XCircle, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLeaveRejectModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-rose-50/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Provide Rejection Reason
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="p-4 sm:p-5 space-y-3.5 text-xs font-medium text-slate-600"
        >
          <div className="space-y-1">
            <label className="text-slate-500 font-bold block uppercase tracking-wide text-[9px]">
              Justification Statement *
            </label>
            <textarea
              required
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State clearly why this leave request is being denied (e.g., Low team bandwidth)..."
              className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white font-medium text-slate-700 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-[11px] flex items-center gap-1.5 shadow-xs"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Confirm Rejection"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

