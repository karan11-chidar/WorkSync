/**
 * Converts a Firestore Timestamp or JavaScript Date
 * into a UI-friendly time string.
 *
 * @param {Object|Date|null} timestamp - Firestore Timestamp or Date.
 * @returns {string|null} Formatted time or null.
 */
 const formatTimeStamp = (timestamp) => {
  if (!timestamp) return null;

  const date =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : timestamp instanceof Date
        ? timestamp
        : null;

  if (!date) return null;

  return date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatTimeStamp;