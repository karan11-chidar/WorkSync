import React from 'react'
import { Filter } from "lucide-react";
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import EmployeeFilter from './EmployeeFilter';
import DateFilter from './DateFilter';
function FilterBar() {

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Filter className="h-4 w-4" /> Filter Options:
          </div>
            
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
              <StatusFilter />
              <PriorityFilter />
              <EmployeeFilter />
              <DateFilter/>
        </div>
    </div>
  );
}

export default FilterBar
