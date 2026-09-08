import { createContext, useContext } from "react";

const LeaveContext = createContext(null);
LeaveContext.displayName = "LeaveContext";

export const useLeaveContext = () => {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error("useLeaveContext must be used within a LeaveProvider");
  }
  return context;
};

export default LeaveContext;
