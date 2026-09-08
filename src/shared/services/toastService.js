import { toast } from "sonner";

// 1. 🟢 Premium Success Toast
/**
 * Shows a success notification.
 *
 * @param {string} message - Primary notification message.
 * @param {string} [description=""] - Optional supporting text.
 * @returns {string|number} Toast identifier returned by Sonner.
 */
export const toastSuccess = (message, description = "") => {
  return toast.success(message, {
    description,
    style: {
      background: "#064E3B", // Emerald 900 Deep Rich
      color: "#ECFDF5", // Emerald 50
      border: "1px solid #059669", // Emerald 600
      borderRadius: "16px",
      padding: "12px 16px",
      boxShadow: "0 10px 25px -5px rgba(6, 78, 59, 0.3)",
      fontFamily: "sans-serif",
    },
    descriptionStyle: {
      color: "#A7F3D0", // Light Mint Green
    },
  });
};

// 2. 🔴 Premium Error Toast
/**
 * Shows an error notification.
 *
 * @param {string} message - Primary notification message.
 * @param {string} [description=""] - Optional supporting text.
 * @returns {string|number} Toast identifier returned by Sonner.
 */
export const toastError = (message, description = "") => {
  return toast.error(message, {
    description,
    style: {
      background: "#450A0A", // Rose/Red 950 Deep
      color: "#FEF2F2", // Red 50
      border: "1px solid #DC2626", // Red 600
      borderRadius: "16px",
      padding: "12px 16px",
      boxShadow: "0 10px 25px -5px rgba(69, 10, 10, 0.3)",
      fontFamily: "sans-serif",
    },
    descriptionStyle: {
      color: "#FECACA", // Soft Coral Pink
    },
  });
};

// 3. ⏳ Premium Loading Toast
/**
 * Shows a loading notification.
 *
 * @param {string} message - Loading message.
 * @returns {string|number} Toast identifier returned by Sonner.
 */
export const toastLoading = (message) => {
  return toast.loading(message, {
    style: {
      background: "#0F172A", // Slate 900
      color: "#F8FAFC", // Slate 50
      border: "1px solid #334155", // Slate 700
      borderRadius: "16px",
      padding: "12px 16px",
      boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
      fontFamily: "sans-serif",
    },
  });
};

// 4. 🔵 Premium Info / Alert Toast
/**
 * Shows an informational notification.
 *
 * @param {string} message - Primary notification message.
 * @param {string} [description=""] - Optional supporting text.
 * @returns {string|number} Toast identifier returned by Sonner.
 */
export const toastInfo = (message, description = "") => {
  return toast.info(message, {
    description,
    style: {
      background: "#1E1B4B", // Indigo 950
      color: "#EEF2FF", // Indigo 50
      border: "1px solid #4F46E5", // Indigo 600
      borderRadius: "16px",
      padding: "12px 16px",
      boxShadow: "0 10px 25px -5px rgba(30, 27, 75, 0.3)",
      fontFamily: "sans-serif",
    },
    descriptionStyle: {
      color: "#C7D2FE",
    },
  });
};

// 5. ⚡ Premium Promise Toast (For API Calls)
/**
 * Shows notifications for the lifecycle of an asynchronous operation.
 *
 * @param {Promise} promise - Operation represented by the toast.
 * @param {Object} messages - Loading, success, and error message configuration.
 * @param {string} messages.loading - Message shown while the operation runs.
 * @param {string|Function} messages.success - Success message or formatter.
 * @param {string|Function} messages.error - Error message or formatter.
 * @returns {string|number} Toast identifier returned by Sonner.
 */
export const toastPromise = (promise, { loading, success, error }) => {
  return toast.promise(promise, {
    loading: loading || "Processing...",
    success: (data) =>
      typeof success === "function" ? success(data) : success,
    error: (err) => (typeof error === "function" ? error(err) : error),
    style: {
      background: "#0F172A",
      color: "#F8FAFC",
      border: "1px solid #334155",
      borderRadius: "16px",
      padding: "12px 16px",
      boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
    },
  });
};
