import React from 'react'
import Header from './Header'
import LeftSection from './LeftSection'
import PremiumTeamColleagues from './PremiumTeamColleagues'

function DashBoard() {
  return (
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" >
        <LeftSection />
        <PremiumTeamColleagues/>
     </div>
    </div>
  )
}

export default DashBoard
