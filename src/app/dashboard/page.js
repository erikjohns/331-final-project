'use client';
import { useEffect } from 'react';
import { useSpotifyData } from '@/hooks/useSpotifyData';
import { useSpotify } from '@/context/SpotifyContext';
import { useSearchParams } from 'next/navigation';
import { setAccessToken as setSpotifyAccessToken } from '@/services/spotify';
import '@/styles/dashboard.css';

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
        <div className={'dashboard-container'}>
            <h1>Your Spotify Stats</h1>
            <h2>Top Artists</h2>
            {topArtists.length > 0 ? (
                <ul className={'top-artists'}>
                    {topArtists.map((artist, index) => (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <img src={artist.images[0]?.url} alt={artist.name} />
                            <div>
                                <h3>{artist.name}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No top artists data available</p>
            )}

            <h2>Top Tracks</h2>
            {topTracks.length > 0 ? (
                <ul className={'top-tracks'}>
                    {topTracks.map((track, index) => (
                        <li key={track.id}>
                            <img src={track.album.images[0]?.url} alt={track.name} />
                            <h5>{index + 1}. {track.name}</h5>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No top tracks data available</p>
            )}

            <h2>Recently Played Tracks</h2>
            {recentTracks.length > 0 ? (
                <ul className={'recent-tracks'}>
                    {recentTracks.map((item, index) => (
                        <li key={index}>
                            <img src={item.track.album.images[0]?.url} alt={item.track.name} />
                            <h5>{index + 1}. {item.track.name}</h5>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recently played tracks data available</p>
            )}
        </div>
    );
}
