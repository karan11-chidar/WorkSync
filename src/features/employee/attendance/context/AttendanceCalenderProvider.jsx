import React, { useState, useEffect, useMemo, useCallback } from "react";
import AttendanceCalenderContext from "../context/AttendanceCalenderContext";
import { getEmployeeAttendanceService } from "../service/attendanceCalender";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  Percent,
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  XCircle,
} from "lucide-react";

/**
 * Date object ko Firestore-compatible format "YYYY-MM-DD" string me convert karta hai.
 *
 * @param {Date} date - JS Date Object.
 * @returns {string} Formatted date string (e.g., "2026-09-05").
 */
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Firestore Timestamp ya Date String se 12-hour format time string ("11:25 PM") extract karta hai.
 *
 * @param {Object|string|number} timeStampField - Firestore Timestamp, seconds object, ya Date string.
 * @returns {string} Formatted time string (e.g., "09:05 AM").
 */
const formatTimeFromStamp = (timeStampField) => {
  if (!timeStampField) return "";
  try {
    let dateObj;
    if (typeof timeStampField.toDate === "function") {
      dateObj = timeStampField.toDate();
    } else if (timeStampField.seconds) {
      dateObj = new Date(timeStampField.seconds * 1000);
    } else {
      dateObj = new Date(timeStampField);
    }

    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
};

/**
 * Selected month ke liye calendar grid days objects ki array generate karta hai.
 *
 * @param {Date} currentMonth - Currently selected active month Date object.
 * @returns {Array<{dayNum: number, date: Date, isCurrentMonth: boolean}>} Calendar grid cells array.
 */
const generateCalendarDays = (currentMonth) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  const days = [];

  // Purane mahine ke trailing days fill karna
  for (let i = startDayOfWeek; i > 0; i--) {
    const d = new Date(year, month, 1 - i);
    days.push({ dayNum: d.getDate(), date: d, isCurrentMonth: false });
  }

  // Current active month ke saare din
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({ dayNum: i, date: d, isCurrentMonth: true });
  }

  // Agle mahine ke leading days fill karna (Grid grid 7-column layout maintain karne ke liye)
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ dayNum: d.getDate(), date: d, isCurrentMonth: false });
  }

  return days;
};

/**
 * Attendance Calender Context Provider Component.
 * Employee ki attendance fetch karke pure calendar system ko state aur helper functions provide karta hai.
 *
 * @component
 * @param {Object} props - React props object.
 * @param {React.ReactNode} props.children - Context wrapper ke under aane wale child components.
 * @returns {JSX.Element} AttendanceCalenderContext.Provider Element.
 */
export const AttendanceCalenderProvider = ({ children }) => {
  const { user } = useAuth();
  const employeeId = user?.uid || user?.employeeId || "";

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Month names list for header rendering.
   * @type {string[]}
   */
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

  /**
   * Logged-in employee ki attendance Firebase Firestore se fetch karne ka function.
   */
  const fetchEmployeeAttendance = useCallback(async () => {
    if (!employeeId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = await getEmployeeAttendanceService(employeeId);
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setAttendanceRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEmployeeAttendance();
  }, [fetchEmployeeAttendance]);

  /**
   * Calendar ko pichle mahine par switch karta hai.
   */
  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  /**
   * Calendar ko agle mahine par switch karta hai.
   */
  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  /**
   * Calendar view ko aaj ke current month par reset karta hai.
   */
  const handleResetToday = () => {
    setCurrentMonth(new Date());
  };

  /**
   * Current active month ke hisab se generate kiye gaye calendar grid days.
   */
  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth),
    [currentMonth],
  );

  /**
   * Summary Cards Stats Data Calculation.
   * Simple logic: Day 1 se lekar Aaj tak (Elapsed Days) me record hai toh Present/Late, nahi hai toh Absent.
   */
  const statsData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;

    // Current month ke wahi din jo Aaj ya Aaj se pehle hain
    const activeElapsedDays = calendarDays.filter(
      (d) => d.isCurrentMonth && d.date <= today,
    );

    activeElapsedDays.forEach((dayObj) => {
      const dateStr = getFormattedDate(dayObj.date);
      const record = attendanceRecords.find((a) => a.date === dateStr);

      if (record) {
        const st = String(record.status || "").toUpperCase();

        if (st === "COMPLETED" || st === "PRESENT" || st === "ON TIME") {
          presentCount++;
        } else if (st === "LATE") {
          lateCount++;
        } else {
          absentCount++;
        }
      } else {
        // Clock-in record nahi mila -> Direct Absent
        absentCount++;
      }
    });

    const totalPresent = presentCount + lateCount;
    const totalDaysTillToday = activeElapsedDays.length;

    // Percentage Attendance Rate
    const rate =
      totalDaysTillToday > 0
        ? ((totalPresent / totalDaysTillToday) * 100).toFixed(1)
        : "0.0";

    return [
      {
        title: "Attendance Rate",
        value: `${rate}%`,
        subTitle: "Based on days till today",
        icon: Percent,
        theme: "emerald",
      },
      {
        title: "Days Present",
        value: `${totalPresent} / ${totalDaysTillToday}`,
        subTitle: "Clocked in days",
        icon: CheckCircle,
        theme: "indigo",
      },
      {
        title: "Late Arrivals",
        value: `${String(lateCount).padStart(2, "0")} Days`,
        subTitle: "Clocked in late",
        icon: AlertTriangle,
        theme: "amber",
      },
      {
        title: "Absent Days",
        value: `${String(absentCount).padStart(2, "0")} Days`,
        subTitle: "No clock-in record",
        icon: CalendarDays,
        theme: "sky",
      },
      {
        title: "Total Days Elapsed",
        value: `${String(totalDaysTillToday).padStart(2, "0")} Days`,
        subTitle: "Days passed in month",
        icon: XCircle,
        theme: "rose",
      },
    ];
  }, [attendanceRecords, calendarDays]);

  /**
   * Context Consumer Components ke liye centralized value object.
   */
  const value = {
    isLoading,
    attendanceRecords,
    currentMonth,
    calendarDays,
    statsData,
    employeeId,
    monthNames,
    handlePrevMonth,
    handleNextMonth,
    handleResetToday,
    fetchEmployeeAttendance,
    getFormattedDate,
    formatTimeFromStamp,
  };

  return (
    <AttendanceCalenderContext.Provider value={value}>
      {children}
    </AttendanceCalenderContext.Provider>
  );
};
export default AttendanceCalenderProvider;
