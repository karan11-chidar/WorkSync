/**
 * EmployeesLists.jsx
 *
 * Top-level file for the admin employee directory list component.
 * This file contains the responsive employee list container used across
 * the admin dashboard. It manages loading state and chooses between
 * desktop or mobile presentations.
 *
 * Documentation:
 * - Desktop table view for large screens.
 * - Mobile card view for smaller screens.
 * - Inline loading/empty state while employee data is fetched.
 */

import React from "react";
import DesktopEmployeeTable from "./DesktopEmployeeTable.jsx";
import MobileEmployeeCards from "./MobileEmployeeCards.jsx";
import { useEmployee } from "../context/EmployeeContext.jsx";
import EmptyState from "../../../../shared/components/EmptyState.jsx";
import PremiumUniversalLoader from "../../../../shared/components/Animations/PremiumUniversalLoader.jsx";

/**
 * EmployeesLists
 *
 * Responsive employee directory container used in the admin dashboard.
 * Renders a desktop table layout on large screens and a mobile card layout on smaller screens.
 * Displays a loading state while employee data is fetched.
 *
 * @param {object} props
 * @param {(employeeId: string) => void} props.handleSelectEmployee - Callback when an employee is selected.
 * @returns {JSX.Element}
 */
function EmployeesLists({ handleSelectEmployee }) {
  const { isLoading, employeeList } = useEmployee();
  const isEmpty = !employeeList || employeeList.length === 0;
  if (isLoading) {
    return <PremiumUniversalLoader variant="list" rows={6} />;
  }
  if (isEmpty) {
    return (
      <EmptyState
        title="No employees found"
        description="There are no Employees available yet. Add staff to populate the directory."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop */}

      <div className="hidden lg:block">
        <DesktopEmployeeTable
          handleSelectEmployee={handleSelectEmployee}
          employees={employeeList}
        />
      </div>

      {/* Mobile */}

      <div className="lg:hidden">
        <MobileEmployeeCards
          handleSelectEmployee={handleSelectEmployee}
          employees={employeeList}
        />
      </div>
    </div>
  );
}
export default EmployeesLists;
