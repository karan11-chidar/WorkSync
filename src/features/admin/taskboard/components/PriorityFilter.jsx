/**
 * PriorityFilter Component
 *
 * A dropdown filter component for selecting task priorities.
 * Displays priority levels: All, Low, Medium, and High with visual indicators.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleChange - Callback function triggered when priority selection changes
 * @returns {JSX.Element} A select dropdown with priority filter options
 */
import React from "react";

/**
 * Renders the task priority filter.
 *
 * @param {Object} props - Filter props.
 * @param {Function} props.handleChange - Handles priority selection changes.
 * @returns {JSX.Element} The priority filter.
 */
function PriorityFilter({ handleChange }) {
  return (
    <div>
      <select
        name="priority-filter"
        onChange={handleChange}
        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
      >
        <option value="all">All Priorities</option>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
    </div>
  );
}

export default PriorityFilter;
