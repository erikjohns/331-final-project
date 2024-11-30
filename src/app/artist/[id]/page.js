'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getArtistDetails } from '@/services/spotify';

export default function ArtistDetails() {
    const { id } = useParams(); // Dynamically retrieve the artist ID from the URL
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchArtistData = async () => {
                try {
                    const artistData = await getArtistDetails(id);
                    setArtist(artistData);
                } catch (error) {
                    console.error('Error fetching artist details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchArtistData();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!artist) return <div>Artist not found</div>;

    return (
        <div className="artist-details-container">
            <h1>{artist.name}</h1>
            {artist.images.length > 0 && (
                <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="artist-details-image"
                />
            )}
            <p>Followers: {artist.followers.total.toLocaleString('en-us')}</p>
            <p>Genres: {artist.genres.join(', ')}</p>
            <p>Popularity: {artist.popularity}</p>
        </div>
    );
}
