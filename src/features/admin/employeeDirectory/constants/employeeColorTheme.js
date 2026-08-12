/**
 * Employee color themes used across the admin employee directory.
 * Each entry is a Tailwind CSS gradient class pair used to render
 * a vibrant background for employee avatars or cards.
 */
const EMPLOYEE_COLOR_THEMES = [
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-purple-500",
  "from-violet-500 to-fuchsia-500",
  "from-purple-500 to-pink-500",
  "from-pink-500 to-rose-500",
  "from-red-500 to-orange-500",
  "from-orange-500 to-amber-500",
  "from-amber-500 to-yellow-500",
  "from-yellow-500 to-lime-500",
  "from-lime-500 to-green-500",
  "from-green-500 to-emerald-500",
  "from-emerald-500 to-teal-500",
  "from-teal-500 to-cyan-500",
  "from-sky-500 to-blue-500",
  "from-cyan-500 to-sky-500",
  "from-indigo-500 to-blue-500",
  "from-purple-500 to-indigo-500",
  "from-fuchsia-500 to-purple-500",
  "from-rose-500 to-orange-500",
  "from-teal-500 to-green-500",
];

/**
 * Returns a random color theme from the employee palette.
 * @returns {string} A Tailwind gradient class string.
 */
const getRandomColor = () => {
  return EMPLOYEE_COLOR_THEMES[
    Math.floor(Math.random() * EMPLOYEE_COLOR_THEMES.length)
  ];
};

export default getRandomColor;
