'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';
import TopArtistsDashboard from '@/components/TopArtistsDashboard';
import '@/styles/dashboard.css';
import '@/styles/globals.css';
import TracksDashboard from '@/components/TracksDashboard';
import RecentTracksDashboard from '@/components/RecentTracksDashboard';
import Link from 'next/link';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const { accessToken, updateAccessToken } = useSpotify();
    const { topTracks, topArtists, recentTracks } = useSpotifyData(5);

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
        <div className={'dashboard-container'}>
            {/* Taskbar */}
            <div className="dashboard-taskbar">
                <h1 className="taskbar-title">Spotify Stats</h1>
                <div className="taskbar-buttons">
                    <Link href="/dashboard">
                        <button>Home Dashboard</button>
                    </Link>
                    <Link href="/top-tracks">
                        <button>Top Tracks</button>
                    </Link>
                    <Link href="/top-artists">
                        <button>Top Artists</button>
                    </Link>
                    <Link href="/recent-tracks">
                        <button>Recent Tracks</button>
                    </Link>
                </div>
            </div>

            {/* Dashboard Content */}
            <TopArtistsDashboard artists={topArtists} />
            <div className={'two-columns-dashboard'}>
                <TracksDashboard id="top-tracks" tracks={topTracks} />
                <RecentTracksDashboard id="recent-tracks" tracks={recentTracks} />
            </div>
        </div>
    );
}
