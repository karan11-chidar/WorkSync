import React from "react";
import { XCircle, AlertCircle, Loader2 } from "lucide-react";

/**
 * Renders the modal dialog used to capture an employee's task rejection justification.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {string} props.reasonText - Controlled textarea input state value.
 * @param {Function} props.setReasonText - State setter for the rejection reason.
 * @param {string|null} [props.modalError] - Dynamic validation/submission error text.
 * @param {boolean} [props.isSubmitting=false] - Async submission state flag.
 * @param {Function} props.onClose - Modal dismissal handler.
 * @param {Function} props.onSubmit - Form submission event handler.
 * @returns {JSX.Element|null} The dialog overlay or null when hidden.
 */
export default function TaskRejectModal({
  isOpen,
  reasonText,
  setReasonText,
  modalError = null,
  isSubmitting = false,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 scale-100 opacity-100 transition-all animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-rose-50/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Provide Reason for Declining
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <form
          onSubmit={onSubmit}
          className="p-4 sm:p-5 space-y-3.5 text-xs font-medium text-slate-600"
        >
          {/* Validation/API Error Container */}
          {modalError && (
            <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-center gap-2 text-[11px] animate-in fade-in">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span>{modalError}</span>
            </div>
          )}

          {/* Justification Textarea */}
          <div className="space-y-1">
            <label className="text-slate-500 font-bold block uppercase tracking-wide text-[9px]">
              Written Justification *
            </label>
            <textarea
              required
              rows={4}
              disabled={isSubmitting}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="State clearly why you are rejecting this deliverable allocation (e.g., Tech stack conflict, bandwidth full)..."
              className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white font-medium text-slate-700 resize-none leading-relaxed transition-all disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          {/* Action Sheet Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold transition-all cursor-pointer text-[11px] active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all cursor-pointer text-[11px] shadow-sm shadow-rose-600/20 flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm Decline"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}