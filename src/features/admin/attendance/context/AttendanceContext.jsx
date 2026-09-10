import { createContext, useContext } from "react";

const AttendanceContext = createContext(null);
AttendanceContext.displayName = "AttendanceContext";

export const useAttendanceContext = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error(
      "useAttendanceContext must be used within an AttendanceProvider",
    );
  }
  return context;
};

export default AttendanceContext;
