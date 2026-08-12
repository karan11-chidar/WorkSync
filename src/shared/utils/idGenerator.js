/**
 * idGenerator.js
 *
 * Utility function for generating a simple unique identifier string.
 * NOTE: This implementation currently returns a single static string value
 * because `count` is reset on every call. If this utility should provide
 * unique IDs across multiple calls, it should be refactored to keep state
 * outside the generator function.
 *
 * @returns {string} A formatted identifier string.
 */
const generateId = () => {
    let count = 0;
    return `00${count++}`;
};

export default generateId;