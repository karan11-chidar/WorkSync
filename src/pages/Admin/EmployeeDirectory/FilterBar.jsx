import React from 'react'
import SearchBar from './SearchBar'
import DepartmentFilter from './DepartmentFilter'
import StatusFilter from './StatusFilter';
import Sorting from './Sorting';
function FilterBar() {
  return (
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <SearchBar />
          {/* filtersBar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2" >
              <DepartmentFilter />
              <StatusFilter/>
              <Sorting />
          </div>

        </div>
        
  );
}

export default FilterBar
