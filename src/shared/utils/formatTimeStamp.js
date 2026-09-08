/**
 * Converts a Firestore Timestamp, JavaScript Date, ISO string, or Epoch millisecond
 * into a UI-friendly array containing formatted date and time.
 *
 * @param {Object|Date|string|number|null} timestamp - Firestore Timestamp, Date object, ISO string, or Epoch number.
 * @param {Object} [options] - Optional configurations.
 * @param {string} [options.locale="en-IN"] - Locale code for formatting (default: 'en-IN').
 * @param {string} [options.timeZone="Asia/Kolkata"] - Timezone string (default: 'Asia/Kolkata').
 * @returns {[string, string]|null} Returns Array [formattedDate, formattedTime] or null if invalid.
 */
const formatTimeStamp = (timestamp, options = {}) => {
  if (!timestamp) return null;

  const { locale = "en-IN", timeZone = "Asia/Kolkata" } = options;

  let date = null;

  // 1. Firestore Timestamp
  if (typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  }
  // 2. JavaScript Date Object
  else if (timestamp instanceof Date) {
    date = timestamp;
  }
  // 3. Number (Epoch milliseconds) ya String (ISO date string)
  else if (typeof timestamp === "number" || typeof timestamp === "string") {
    const parsedDate = new Date(timestamp);
    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate;
    }
  }

  // Check for Invalid Date
  if (!date || isNaN(date.getTime())) return null;

  // Format Date (e.g., "08 Sep 2026" ya "08/09/2026")
  const formattedDate = date.toLocaleDateString(locale, {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Format Time (e.g., "09:45 AM")
  const formattedTime = date.toLocaleTimeString(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return [formattedDate, formattedTime];
};

export default formatTimeStamp;
