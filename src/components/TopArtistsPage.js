import React from 'react';

export default function TopArtistsPage({ artists }) {
    if (!artists || artists.length === 0) return <p>No artists available</p>;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP 10 ARTISTS</h2>
            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {artists.map((artist, index) => (
                        <li key={artist.id}>
                            <div className={'track'}>
                                <h1>{index + 1}</h1>
                                {artist.images.length > 0 && (
                                    <img
                                        src={artist.images[0]?.url}
                                        alt={artist.name}
                                        className={'track-image'}
                                    />
                                )}
                                <div className={'track-info'}>
                                    <h1>{artist.name}</h1>
                                    <p>Followers: {artist.followers.total}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
