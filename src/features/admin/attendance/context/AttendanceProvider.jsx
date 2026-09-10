import React, { useState, useEffect, useMemo, useCallback } from "react";
import AttendanceContext from "./AttendanceContext";
import {
  getEmployeesForAttendanceService,
  getAttendanceByDateService,
  updateAttendanceRecordService,
} from "../services/attendanceService";
import { toastError } from "../../../../shared/services/toastService";
import formatTimeStamp from '../../../../shared/utils/formatTimeStamp'
/**
 * AttendanceProvider Component
 * Correctly matches employees with Firestore attendance logs by UID and date.
 */
export default function AttendanceProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editStatus, setEditStatus] = useState("COMPLETED");
  const [editCheckIn, setEditCheckIn] = useState("");
  const [editCheckOut, setEditCheckOut] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [empList, attList] = await Promise.all([
        getEmployeesForAttendanceService(),
        getAttendanceByDateService(selectedDate),
      ]);
      setEmployees(empList || []);
      setAttendanceRecords(attList || []);
    } catch (error) {
      toastError("Failed to load attendance data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Perfectly matches each employee with their date-specific attendance record using UID.
   */
  const combinedLog = useMemo(() => {
    return employees.map((emp) => {
      const empUid = emp.uid; // Firestore Document ID (UID) of the employee

      // Find attendance record matching by uid field or document ID structure ([uid]_[date])
      const existingRecord = attendanceRecords.find(
        (r) => r.id === `${empUid}_${selectedDate}`,
      );
      return {
        employee: {
          id: empUid,
          employeeIdTag: emp.employeeId || "EMP-000",
          firstName: emp.firstName || "Staff",
          lastName: emp.lastName || "",
          department: emp.department || "General",
          role: emp.role || "Employee",
          avatarColor: emp.avatarColor || "from-blue-500 to-cyan-500",
          avatarUrl: emp.avatarUrl || emp.photoURL || emp.avatar || null,
        },
        record: {
          status: existingRecord?.status || "ABSENT",
          checkInTime: formatTimeStamp(existingRecord?.checkIn)?.[1] || "-",
          checkOutTime: formatTimeStamp(existingRecord?.checkOut)?.[1] || "-",
          breaksCount: existingRecord?.breaks?.length || 0,
          totalBreakMinutes: existingRecord?.totalBreakMinutes || 0,
        },
      };
    });
  }, [employees, attendanceRecords, selectedDate]);

  const filteredLog = useMemo(() => {
    if (!searchTerm.trim()) return combinedLog;
    const term = searchTerm.toLowerCase();
    return combinedLog.filter(({ employee: emp }) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      return (
        fullName.includes(term) ||
        emp.employeeIdTag.toLowerCase().includes(term)
      );
    });
  }, [combinedLog, searchTerm]);

  const stats = useMemo(() => {
    const total = combinedLog.length;
    if (total === 0)
      return {
        rate: "0%",
        present: "0 Staff",
        late: "0 Staff",
        absent: "0 Staff",
        leave: "0 Staff",
      };

    let present = 0;
    let late = 0;
    let absent = 0;
    let leave = 0;

    combinedLog.forEach(({ record }) => {
      const st = String(record.status).toLowerCase();
      if (st === "completed" || st === "present" || st === "on time") present++;
      else if (st === "late") late++;
      else if (st === "on leave" || st === "leave") leave++;
      else absent++;
    });

    const activePresent = present + late;
    const rate = Math.round((activePresent / total) * 100) + "%";

    return {
      rate,
      present: `${present} Staff`,
      late: `${late} Staff`,
      absent: `${absent} Staff`,
      leave: `${leave} Staff`,
    };
  }, [combinedLog]);

  const startEditing = (emp) => {
    const current = combinedLog.find((item) => item.employee.id === emp.id);
    setEditingId(emp.id);
    setEditStatus(current?.record?.status || "COMPLETED");

    // 🕒 Helper to get current time in "HH:mm" 24-hour format for input type="time"
    const getCurrentTimeString = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    // Agar existing record me time hai toh wo dikhao, warna current live time set kar do
    const defaultTime = getCurrentTimeString();

    setEditCheckIn(
      current?.record?.checkInTime && current.record.checkInTime !== "-"
        ? current.record.checkInTime
        : defaultTime,
    );
    setEditCheckOut(
      current?.record?.checkOutTime && current.record.checkOutTime !== "-"
        ? current.record.checkOutTime
        : defaultTime,
    );
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveAttendance = async (empUid) => {
    try {
      const payload = {
        uid: empUid,
        date: selectedDate,
        status: editStatus,
        checkIn:
          editStatus === "ABSENT" || editStatus === "ON LEAVE"
            ? ""
            : editCheckIn,
        checkOut:
          editStatus === "ABSENT" || editStatus === "ON LEAVE"
            ? ""
            : editCheckOut,
      };

      await updateAttendanceRecordService(empUid, selectedDate, payload);
      setEditingId(null);
      await fetchData();
    } catch (error) {
      toastError("Failed to update attendance: " + error.message);
    }
  };

  const value = {
    combinedLog: filteredLog,
    isLoading,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    stats,
    editingId,
    editStatus,
    setEditStatus,
    editCheckIn,
    setEditCheckIn,
    editCheckOut,
    setEditCheckOut,
    startEditing,
    cancelEditing,
    saveAttendance,
    refreshAttendance: fetchData,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}
