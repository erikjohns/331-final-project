import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const setAccessToken = (token) => {
    console.log('Setting access token:', token);
    spotifyApi.setAccessToken(token);
};

// src/services/spotify.js
export const getTopTracks = async () => {
    try {
        const response = await spotifyApi.getMyTopTracks();
        console.log("Top Tracks:", response.items); // Add this line
        return response.items;
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return [];
    }
};

export const getTopArtists = async () => {
    try {
        const response = await spotifyApi.getMyTopArtists();
        console.log("Top Artists:", response.items); // Add this line
        return response.items;
    } catch (error) {
        console.error("Error fetching top artists:", error);
        return [];
    }
};

export const getRecentlyPlayed = async () => {
    try {
        const response = await spotifyApi.getMyRecentlyPlayedTracks();
        console.log("Recently Played:", response.items); // Add this line
        return response.items;
    } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        return [];
    }
};
