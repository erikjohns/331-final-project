/**
 * Converts milliseconds to HH:MM:SS format
 * @param {number} ms - The duration in milliseconds
 * @returns {string} - The formatted time in HH:MM:SS or MM:SS format
 */
export default function ConvertMilliseconds(ms) {
    const hours = Math.floor(ms / 3600000); // Get the total hours
    const minutes = Math.floor((ms % 3600000) / 60000); // Get the remaining minutes
    const seconds = Math.floor((ms % 60000) / 1000); // Get the remaining seconds

    if (hours > 0) {
        // Include hours if total time exceeds an hour
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }

    // Default to MM:SS if under an hour
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
