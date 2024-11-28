import { useEffect, useState } from 'react';
import { getTopTracks, getTopArtists, getRecentlyPlayed } from '@/services/spotify';
import { useSpotify } from '@/context/SpotifyContext';

/**
 * Custom React hook to fetch and manage the user's Spotify data
 * It fetches the user's top tracks, top artists, and recently played tracks using the Spotify Web API
 * @returns {Object} - An object containing arrays of top tracks, top artists, and recently played tracks
 */
export const useSpotifyData = () => {
    // Access the current Spotify access token from the context
    const { accessToken } = useSpotify();

    // State variables to store fetched data
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [recentTracks, setRecentTracks] = useState([]);

    /**
     * useEffect hook that runs whenever the access token changes
     * It fetches the user's Spotify data if an access token is available
     */
    useEffect(() => {
        // Check if the access token is available, exit if not
        if (!accessToken) {
            console.log("No access token available in useSpotifyData");
            return;
        }

        console.log("Fetching Spotify data with access token:", accessToken);

        /**
         * Asynchronous function to fetch data from the Spotify API
         * It fetches the user's top tracks, top artists, and recently played tracks
         */
        const fetchData = async () => {
            try {
                // Fetch the user's top tracks
                const tracks = await getTopTracks(5);
                console.log("Fetched Top Tracks:", tracks);
                setTopTracks(tracks);

                // Fetch the user's top artists
                const artists = await getTopArtists(5);
                console.log("Fetched Top Artists:", artists);
                setTopArtists(artists);

                // Fetch the user's recently played tracks
                const recent = await getRecentlyPlayed(5);
                console.log("Fetched Recently Played Tracks:", recent);
                setRecentTracks(recent);

                // Calculate top genres
                const artistsForGenres = await getTopArtists(30);
                const genreData = {};

                // Populate genreData with counts and contributing artists
                artistsForGenres.forEach(artist => {
                    artist.genres.forEach(genre => {
                        if (!genreData[genre]) {
                            genreData[genre] = {
                                name: genre,
                                count: 0,
                                artists: []
                            };
                        }
                        genreData[genre].count += 1;
                        if (!genreData[genre].artists.some(a => a.name === artist.name)) {
                            genreData[genre].artists.push({
                                name: artist.name,
                                spotifyUrl: artist.external_urls.spotify, // Add Spotify profile URL
                            });
                        }
                    });
                });

                const topGenres = Object.values(genreData)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);

                console.log("Top Genres with Artists:", topGenres);
                setTopGenres(topGenres);
            } catch (error) {
                console.error("Error fetching Spotify data:", error);
            }
        };

        fetchData();
    }, [accessToken]); // Re-run the effect whenever the access token changes

    return { topTracks, topArtists, topGenres, recentTracks };
};
