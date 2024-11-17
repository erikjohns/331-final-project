import React from 'react';

export default function TopTracksPage({ tracks }) {
    if (!tracks || tracks.length === 0) return <p>No tracks available</p>;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP 10 TRACKS</h2>
            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {tracks.map((track, index) => (
                        <li key={track.id}>
                            <div className={'track'}>
                                <h1>{index + 1}</h1>
                                {track.album.images.length > 0 && (
                                    <img
                                        src={track.album.images[0]?.url}
                                        alt={track.name}
                                        className={index === 0 ? 'first-track-image' : 'track-image'}
                                    />
                                )}
                                <div className={'track-info'}>
                                    <h1>{track.name}</h1>
                                    <p>{track.artists[0]?.name}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
