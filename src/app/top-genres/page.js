'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';
import TopGenresDashboard from '@/components/TopGenresDashboard';
import '@/styles/dashboard.css';
import '@/styles/globals.css';
import NavBar from "@/components/NavBar";

export default function TopGenres() {
    const searchParams = useSearchParams();
    const { accessToken, updateAccessToken } = useSpotify();
    const { topGenres } = useSpotifyData(5);

    // Get access token from URL and set it in the context
    useEffect(() => {
        const tokenFromUrl = searchParams.get('access_token');
        if (tokenFromUrl && tokenFromUrl !== accessToken) {
            console.log('Setting new access token:', tokenFromUrl);
            setSpotifyAccessToken(tokenFromUrl);
            updateAccessToken(tokenFromUrl);
        }
    }, [searchParams, accessToken, updateAccessToken]);

    return (
        <main>
            <NavBar />
            <TopGenresDashboard genres={topGenres} />
        </main>
    );
}
