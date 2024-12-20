import NavBar from "@/components/NavBar";
import '@/styles/ArtistView.css';
import capitalizeWords from "@/utils/CapitalizeWords";
import formatDate from "@/utils/FormatDate";
import Link from "next/link";

export default function ArtistView({ artist, albums }) {
    return (
        <div>
            <NavBar />
            <div className="artist-details-container">
                <div className={'artist-information'}>
                    {artist.images.length > 0 && (
                        <img
                            src={artist.images[0].url}
                            alt={artist.name}
                            className="artist-details-image"
                        />
                    )}

                    <div className={'artist-information-container'}>
                        <h1>{artist.name}</h1>
                        <p><span>Followers:</span> {artist.followers.total.toLocaleString('en-us')}</p>
                        <p><span>Genres:</span> {artist.genres.map(capitalizeWords).join(', ')}</p>
                        <p><span>Popularity:</span> {artist.popularity}</p>
                        <a href={artist.external_urls.spotify} target={'_blank'}>
                            <button>
                                <img src={'/Spotify_Primary_Logo_RGB_White.png'} alt={'Spotify'}/>
                                Open in Spotify
                            </button>
                        </a>
                    </div>
                </div>

                <div className={'albums-container'}>
                    <h2>Albums</h2>
                    <div className="albums-inner-container">
                        {albums.length > 0 ? (
                            albums.map((album) => (
                                <Link key={album.id} className="album-card" href={`/album/${album.id}`}>
                                    {album.images.length > 0 && (
                                        <img
                                            src={album.images[0].url}
                                            alt={album.name}
                                            className="album-image"
                                        />
                                    )}
                                    <h3>{album.name}</h3>
                                    <p>{formatDate(album.release_date)}</p>
                                </Link>
                            ))
                        ) : (
                            <p>No albums found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}