/**
 * Capitalizes every word in a given string
 * @param {string} str - The string to capitalize
 * @returns {string} - The string with each word capitalized
 */
export default function capitalizeWords (str) {
    return str
        .split(' ') // Split the string into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
};
