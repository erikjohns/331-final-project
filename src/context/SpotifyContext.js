'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    // Function to update the access token
    const updateAccessToken = (token) => {
        console.log("Updating context access token:", token);
        setAccessToken(token);
    };

    return (
        <SpotifyContext.Provider value={{ accessToken, updateAccessToken }}>
            {children}
        </SpotifyContext.Provider>
    );
};

// Custom hook to use the Spotify context
export const useSpotify = () => useContext(SpotifyContext);
