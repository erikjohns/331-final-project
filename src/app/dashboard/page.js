'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const { accessToken, updateAccessToken } = useSpotify();
    const { topTracks, topArtists, recentTracks } = useSpotifyData();

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
        <div>
            <h1>Your Spotify Stats</h1>

            <h2>Top Artists</h2>
            {topArtists.length > 0 ? (
                <ul>
                    {topArtists.map((artist) => (
                        <li key={artist.id}>
                            <img src={artist.images[0]?.url} alt={artist.name} width={50} height={50} />
                            {artist.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No top artists data available</p>
            )}

            <h2>Top Tracks</h2>
            {topTracks.length > 0 ? (
                <ul>
                    {topTracks.map((track) => (
                        <li key={track.id}>{track.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No top tracks data available</p>
            )}

            <h2>Recently Played Tracks</h2>
            {recentTracks.length > 0 ? (
                <ul>
                    {recentTracks.map((item, index) => (
                        <li key={index}>{item.track.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No recently played tracks data available</p>
            )}
        </div>
    );
}
