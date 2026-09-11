import React from "react";
import StateCard from "./StateCard";
import {
  TrendingUp,
  Users,
  Clock,
  CalendarClock,
  IndianRupee,
  Wallet,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Renders the dashboard metric cards for staff, salary, attendance, and leave requests.
 *
 * @returns {JSX.Element} Dashboard metrics card grid.
 */
function CardsGrid() {
  const { metrics } = useDashboardContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      <StateCard
        cardIcon={Users}
        cardMiniIcon={TrendingUp}
        title="Total Staff"
        subTitle="Active"
        statsValue={metrics.totalStaff}
        bgColor="bg-emerald-50"
        textColor="text-emerald-600"
      />
      <StateCard
        cardIcon={IndianRupee}
        cardMiniIcon={Wallet}
        title="Avg. Salary"
        subTitle="Annual Payroll"
        statsValue={metrics.avgSalary}
        bgColor="bg-sky-50"
        textColor="text-sky-600"
      />
      <StateCard
        cardIcon={Clock}
        cardMiniIcon={CheckCircle2}
        title="Attendance"
        subTitle="Today's Presence"
        statsValue={metrics.attendance}
        bgColor="bg-indigo-50"
        textColor="text-indigo-600"
      />
      <StateCard
        cardIcon={CalendarClock}
        cardMiniIcon={AlertCircle}
        title="Pending Leaves"
        subTitle="Needs Approval"
        statsValue={metrics.pendingLeaves}
        bgColor="bg-amber-50"
        textColor="text-amber-600"
      />
    </div>
  );
}

export default CardsGrid;
