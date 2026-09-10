import React, { useState, useEffect, useMemo, useCallback } from "react";
import AdminLeaveContext from "./AdminLeaveContext";
import {
  getAllLeavesService,
  updateLeaveStatusService,
  adminCreateLeaveService,
  getEmployeesListService,
} from "../service/adminLeaveService";
import { toastError } from "../../../../shared/services/toastService";

/**
 * AdminLeaveProvider Component
 * Supplies all employee leave applications, filter mechanisms, and admin actions.
 *
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Wrapped child components.
 * @returns {JSX.Element} Provider wrapper element.
 */
export function AdminLeaveProvider({ children }) {
  const [leaves, setLeaves] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  /**
   * Fetches all leaves and active employee records from Firestore.
   */
  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [leavesData, empData] = await Promise.all([
        getAllLeavesService(),
        getEmployeesListService(),
      ]);
      setLeaves(leavesData || []);
      setEmployeeList(empData || []);
    } catch (error) {
      toastError("Error loading leave management data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  /**
   * Updates leave status ("Approved" or "Rejected") in Firestore and local state.
   *
   * @param {string} leaveId - Firestore Document ID.
   * @param {string} newStatus - Target status ("Approved" / "Rejected").
   */
 const updateLeaveStatus = async (leaveId, newStatus, rejectReason = "") => {
   try {
     await updateLeaveStatusService(leaveId, newStatus, rejectReason);
     setLeaves((prev) =>
       prev.map((item) =>
         item.id === leaveId
           ? {
               ...item,
               status: newStatus,
               rejectReason: newStatus === "Rejected" ? rejectReason : null,
             }
           : item,
       ),
     );
   } catch (error) {
     toastError("Failed to update status: " + error.message);
   }
 };
  /**
   * Files a new time-off request on behalf of an employee.
   *
   * @param {Object} formData - Form payload containing employeeId, dates, leaveType, and reason.
   */
  const fileLeaveForEmployee = async (formData) => {
    try {
      setIsLoading(true);

      // Total days calculation
      const d1 = new Date(formData.startDate);
      const d2 = new Date(formData.endDate);
      const days = Math.max(
        1,
        Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1,
      );

      // Match employee from employeeList for full name and custom ID
      const matchedEmp = employeeList.find(
        (e) =>
          e.employeeId === formData.employeeId || e.id === formData.employeeId,
      );

      const payload = {
        employeeId: matchedEmp?.employeeId || formData.employeeId,
        employeeName: matchedEmp
          ? `${matchedEmp.firstName || ""} ${matchedEmp.lastName || ""}`.trim()
          : "Employee",
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason,
      };

      await adminCreateLeaveService(payload);
      await fetchInitialData();
    } catch (error) {
      toastError("Failed to submit time-off request: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Aggregated counts for tab headers
   */
  const counts = useMemo(() => {
    const total = leaves.length;
    const pending = leaves.filter(
      (l) => String(l.status).toLowerCase() === "pending",
    ).length;
    const approved = leaves.filter(
      (l) => String(l.status).toLowerCase() === "approved",
    ).length;
    const rejected = leaves.filter(
      (l) => String(l.status).toLowerCase() === "rejected",
    ).length;

    return {
      All: total,
      Pending: pending,
      Approved: approved,
      Rejected: rejected,
    };
  }, [leaves]);

  /**
   * Filtered leave items according to active header tab
   */
  const filteredLeaves = useMemo(() => {
    if (filterStatus === "All") return leaves;
    return leaves.filter(
      (l) => String(l.status).toLowerCase() === filterStatus.toLowerCase(),
    );
  }, [leaves, filterStatus]);

  const value = {
    leaves: filteredLeaves,
    rawLeaves: leaves,
    employeeList,
    isLoading,
    filterStatus,
    setFilterStatus,
    counts,
    updateLeaveStatus,
    fileLeaveForEmployee,
    refreshLeaves: fetchInitialData,
  };

  return (
    <AdminLeaveContext.Provider value={value}>
      {children}
    </AdminLeaveContext.Provider>
  );
}

export default AdminLeaveProvider;
