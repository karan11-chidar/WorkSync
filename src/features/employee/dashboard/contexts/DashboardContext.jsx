import React from "react";
const DashboardContext = React.createContext()
DashboardContext.displayName = "DashboardContext"

const useDashboardContext = () => {
  const context = React.useContext(DashboardContext)

  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }

  return context;
};

export { useDashboardContext };
export default DashboardContext
