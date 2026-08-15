/**
 * Imports for DepartmentFilter Component
 *
 * - React: Core React library with hooks
 * - PropTypes: Runtime type checking for props
 */

import React from "react";

/**
 * Available departments list
 * Contains all department options that can be filtered
 *
 * @type {string[]}
 */
const availableDepts = [
  "HR",
  "Engineering",
  "Sales",
  "Marketing",
  "Finance",
  "Operations",
];

function DepartmentFilter({ filterState, setFilterState }) {
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
        {availableDepts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}



export default DepartmentFilter;
