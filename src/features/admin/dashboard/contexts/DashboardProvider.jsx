import React, { useState, useEffect, useCallback, useMemo } from "react";
import DashboardContext from "./DashboardContext";
import {
  fetchDashboardEmployeesService,
  fetchDashboardAttendanceService,
  fetchDashboardPendingLeavesService,
  fetchDashboardDepartmentService,
} from "../services/dashboardService";
import { toastError } from "../../../../shared/services/toastService";

/**
 * Provides dashboard data, calculated metrics, and refresh actions to descendants.
 *
 * @param {{children: React.ReactNode}} props - Provider props.
 * @returns {JSX.Element} Dashboard context provider element.
 */
export function DashboardProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const [departmentRecords, setDepartmentRecords] = useState([]);
  /**
   * Returns today's date in YYYY-MM-DD format.
   *
   * @returns {string} Formatted current date.
   */
  const getTodayString = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  /**
   * Loads the employee, attendance, and pending leave data for the dashboard.
   *
   * @returns {Promise<void>} Promise resolved after dashboard data is loaded.
   */
  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const todayStr = getTodayString();

        const [empList, attList, leaveList,department] = await Promise.all([
            fetchDashboardEmployeesService(),
            fetchDashboardAttendanceService(todayStr),
            fetchDashboardPendingLeavesService(),
            fetchDashboardDepartmentService(),
      ]); 
      setEmployees(empList || []);
      setAttendanceRecords(attList || []);
        setPendingLeaves(leaveList || []);
        setDepartmentRecords(department || []);
    
    } catch (error) {
      toastError("Failed to load dashboard metrics: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  /**
   * 1. Cards Grid Metrics Calculations
   */
  const metrics = useMemo(() => {
    const totalStaff = employees.length;

    // Calculate Average Salary
    let totalSalary = 0;
    employees.forEach((emp) => {
      const sal = Number(emp.salary) || Number(emp.annualSalary) || 450000;
      totalSalary += sal;
    });
    const avgSalaryNum =
      totalStaff > 0 ? Math.round(totalSalary / totalStaff) : 0;
    const avgSalaryFormatted = `₹${(avgSalaryNum / 100000).toFixed(1)}L`;

    // Today's Attendance Presence Count
    let presentCount = 0;
    attendanceRecords.forEach((rec) => {
      const st = String(rec.status || "").toLowerCase();
      if (st === "completed" || st === "present" || st === "clock_in") {
        presentCount++;
      }
    });
    const attendanceStat =
      totalStaff > 0
        ? `${Math.round((presentCount / totalStaff) * 100)}% Today`
        : "0% Today";

    // Pending Leaves Count
    const pendingCount = `${pendingLeaves.length} Requests`;

    return {
      totalStaff: `${totalStaff} Active`,
      avgSalary: avgSalaryFormatted,
      attendance: attendanceStat,
      pendingLeaves: pendingCount,
    };
  }, [employees, attendanceRecords, pendingLeaves]);

  /**
   * 2. Department Headcounts Calculation for Bar Chart
   */
  const departmentHeadcounts = useMemo(() => {
    const deptMap = {};
    employees.forEach((emp) => {
      const dept = emp.department || "General";
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });

    const colors = [
      "bg-emerald-500",
      "bg-rose-500",
      "bg-amber-500",
      "bg-sky-500",
      "bg-indigo-500",
    ];
    let i = 0;

    return Object.keys(deptMap).map((name) => {
      const color = colors[i % colors.length];
      i++;
      return { name, count: deptMap[name], color };
    });
  }, [employees]);

  /**
   * 3. Recent Hires Processing
   */
  const recentHires = useMemo(() => {
    return [...employees]
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 6)
      .map((emp) => {
        const rawName =
          `${emp.firstName || "Staff"} ${emp.lastName || ""}`.trim();
        const initials = rawName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase();

        const formatDateJoined = (ts) => {
          if (!ts) return "Recently";
          try {
            const d = ts.toDate ? ts.toDate() : new Date(ts);
            return d.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
          } catch {
            return "Recently";
          }
        };

        return {
          id: emp.id,
          firstName: emp.firstName || "Staff",
          lastName: emp.lastName || "",
          role: emp.role || "Employee",
          department: emp.department || "General",
          dateJoined: formatDateJoined(emp.createdAt || emp.joiningDate),
          avatarColor: emp.avatarColor || "from-blue-500 to-cyan-500",
          avatarUrl: emp.avatarUrl || emp.photoURL || null,
        };
      });
  }, [employees]);

  const value = {
    isLoading,
    metrics,
    departmentHeadcounts,
    recentHires,
      pendingLeaves,
      departmentRecords,
    
    refreshDashboard: loadDashboardData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
export default DashboardProvider;
