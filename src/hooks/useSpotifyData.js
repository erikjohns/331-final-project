import { useEffect, useState } from 'react';
import { getTopTracks, getTopArtists, getRecentlyPlayed } from '@/services/spotify';
import { useSpotify } from '@/context/SpotifyContext';

export const useSpotifyData = () => {
    const { accessToken } = useSpotify();
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [recentTracks, setRecentTracks] = useState([]);

    useEffect(() => {
        if (!accessToken) {
            console.log("No access token available in useSpotifyData");
            return;
        }

        console.log("Fetching Spotify data with access token:", accessToken);

        const fetchData = async () => {
            try {
                const tracks = await getTopTracks();
                console.log("Fetched Top Tracks:", tracks);
                setTopTracks(tracks);

                const artists = await getTopArtists();
                console.log("Fetched Top Artists:", artists);
                setTopArtists(artists);

                const recent = await getRecentlyPlayed();
                console.log("Fetched Recently Played Tracks:", recent);
                setRecentTracks(recent);
            } catch (error) {
                console.error("Error fetching Spotify data:", error);
            }
        };

        fetchData();
    }, [accessToken]);

    return { topTracks, topArtists, recentTracks };
};
