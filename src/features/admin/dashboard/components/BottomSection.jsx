import React from 'react'
import RecentHire from './RecentOnBoardings'
import LeaveApprovalList from './LeaveApprovalList';

/**
 * Renders the lower content section of the administrator dashboard.
 *
 * @returns {JSX.Element} The dashboard bottom section.
 */
function BottomSection() {
  return (
    <div  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentHire />
          <LeaveApprovalList/>
    </div>
  );
}

export default BottomSection
