/**
 * Imports for StatusFilter Component
 *
 * - React: Core React library with hooks
 * - PropTypes: Runtime type checking for props
 */

import React from "react";

/**
 * StatusFilter Component
 *
 * A dropdown filter for selecting employee employment status.
 * Allows users to filter employees by their current employment status
 * (Active, On Leave, Suspended, Terminated) or view all statuses.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.filterState - Current filter state object
 * @param {string} props.filterState.status - Currently selected employment status
 * @param {Function} props.setFilterState - Function to update filter state
 * @returns {JSX.Element} An employment status filter select dropdown
 *
 * @example
 * <StatusFilter filterState={filterState} setFilterState={setFilterState} />
 */
function StatusFilter({ filterState, setFilterState }) {
  /**
   * Handle employment status selection change
   * Updates the filter state with selected employment status
   *
   * @param {Event} e - Change event from select element
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setFilterState((prev) => ({ ...prev, ["status"]: value }));
  };

  return (
    // Container with spacing between label and select
    <div className="space-y-1">
      {/* Filter label */}
      <label className="text-xs font-semibold text-slate-500">
        Employment Status
      </label>

      {/* Employment status select dropdown */}
      <select
        value={filterState.status}
        onChange={handleChange}
        className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600"
        id="filter-status-select"
      >
        {/* Default option showing all statuses */}
        <option value="all status">All Statuses</option>
        {/* Employment status options */}
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Suspended">Suspended</option>
        <option value="Terminated">Terminated</option>
      </select>
    </div>
  );
}
export default StatusFilter

