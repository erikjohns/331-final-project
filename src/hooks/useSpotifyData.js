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
    const [topAlbums, setTopAlbums] = useState([]);
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
                setTopGenres(topGenres);
                console.log("Top Genres with Artists:", topGenres);

                // calculate top albums
                const tracksForAlbums = await getTopTracks(50);
                const albumData = {};

                // base score based on rank
                tracksForAlbums.forEach((track, index) => {
                    const score = Math.min(Math.log2(tracksForAlbums.length - index + 1), 5); // max contribution of 5

                    const albumId = track.album.id;
                    if (!albumData[albumId]) {
                        albumData[albumId] = {
                            name: track.album.name,
                            id: albumId,
                            artist: track.album.artists[0].name,
                            image: track.album.images[0]?.url,
                            points: 0,
                            trackCount: 0, // number of tracks contributing to this album
                        };
                    }

                    albumData[albumId].points += score;
                    albumData[albumId].trackCount += 1;
                });

                // Favor albums with more contributing tracks by multiplying points by trackCount
                Object.values(albumData).forEach(album => {
                    album.points *= (album.trackCount * 0.2) + 1; // Amplify based on breadth
                });

                // Convert to array and sort by points in descending order
                const topAlbums = Object.values(albumData)
                    .sort((a, b) => b.points - a.points)
                    .slice(0,5);

                setTopAlbums(topAlbums);
                console.log("Calculated Top Albums", topAlbums);

            } catch (error) {
                console.error("Error fetching Spotify data:", error);
            }
        };

        fetchData();
    }, [accessToken]); // Re-run the effect whenever the access token changes

    return { topTracks, topArtists, topGenres, recentTracks };
};
