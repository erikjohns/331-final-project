'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';
import '@/styles/dashboard.css';
import '@/styles/globals.css';
import NavBar from "@/components/NavBar";
import TopArtistsDashboard from "@/components/TopArtistsDashboard";

export default function TopArtists() {
    const searchParams = useSearchParams();
    const { accessToken, updateAccessToken } = useSpotify();
    const { topArtists } = useSpotifyData(5);

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
            <div>
                <TopArtistsDashboard artists={topArtists} />
            </div>
        </main>
    );
}
