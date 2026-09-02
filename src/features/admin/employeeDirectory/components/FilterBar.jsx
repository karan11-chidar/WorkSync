
/**
 * Imports for FilterBar Component
 * 
 * - React: Core React library and hooks (useState)
 * - PropTypes: Runtime type checking for component props
 * - SearchBar: Sub-component for searching employees by name/ID
 * - DepartmentFilter: Sub-component for filtering by department
 * - StatusFilter: Sub-component for filtering by employee status
 * - Sorting: Sub-component for sorting employees by various criteria
 */
import SearchBar from "./SearchBar";
import DepartmentFilter from "./DepartmentFilter";
import StatusFilter from "./StatusFilter";
import Sorting from "./Sorting";
import { useEmployee } from "../context/EmployeeContext";
/**
 * FilterBar Component
 *
 * A comprehensive filter and search bar for the employee directory.
 * Allows users to filter employees by department, status, and sort order,
 * as well as search for specific employees by name.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleAddEmployee - Callback function to handle adding new employees
 * @returns {JSX.Element} A filtered search and filter bar component with multiple filtering options
 *
 * @example
 * <FilterBar handleAddEmployee={handleAddNewEmployee} />
 */
function FilterBar({ handleAddEmployee }) {
  const {filterState,setFilterState } = useEmployee();
  
 
  return (
    // Main filter bar container with white background and shadow styling
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
      {/* Search bar section for searching employees by name or ID */}
      <SearchBar
        handleAddEmployee={handleAddEmployee}
        setFilterState={setFilterState}
        filterState={filterState}
      />

      {/* Filter controls section - responsive grid layout */}
      {/* Displays department, status, and sorting filters on 1 column (mobile) to 3 columns (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* Department filter dropdown */}
        <DepartmentFilter
          setFilterState={setFilterState}
          filterState={filterState}
        />

        {/* Employee status filter dropdown (active, inactive, etc.) */}
        <StatusFilter
          setFilterState={setFilterState}
          filterState={filterState}
        />

        {/* Sorting options (by name, date, etc.) */}
        <Sorting setFilterState={setFilterState}
          filterState={filterState} />
      </div>
    </div>
  );
}

export default FilterBar;