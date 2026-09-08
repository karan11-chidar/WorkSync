import React from "react";
import LeaveDashboardHeader from "../components/LeaveDashboardHeader";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import LeaveHistoryTable from "../components/LeaveHistoryTable";
import { useLeaveContext } from "../context/LeaveContext";
import LeavePageSkeleton from "../components/LeavePageSkeleton";

/**
 * Main leave dashboard view wrapped with LeaveProvider.
 *
 * @component
 * @returns {JSX.Element} The leave dashboard page.
 */
export default function LeaveDashboardView() {
  const { isLoading } = useLeaveContext();
  if (isLoading) {
    return <LeavePageSkeleton/>
  }
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
