import { createContext, useContext } from "react";

/**
 * React context for sharing dashboard state and actions.
 *
 * @type {import("react").Context<Object|null>}
 */
const DashboardContext = createContext(null);
DashboardContext.displayName = "DashboardContext";

/**
 * Returns the dashboard context value for the nearest DashboardProvider.
 *
 * @returns {Object} Dashboard context value.
 * @throws {Error} If called outside a DashboardProvider.
 */
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
};

export default DashboardContext;
