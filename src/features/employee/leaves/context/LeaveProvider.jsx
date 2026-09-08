import React, { useState, useEffect, useMemo, useCallback } from "react";
import LeaveContext from "./LeaveContext";
import {
  getEmployeeLeavesService,
  applyLeaveService,
  getCustomEmployeeIdService,
} from "../service/leaveService";
import { useAuth } from "../../../auth/context/AuthContext";
import { toastError } from "../../../../shared/services/toastService";

/**
 * LeaveProvider Component
 * Fetches dynamic Custom Employee ID from employeesList collection
 * and manages leave operations and statistics.
 *
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Wrapped children components.
 * @returns {JSX.Element} Provider layout.
 */
export const LeaveProvider = ({ children }) => {
  const { user } = useAuth();
  const authUid = user?.uid || "";
  const userEmail = user?.email || "";

  const [resolvedEmpId, setResolvedEmpId] = useState(user?.employeeId || "");
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const employeeName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Employee";

  /**
   * 1. Query employeesList collection to get exact custom Employee ID (e.g. "EMP-003")
   * 2. Fetch all leave records matching this ID or Auth UID
   */
  const fetchLeavesAndEmployeeData = useCallback(async () => {
    if (!authUid && !userEmail) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // employeesList collection se lookup karke exact custom ID nikalna
      let customEmpId = user?.employeeId || user?.empId;
      if (!customEmpId) {
        customEmpId = await getCustomEmployeeIdService(authUid, userEmail);
      }

      setResolvedEmpId(customEmpId || authUid);

      // Custom Employee ID aur Auth UID dono se leaves fetch karna
      const leaveData = await getEmployeeLeavesService(
        customEmpId || resolvedEmpId,
        authUid,
      );

      setLeaves(leaveData || []);
    } catch (error) {
      console.error("Failed to fetch leave data:", error);
      toastError("Failed to fetch leave history: " + error.message);
      setLeaves([]);
    } finally {
      setIsLoading(false);
    }
  }, [authUid, userEmail, user?.employeeId, user?.empId, resolvedEmpId]);

  useEffect(() => {
    fetchLeavesAndEmployeeData();
  }, [fetchLeavesAndEmployeeData]);

  /**
   * Calculates total days between two dates inclusive.
   */
  const calculateDays = (start, end) => {
    try {
      const d1 = new Date(start);
      const d2 = new Date(end);
      const timeDiff = d2.getTime() - d1.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      return daysDiff > 0 ? daysDiff : 1;
    } catch {
      return 1;
    }
  };

  /**
   * Submits a new leave request using the resolved custom Employee ID.
   */
  const applyLeave = async (formData) => {
    try {
      const totalDays = calculateDays(formData.startDate, formData.endDate);

      const payload = {
        employeeId: resolvedEmpId || authUid, // Saves exact Custom Employee ID (e.g., "EMP-003")
        employeeName,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: totalDays,
        reason: formData.reason,
      };

      await applyLeaveService(payload);
      await fetchLeavesAndEmployeeData(); // Refresh list after submission
    } catch (error) {
      toastError("Failed to submit leave request: " + error.message);
      throw error;
    }
  };

  /**
   * Computed Stats for Header Metric Cards
   */
  const stats = useMemo(() => {
    const totalApprovedDays = leaves
      .filter((l) => String(l.status).toLowerCase() === "approved")
      .reduce((sum, l) => sum + (Number(l.days) || 1), 0);

    const pendingCount = leaves.filter(
      (l) => String(l.status).toLowerCase() === "pending",
    ).length;

    const annualBalance = Math.max(0, 24 - totalApprovedDays);

    return {
      annualBalance: `${annualBalance} Days`,
      approvedDays: `${String(totalApprovedDays).padStart(2, "0")} Days`,
      pendingRequests: `${String(pendingCount).padStart(2, "0")} ${
        pendingCount === 1 ? "Request" : "Requests"
      }`,
    };
  }, [leaves]);

  const value = {
    leaves,
    isLoading,
    stats,
    resolvedEmpId,
    fetchLeaves: fetchLeavesAndEmployeeData,
    applyLeave,
  };

  return (
    <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
  );
};



export default LeaveProvider;
