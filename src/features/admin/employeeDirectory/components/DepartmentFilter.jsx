/**
 * Imports for DepartmentFilter Component
 *
 * - React: Core React library with hooks for component state and side effects
 * - useEffect: Hook for managing side effects like data fetching
 * - useEmployee: Custom hook to access employee context data and methods
 */

import React, { useEffect } from "react";
import { useEmployee } from "../context/EmployeeContext";

/**
 * DepartmentFilter Component
 *
 * A filter component that provides department selection functionality
 * for employee directory filtering. Displays a dropdown with all available
 * departments fetched from the employee context.
 *
 * @component
 * @param {Object} filterState - Current filter state object
 * @param {string} filterState.department - Currently selected department filter
 * @param {Function} setFilterState - Function to update the filter state
 * @returns {React.ReactElement} Dropdown filter component for departments
 */

function DepartmentFilter({ filterState, setFilterState }) {
  /**
   * Available departments list
   * Contains all department options that can be filtered
   *
   * @type {string[]}
   */
  const { getDepartmentsLists, departmentList } = useEmployee();
  /**
   * Handle department selection change
   * Updates the filter state with selected department
   *
   * @param {Event} e - Change event from select element
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setFilterState((prev) => ({ ...prev, department: value }));
  };

  /**
   * Effect: Fetch departments list on component mount
   *
   * Triggers on component mount to load all available departments
   * Used to populate the department filter dropdown options
   *
   * @effect Runs once on component initialization
   * @dependency [] - Empty dependency array ensures it runs only on mount
   */
  useEffect(() => {
    getDepartmentsLists();
  }, []);

  
  return (
    // Container with spacing between label and select
    <div className="space-y-1">
      {/* Filter label */}
      <label className="text-xs font-semibold text-slate-500">Department</label>

      {/* Department select dropdown */}
      <select
        value={filterState.department}
        onChange={handleChange}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
        id="filter-department-select"
      >
        {/* Default option showing all departments */}
        <option value="all departments">All Departments</option>

        {/* Map through available departments */}
        {departmentList.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentFilter;
