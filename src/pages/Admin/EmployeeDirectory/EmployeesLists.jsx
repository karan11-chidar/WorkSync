import React from 'react'
import DesktopEmployeeTable from './DesktopEmployeeTable.jsx'   
import MobileEmployeeCards from './MobileEmployeeCards.jsx'
function EmployeesLists() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop */}

      <div className="hidden lg:block">
        <DesktopEmployeeTable />
      </div>

      {/* Mobile */}

      <div className="lg:hidden">
        <MobileEmployeeCards />
      </div>
    </div>
  );
}

export default EmployeesLists
