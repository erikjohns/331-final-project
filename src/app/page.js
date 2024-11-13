'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter(); // Using useRouter from 'next/navigation'

    // Check if the user is logged in by looking for the access token in localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this runs only on the client side
            const token = localStorage.getItem('spotifyAccessToken');
            if (token) {
                setIsLoggedIn(true);
            }
        }
    }, []);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('spotifyAccessToken');
        setIsLoggedIn(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {isLoggedIn ? (
                <>
                    <h1>Welcome to Your Spotify Dashboard</h1>
                    <button onClick={handleLogout}>Log Out</button>
                </>
            ) : (
                <button onClick={() => router.push('/login')}>
                    Log in with Spotify
                </button>
            )}
        </div>
    );
}