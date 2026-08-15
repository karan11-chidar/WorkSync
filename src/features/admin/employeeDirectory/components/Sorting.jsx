/**
 * Imports for Sorting Component
 *
 * - React: Core React library with hooks
 * - PropTypes: Runtime type checking for props
 */

import React from "react";

/**
 * Sorting Component
 *
 * A dropdown filter for sorting employees by various criteria.
 * Provides options to sort by name, salary, and joining date in different orders.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.filterState - Current filter state object
 * @param {string} props.filterState.sortBy - Currently selected sort criteria
 * @param {Function} props.setFilterState - Function to update filter state
 * @returns {JSX.Element} A sort criteria select dropdown
 *
 * @example
 * <Sorting filterState={filterState} setFilterState={setFilterState} />
 */
function Sorting({ filterState, setFilterState }) {
  /**
   * Handle sort criteria selection change
   * Updates the filter state with selected sorting option
   *
   * @param {Event} e - Change event from select element
   */
  const handleSortChange = (e) => {
    setFilterState((prev) => ({
      ...prev,
      ["sortBy"]: e.target.value,
    }));
  };

  return (
    // Container with spacing between label and select
    <div className="space-y-1">
      {/* Sort label */}
      <label className="text-xs font-semibold text-slate-500">Sort By</label>

      {/* Sort criteria select dropdown */}
      <select
        value={filterState.sortBy}
        onChange={handleSortChange}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
      >
        {/* Name sorting options */}
        <option value="select order">Select order</option>
        <option value="name-az">Name (A to Z)</option>
        <option value="name-za">Name (Z to A)</option>

        {/* Salary sorting options */}
        <option value="salary-desc">Highest Salary</option>
        <option value="salary-asc">Lowest Salary</option>

        {/* Joining date sorting options */}
        <option value="date-joined-new">Newest Joiners</option>
        <option value="date-joined-old">Oldest Joiners</option>
      </select>
    </div>
  );
}




export default Sorting;
