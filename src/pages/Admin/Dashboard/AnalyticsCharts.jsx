import React from 'react'
import DepartmentBarChart from './DepartmentBarChart';
import BudgetAllocation from './BudgetAllocation';
function AnalyticsCharts() {
  return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <div className="xl:col-span-2">
        <DepartmentBarChart />
      </div>

      <div className="xl:col-span-1">
        <BudgetAllocation />
      </div>

    </div>
  );
}

export default AnalyticsCharts
