/**
 * Color palette for task card avatars in the admin task dashboard.
 *
 * Contains 20 vibrant Tailwind CSS gradient combinations used to render
 * visually distinct avatars for different employees assigned to task cards.
 * Each gradient is a combination of two complementary Tailwind color stops
 * (e.g., 'from-blue-500 to-cyan-500') that work with the Tailwind gradient
 * class system (via `bg-gradient-to-br`).
 *
 * These colors ensure visual variety across the task board while maintaining
 * a professional and cohesive design aesthetic.
 *
 * @constant {Array<string>}
 */
const TASK_CARD_COLOR = [
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
 * Selects a random gradient color from the task card avatar palette.
 *
 * Randomly picks one of the 20 available gradient combinations to ensure
 * that each employee avatar assigned to a task card displays a unique and
 * visually distinct color. Useful for dynamically assigning colors during
 * task rendering without hardcoding assignments.
 *
 * @function
 * @returns {string} A random Tailwind CSS gradient class pair (e.g., 'from-blue-500 to-cyan-500')
 *   ready to be used with the `bg-gradient-to-br` Tailwind class.
 */
const getRandomColor = () => {
  return TASK_CARD_COLOR[Math.floor(Math.random() * TASK_CARD_COLOR.length)];
};

export default getRandomColor;
