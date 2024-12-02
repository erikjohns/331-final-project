import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/spotify';
import { useSpotify } from '@/context/SpotifyContext';

export default function WelcomeUser() {
    const { accessToken } = useSpotify();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!accessToken) return; // Ensure token is set before fetching
            try {
                const profile = await getUserProfile();
                if (profile) {
                    setDisplayName(profile.display_name);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchProfile();
    }, [accessToken]); // Depend on accessToken to trigger fetch only when it's available

    return (
        <div className="welcome-user-container">
            {displayName ? (
                <h1>Welcome, {displayName}! Check out your SpotiMetrics below...</h1>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
}