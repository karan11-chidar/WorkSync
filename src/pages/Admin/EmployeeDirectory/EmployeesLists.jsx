import React from 'react'
import DesktopEmployeeTable from './DesktopEmployeeTable.jsx'   
import MobileEmployeeCards from './MobileEmployeeCards.jsx'
function EmployeesLists(props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop */}

      <div className="hidden lg:block">
        <DesktopEmployeeTable handleEditEmployee={props.handleEditEmployee} handleSelectEmployee={props.handleSelectEmployee} />
      </div>

      {/* Mobile */}

      <div className="lg:hidden">
        <MobileEmployeeCards handleEditEmployee={props.handleEditEmployee} handleSelectEmployee={props.handleSelectEmployee} />
      </div>
    </div>
  );
}

export default EmployeesLists
