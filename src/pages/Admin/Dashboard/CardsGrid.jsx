import React from 'react'
import StateCard from './StateCard';
import { TrendingUp, Users, Clock, CalendarClock,IndianRupee,Wallet,CheckCircle2,AlertCircle } from "lucide-react";
function CardsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      <StateCard
        cardIcon={Users}
        cardMiniIcon={TrendingUp}
        title="Total Staff"
        subTitle="Active"
        bgColor="bg-emerald-50"
        textColor="text-emerald-600"
        
      />
      <StateCard
        cardIcon={IndianRupee}
        cardMiniIcon={Wallet}
        title="Avg. Salary"
        subTitle="Annual Payroll"
        bgColor="bg-sky-50"
        textColor="text-sky-600"
       
      />
      <StateCard
        cardIcon={Clock}
        cardMiniIcon={CheckCircle2}
        title="Attendance"
        subTitle="Today's Presence"
        bgColor="bg-indigo-50"
        textColor="text-indigo-600"
        
      />
      <StateCard
        cardIcon={CalendarClock}
        cardMiniIcon={AlertCircle}
        title="Pending Leaves"
        subTitle="Needs Approval"
        bgColor="bg-amber-50"
        textColor="text-amber-600"
        
      />
    </div>
  );
}

export default CardsGrid

