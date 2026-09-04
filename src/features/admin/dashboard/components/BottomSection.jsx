import React from 'react'
import RecentHire from './RecentOnBoardings'
import LeaveApprovalList from './LeaveApprovalList';

function BottomSection() {
  return (
    <div  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentHire />
          <LeaveApprovalList/>
    </div>
  );
}

export default BottomSection
