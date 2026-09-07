/**
 * @fileoverview Employee Dashboard Page Component
 *
 * Renders the main dashboard view for employees, providing an overview of
 * attendance, tasks, and team colleagues. Integrates multiple sub-components
 * to create a comprehensive dashboard layout.
 *
 * @module features/employee/dashboard/pages/DashBoard
 * @requires react
 * @requires ../components/Header
 * @requires ../components/LeftSection
 * @requires ../components/PremiumTeamColleagues
 * @requires ../contexts/DashboardContext
 */

import React, { useEffect } from "react";
import Header from "../components/Header";
import LeftSection from "../components/LeftSection";
import PremiumTeamColleagues from "../components/PremiumTeamColleagues";
import { useDashboardContext } from "../contexts/DashboardContext";
import DashboardSkeleton from "../components/DashboardSkeleton";

/**
 * DashBoard Component
 *
 * Main dashboard page component for employees. Displays a comprehensive view including:
 * - Header with user information and navigation
 * - Left section with primary dashboard content
 * - Premium team colleagues section
 *
 * The component automatically fetches today's attendance data on mount and maintains
 * a responsive layout that adapts from single column (mobile) to three-column grid (desktop).
 *
 * @component
 * @returns {React.ReactElement} The rendered dashboard page
 *
 * @example
 * // Basic usage in route configuration
 * <Route path="/employee/dashboard" element={<DashBoard />} />
 *
 * @throws {Error} If DashboardContext is not available in the component tree
 */
function DashBoard() {
  const { isLoading } = useDashboardContext();
 
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6">
      <Header />
      {isLoading && <DashboardSkeleton/>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeftSection />
        <PremiumTeamColleagues />
      </div>
    </div>
  );
}

export default DashBoard;
