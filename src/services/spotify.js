// Import the Spotify Web API library to interact with Spotify's API
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

/**
 * Set the access token for the Spotify API Client
 * This token is required for authenticating API requests
 * @param {string} token - The access token obtained after user authentication
 */
export const setAccessToken = (token) => {
    spotifyApi.setAccessToken(token);
};

/**
 * Fetch the current user's top tracks from Spotify
 * These are the tracks the user has listened to most over a specified time range
 * @returns {Array} - An array of the user's top track objects, or an empty array if an error occurs
 */
export const getTopTracks = async (limit = 10) => {
    try {
        const response = await spotifyApi.getMyTopTracks({ limit });
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
export const getTopArtists = async (limit = 10) => {
    try {
        const response = await spotifyApi.getMyTopArtists({ limit });
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
export const getRecentlyPlayed = async (limit = 10) => {
    try {
        const response = await spotifyApi.getMyRecentlyPlayedTracks({ limit });
        return response.items;
    } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        return [];
    }
};

/**
 * Fetch detailed information about a specific artist from Spotify
 * @param {string} artistId - The Spotify ID of the artist
 * @returns {Object} - An object containing detailed information about the artist, or null if an error occurs
 */
export const getArtistDetails = async (artistId) => {
    try {
        return await spotifyApi.getArtist(artistId);
    } catch (error) {
        console.error(`Error fetching details for artist with ID ${artistId}:`, error);
        return null;
    }
};

/**
 * Fetch albums of a specific artist from Spotify, filtering only for LPs
 * @param {string} artistId - The Spotify ID of the artist
 * @param {number} limit - Number of albums to fetch per page (default: 20)
 * @returns {Array} - An array of album objects, or an empty array if an error occurs
 */
export const getArtistAlbums = async (artistId, limit = 20) => {
    try {
        const response = await spotifyApi.getArtistAlbums(artistId, {
            limit,
            include_groups: 'album', // Only include full-length albums (LPs)
        });
        return response.items;
    } catch (error) {
        console.error(`Error fetching albums for artist with ID ${artistId}:`, error);
        return [];
    }
};

/**
 * Fetch details information about a specific album from Spotify
 * @param albumId - The Spotify ID of the album
 * @returns {Object} - An object containing detailed information about the album, or null if an error occurs
 */
export const getAlbumDetails = async (albumId) => {
    try {
        return await spotifyApi.getAlbum(albumId);
    } catch (error) {
        console.error(`Error fetching albums for album with ID ${albumId}:`, error);
    }
}

export const getTrackDetails = async (trackId) => {
    try {
        return await spotifyApi.getTrack(trackId);
    } catch (error) {
        console.error(`Error fetching track for track with ID ${trackId}:`, error);
    }
}

