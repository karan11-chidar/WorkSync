import React, { useState } from "react";
import StateCards from "./StateCards";
import AttendanceCalendarHeader from "./AttendanceCalendarHeader";
import AttendanceCalendarGrid from "./AttendanceCalendarGrid";
import {
  Percent,
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  XCircle,
} from "lucide-react";

// --- 🛠️ HELPER FUNCTIONS (कैलेंडर के दिनों को सही ऑब्जेक्ट में बदलने के लिए) ---

// किसी भी तारीख को "DD/MM/YYYY" स्ट्रिंग फ़ॉर्मेट में बदलने के लिए
const getFormattedDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// चुने हुए महीने के हिसाब से पूरे 35 या 42 दिनों का ग्रिड डेटा तैयार करने के लिए
const generateCalendarDays = (currentMonth) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // महीने का पहला दिन और उसका हफ़्ते का इंडेक्स (0 = Sun, 1 = Mon...)
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  const days = [];

  // कैलेंडर ग्रिड को रविवार से शुरू करने के लिए पिछले महीने के बचे हुए दिन भरना
  const prevMonthDaysToShow = startDayOfWeek;
  for (let i = prevMonthDaysToShow; i > 0; i--) {
    const d = new Date(year, month, 1 - i);
    days.push({ dayNum: d.getDate(), date: d, isCurrentMonth: false });
  }

  // चालू महीने के सारे दिन भरना
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({ dayNum: i, date: d, isCurrentMonth: true });
  }

  // ग्रिड को पूरा 7 के मल्टीपल (जैसे 35 या 42) में सेट करने के लिए अगले महीने के शुरुआती दिन भरना
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ dayNum: d.getDate(), date: d, isCurrentMonth: false });
  }

  return days;
};

export default function EmployeeAttendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 5)); // July 2026

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 1. Static Dummy Records (UI टेस्टिंग के लिए)
  const attendanceRecords = [
    {
      employeeId: "EMP-001",
      date: "01/07/2026",
      status: "Present",
      checkInTime: "09:05 AM",
      checkOutTime: "06:00 PM",
    },
    {
      employeeId: "EMP-001",
      date: "02/07/2026",
      status: "Late",
      checkInTime: "09:45 AM",
      checkOutTime: "05:30 PM",
    },
    {
      employeeId: "EMP-001",
      date: "03/07/2026",
      status: "Absent",
      checkInTime: "",
      checkOutTime: "",
    },
  ];

  const leaveRequests = [
    {
      employeeId: "EMP-001",
      startDate: "08/07/2026",
      endDate: "10/07/2026",
      type: "Sick Leave",
      status: "Approved",
    },
  ];

  // 2. महीने के हिसाब से लाइव कैलेंडर ऑब्जेक्ट्स जनरेट करें
  const calendarDays = generateCalendarDays(currentMonth);
  const todayDateString = getFormattedDate(new Date(2026, 6, 5)); // आज की तारीख

  // 3. महीना बदलने वाले हैंडलर्स
  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const statsData = [
    {
      title: "Attendance Rate",
      value: "94.2%",
      subTitle: "Weekdays in month",
      icon: Percent,
      theme: "emerald",
    },
    {
      title: "Days Present",
      value: "18 / 20",
      subTitle: "Clocked in on-time",
      icon: CheckCircle,
      theme: "indigo",
    },
    {
      title: "Late Arrivals",
      value: "02 Days",
      subTitle: "Logged after 09:00 AM",
      icon: AlertTriangle,
      theme: "amber",
    },
    {
      title: "Approved Leave",
      value: "01 Day",
      subTitle: "Paid / medical leaves",
      icon: CalendarDays,
      theme: "sky",
    },
    {
      title: "Missed Weekdays",
      value: "00 Days",
      subTitle: "Unlogged / No record",
      icon: XCircle,
      theme: "rose",
    },
  ];

  return (
    <div className="w-full space-y-6 p-1">
      {/* Responsive Grid Matrix Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {statsData.map((stat, idx) => (
          <StateCards
            key={idx}
            title={stat.title}
            value={stat.value}
            subTitle={stat.subTitle}
            icon={stat.icon}
            colorTheme={stat.theme}
          />
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* 1. Header Component Controls */}
        <AttendanceCalendarHeader
          currentMonth={currentMonth}
          monthNames={monthNames}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          onResetToday={() => setCurrentMonth(new Date(2026, 6, 5))}
        />

        {/* 2. Grid Day Grid Canvas */}
        <AttendanceCalendarGrid
          calendarDays={calendarDays}
          attendanceRecords={attendanceRecords}
          leaveRequests={leaveRequests}
          employeeId="EMP-001"
          todayDateString={todayDateString}
          getFormattedDate={getFormattedDate}
        />
      </div>
    </div>
  );
}
