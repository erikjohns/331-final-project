export default function TopArtistsDashboard ({ artists }) {
    if (!artists || artists.length === 0) return null;

    const [firstArtist, ...otherArtists] = artists;

    return (
        <div className={'top-artists-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP ARTISTS</h2>

            <div className={'top-artists-list-container'}>
                <div className={'top-artist-first'}>
                    <h1>1</h1>
                    {firstArtist.images.length > 0 && (
                        <img
                            src={firstArtist.images[0]?.url}
                            alt={firstArtist.name}
                            className={'top-artist-image'} />
                    )}
                    <div className={'top-artist-info-container'}>
                        <h1>{firstArtist.name}</h1>
                        <p>
                            Followers: {firstArtist.followers.total}
                        </p>
                    </div>
                </div>

                <ul className={'top-artists-list'}>
                    {otherArtists.map((artist, index) => (
                        <li key={artist.id} className="artist">
                            <div className={'artist'}>
                                <h1>{index + 2}</h1>
                                {artist.images.length > 0 && (
                                    <img
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        className="artist-image"
                                    />
                                )}
                                <div className="artist-info">
                                    <h1>{artist.name}</h1>
                                    <p>
                                        Followers: {firstArtist.followers.total}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}