import React from 'react';

export default function RecentTracksPage({ tracks }) {
    if (!tracks || tracks.length === 0) return <p>No recent tracks available</p>;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>RECENT TRACKS</h2>
            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {tracks.map((track, index) => (
                        <li key={track.id}>
                            <div className={'track'}>
                                <h1>{index + 1}</h1>
                                {track.track.album.images.length > 0 && (
                                    <img
                                        src={track.track.album.images[0]?.url}
                                        alt={track.name}
                                        className={'track-image'}
                                    />
                                )}
                                <div className={'track-info'}>
                                    <h1>{track.track.name}</h1>
                                    <p>{track.track.artists[0]?.name}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
