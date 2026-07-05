import React from "react";
import LeaveDashboardHeader from "./LeaveDashboardHeader"; // 1. हेडर
import ApplyLeaveForm from "./ApplyLeaveForm"; // 2. फॉर्म
import LeaveHistoryTable from "./LeaveHistoryTable"; // 3. टेबल

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
