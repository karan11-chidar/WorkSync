import { createContext, useContext } from "react";

/**
 * Admin Leave Management Context
 * Stores shared leave state, status filters, and action handlers.
 */
const AdminLeaveContext = createContext(null);
AdminLeaveContext.displayName = "AdminLeaveContext";

/**
 * Custom hook to easily consume AdminLeaveContext values.
 *
 * @returns {Object} Context value containing leaves, status filters, and action handlers.
 * @throws {Error} If used outside of AdminLeaveProvider.
 */
export const useAdminLeaveContext = () => {
  const context = useContext(AdminLeaveContext);
  if (!context) {
    throw new Error(
      "useAdminLeaveContext must be used within an AdminLeaveProvider",
    );
  }
  return context;
};

export default AdminLeaveContext;
