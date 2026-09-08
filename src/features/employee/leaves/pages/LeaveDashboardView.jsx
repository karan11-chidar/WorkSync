import React from "react";
import LeaveDashboardHeader from "../components/LeaveDashboardHeader"; // 1. हेडर
import ApplyLeaveForm from "../components/ApplyLeaveForm"; // 2. फॉर्म
import LeaveHistoryTable from "../components/LeaveHistoryTable"; // 3. टेबल

/**
 * Composes the employee leave dashboard view.
 *
 * @returns {JSX.Element} The leave dashboard page.
 */
export default function LeaveDashboardView() {
  return (
    <div className="w-full space-y-6">
      <LeaveDashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-1">
          <ApplyLeaveForm />
        </div>

        <div className="lg:col-span-2">
          <LeaveHistoryTable />
        </div>
      </div>
    </div>
  );
}
