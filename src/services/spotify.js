// Import the Spotify Web API library to interact with Spotify's API
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

/**
 * Set the access token for the Spotify API Client
 * This token is required for authenticating API requests
 * @param {string} token - The access token obtained after user authentication
 */
export const setAccessToken = (token) => {
    console.log('Setting access token:', token);
    spotifyApi.setAccessToken(token);
};

/**
 * Fetch the current user's top tracks from Spotify
 * These are the tracks the user has listened to most over a specified time range
 * @returns {Array} - An array of the user's top track objects, or an empty array if an error occurs
 */
export const getTopTracks = async () => {
    try {
        const response = await spotifyApi.getMyTopTracks();
        return response.items;
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return [];
    }
};

/**
 * Fetch the current user's top artists from Spotify
 * These are the artists the user listens to most frequently
 * @returns {Array} - An array of the user's top artist objects, or an empty array if an error occurs
 */
export const getTopArtists = async () => {
    try {
        const response = await spotifyApi.getMyTopArtists();
        return response.items;
    } catch (error) {
        console.error("Error fetching top artists:", error);
        return [];
    }
};

/** Fetch the current user's recently played tracks from Spotify
 * These are the tracks the user has recently listened to
 * @returns {Array} - An array f the user's recently played track objects, or an empty array if an error occurs
 */
export const getRecentlyPlayed = async () => {
    try {
        const response = await spotifyApi.getMyRecentlyPlayedTracks();
        return response.items;
    } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        return [];
    }
};
