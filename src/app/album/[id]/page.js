'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {getAlbumDetails} from "@/services/spotify";
import AlbumView from "@/components/AlbumView";

export default function AlbumDetails() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchAlbumData = async () => {
                try {
                    const albumData = await getAlbumDetails(id);
                    setAlbum(albumData);
                } catch (error) {
                    console.error('Error fetching album data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAlbumData();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>
    if (!album) return <div>Album not found</div>;

    return (
        <AlbumView album={album} />
    )
}