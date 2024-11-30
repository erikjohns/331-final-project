'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getArtistDetails, getArtistAlbums } from '@/services/spotify';
import ArtistView from "@/components/ArtistView";

export default function ArtistDetails() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchArtistData = async () => {
                try {
                    const artistData = await getArtistDetails(id);
                    const artistAlbums = await getArtistAlbums(id);
                    setArtist(artistData);
                    setAlbums(artistAlbums);
                } catch (error) {
                    console.error('Error fetching artist data:', error);
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
        <ArtistView artist={artist} albums={albums} />
    );
}
