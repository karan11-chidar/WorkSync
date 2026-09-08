import React from "react";
import LeaveHeader from "../components/LeaveHeader.jsx";
import ListLeaves from "../components/ListLeaves.jsx";
import TimeOffRequestForm from "../components/TimeOffRequestForm.jsx";

/**
 * Displays the administrator leave ledger.
 *
 * @returns {JSX.Element} The leave ledger page.
 */
function LeaveLedger() {
  return (
    <div className="space-y-6">
      <LeaveHeader />

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
        animate-fadeIn
        "
      >
        {/* Left Side */}
        <div className="lg:col-span-2">
          <ListLeaves />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <TimeOffRequestForm />
        </div>
      </div>
    </div>
  );
}

export default LeaveLedger;
