'use client';

import { useEffect, useState } from "react";
import {useParams, useSearchParams} from "next/navigation";
import { getTrackDetails } from "@/services/spotify";
import TrackView from "@/components/TrackView";

export default function TrackDetails() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);

    const lastPlayed = searchParams.get('lastPlayed');

    useEffect(() => {
        if (id) {
            const fetchTrackDetails = async () => {
                try {
                    const trackData = await getTrackDetails(id);
                    setTrack(trackData);
                } catch (error) {
                    console.error('Error fetching album data:', error);
                } finally {
                    setLoading(false);
                }
            }

            fetchTrackDetails();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!track) return <div>Track not found</div>;

    return (
        <TrackView track={track} lastPlayed={lastPlayed} />
    )
}