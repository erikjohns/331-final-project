'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';
import TopArtistsDashboard from '@/components/TopArtistsDashboard';
import '@/styles/dashboard.css';
import TracksDashboard from "@/components/TracksDashboard";
import RecentTracksDashboard from "@/components/RecentTracksDashboard";

export default function Dashboard() {
    const searchParams = useSearchParams();
    const { accessToken, updateAccessToken } = useSpotify();
    const {topTracks, topArtists, recentTracks } = useSpotifyData(5);

    // Get access token from URL and set it in the context
    useEffect(() => {
        const tokenFromUrl = searchParams.get('access_token');
        if (tokenFromUrl && tokenFromUrl !== accessToken) {
            console.log("Setting new access token:", tokenFromUrl);
            setSpotifyAccessToken(tokenFromUrl);
            updateAccessToken(tokenFromUrl);
        }
    }, [searchParams, accessToken, updateAccessToken]);

    return (
        <div className={'dashboard-container'}>
            <TopArtistsDashboard artists={topArtists} />
            <div className={'two-columns-dashboard'}>
                <TracksDashboard tracks={topTracks} />
                <RecentTracksDashboard tracks={recentTracks} />
            </div>
        </div>
    );
}
