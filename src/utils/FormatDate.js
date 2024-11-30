/**
 * Formats a date string from YYYY-MM-DD to M.D.YYYY
 * @param {string} dateStr - The input date string in YYYY-MM-DD format
 * @returns {string} - The formatted date string in M.D.YYYY format
 */
export default function formatDate (dateStr) {
    const [year, month, day] = dateStr.split('-'); // Split the input string
    return `${parseInt(month)}.${parseInt(day)}.${year}`; // Remove leading zeros and format
};
