/**
 * Imports for SearchBar Component
 *
 * - React: Core React library for component functionality
 * - lucide-react: Icon library providing Search, NotebookPen, and UserPlus icons
 */

import React from "react";
import { NotebookPen, Search, UserPlus } from "lucide-react";
/**
 * SearchBar Component
 *
 * A search and action bar component for the employee directory.
 * Provides a search input field with icon and an "Add Employee" button.
 * Allows users to search employees by name, role, email, or ID,
 * and provides quick access to add new employees.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleAddEmployee - Callback function to handle adding a new employee
 * @param {Function} props.setFilterState - Function to update the filter state with search terms
 * @returns {JSX.Element} A search bar with input field and action button
 *
 * @example
 * <SearchBar
 *   handleAddEmployee={handleNewEmployee}
 *   setFilterState={setFilterState}
 * />
 */
function SearchBar({ handleAddEmployee, setFilterState, filterState }) {
  /**
   * Search input state
   * Tracks the current search term entered by the user
   *
   * @type {[string, Function]}
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setFilterState((prev) => ({ ...prev, ["search"]: value }));
  };
  return (
    // Main container with responsive flex layout
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Search input section with icon */}
      <div className="relative flex-1">
        {/* Search icon positioned absolutely inside input */}
        <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by name, role, email or ID..."
          value={filterState.search}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all font-sans"
        />
      </div>

      {/* Action buttons section */}
      <div className="flex gap-2 flex-wrap">
        {/* Add Employee button */}
        <button
          onClick={() => {
            handleAddEmployee();
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
        >
          {/* UserPlus icon with label */}
          <UserPlus className="h-4 w-4" /> Add Employee
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
