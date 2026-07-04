import React from "react";
import LeaveHeader from "./LeaveHeader";
import ListLeaves from "./ListLeaves";
import TimeOffRequestForm from "./TimeOffRequestForm";

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
