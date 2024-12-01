import Link from "next/link";

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
                                <Link href={`/album/${album.id}`}>
                                {album.image && (
                                    <img
                                        src={album.image}
                                        alt={album.name}
                                        className={index === 0 ? 'first-track-image' : 'track-image'}
                                    />
                                )}
                                </Link>
                                <div className={'track-info'}>
                                    <Link className={"top-album-link"} href={`/album/${album.id}`}>
                                    <h1>{album.name}</h1>
                                    </Link>
                                    <Link href={`/artist/${album.artist.id}`}>
                                    <p className={"top-album-artist-link"}>{album.artist.name}</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
