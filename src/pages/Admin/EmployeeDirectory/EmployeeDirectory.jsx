import React from 'react'
import FilterBar from './FilterBar'
import EmployeesLists from './EmployeesLists'
function EmployeeDirectory() {
  return (
      <div className='space-y-6'>
          <FilterBar/>
          <EmployeesLists/>
    </div>
  )
}

export default EmployeeDirectory
