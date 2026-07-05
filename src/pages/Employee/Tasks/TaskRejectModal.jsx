import React from "react";
import { XCircle, AlertCircle } from "lucide-react";

export default function TaskRejectModal({
  isOpen,
  reasonText,
  setReasonText,
  modalError,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 scale-100 opacity-100 transition-all">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 bg-rose-50/40 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <h3 className="text-sm font-bold text-slate-900">
            Provide Reason for Declining
          </h3>
        </div>

        {/* Modal Body Form */}
        <form
          onSubmit={onSubmit}
          className="p-5 space-y-3.5 text-xs font-medium text-slate-600"
        >
          {modalError && (
            <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-center gap-1.5">
              <AlertCircle size={14} className="shrink-0" />
              <span>{modalError}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-500 font-bold block uppercase tracking-wide text-[9px]">
              Written Justification *
            </label>
            <textarea
              required
              rows={4}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="State clearly why you are rejecting this delivery module allocation (e.g., Tech stack conflict, bandwidth full)..."
              className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-rose-500 bg-white font-medium text-slate-700 resize-none leading-relaxed"
            />
          </div>

          {/* Action Sheet Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all cursor-pointer text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all cursor-pointer text-[11px] shadow-sm shadow-rose-600/10"
            >
              Confirm Decline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
