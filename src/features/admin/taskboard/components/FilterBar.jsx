// External dependencies
import { Filter } from "lucide-react"; // Icon component for filter display

// Local filter components
import StatusFilter from "./StatusFilter"; // Filter component for task status
import PriorityFilter from "./PriorityFilter"; // Filter component for task priority
import EmployeeFilter from "./EmployeeFilter"; // Filter component for employee selection
import DateFilter from "./DateFilter"; // Filter component for date range selection
import { useTaskBoard } from "../contexts/TaskBoardContext"; // Custom hook to access taskboard context
/**
 * FilterBar Component
 *
 * A composite filter component that combines multiple filter options for taskboard filtering.
 * Includes filters for status, priority, employee, and date.
 *
 * @component
 * @returns {JSX.Element} A filter bar containing status, priority, employee, and date filter components
 */
function FilterBar() {
  const {setFilterState} = useTaskBoard(); // Custom hook to access taskboard context
  /**
   * Handles filter change events from child filter components
   *
   * @function handleFilterChange
   * @param {Event} e - The change event from a filter component
   * @param {string} e.target.name - The name attribute of the changed filter
   * @param {string} e.target.value - The selected value from the filter
   * @returns {void}
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({ ...prev, [name]: value })); // Update filter state in context
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Filter className="h-4 w-4" /> Filter Options:
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
        <StatusFilter handleChange={handleFilterChange}  />
        <PriorityFilter handleChange={handleFilterChange} />
        <EmployeeFilter handleChange={handleFilterChange} />
        <DateFilter handleChange={handleFilterChange}  />
      </div>
    </div>
  );
}

export default FilterBar;
