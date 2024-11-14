'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Create a Context object for managing Spotify-related data across the application
const SpotifyContext = createContext();

/**
 * This component wraps around parts of the application that need access to the Spotify context
 * It provides the current Spotify access token with a method to update it
 *
 * @param {Object} children - The child components that will have access to the context
 */
export const SpotifyProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    /**
     * Function to update the access token in the context
     * This is used when a new access token is obtained after user authentication
     *
     * @param {string} token - The new access token
     */
    const updateAccessToken = (token) => {
        setAccessToken(token);
    };

    return (
        <SpotifyContext.Provider value={{ accessToken, updateAccessToken }}>
            {children}
        </SpotifyContext.Provider>
    );
};

/**
 * Custom hook to access the Spotify context
 * This hook can be used in any component to get or update the access token
 *
 * @returns {Object} - An object containing the access token and the update function
 */
export const useSpotify = () => useContext(SpotifyContext);
