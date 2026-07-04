import React from 'react'
import AttendanceCountCards from './AttendanceCountCards';
import AttendanceCardsTable from './AttendanceCardsTable';

function TodayAttendance() {
    return (
      <div className='space-y-6'>
        <AttendanceCountCards />
        <AttendanceCardsTable/>
      </div>
    );
}

export default TodayAttendance
