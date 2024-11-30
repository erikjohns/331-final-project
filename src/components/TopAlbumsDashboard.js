export default function TopAlbumsDashboard({ albums }) {
    if (!albums || albums.length === 0) return null;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP ALBUMS</h2>

            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {albums.map((album, index) => (
                        <li key={album.id}>
                            <div className={'track'}>
                                <h1>{index + 1}</h1>
                                {/* Directly use the image URL since it's a string */}
                                {album.image && (
                                    <img
                                        src={album.image} // Use the direct image URL
                                        alt={album.name}
                                        className={index === 0 ? 'first-track-image' : 'track-image'}
                                    />
                                )}
                                <div className={'track-info'}>
                                    <h1>{album.name}</h1>
                                    <p>{album.artist}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
