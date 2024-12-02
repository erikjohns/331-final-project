import NavBar from "@/components/NavBar";
import ConvertMilliseconds from "@/utils/ConvertMilliseconds";
import Link from "next/link";
import '@/styles/AlbumView.css';
import { CgPlayButtonO } from "react-icons/cg";
import '@/utils/FormatDate';
import formatDate from "@/utils/FormatDate";

const getTotalAlbumRuntime = (tracks) => {
    const totalMs = tracks.reduce((total, track) => total + track.duration_ms, 0);
    return ConvertMilliseconds(totalMs);
}

export default function AlbumView({ album }) {
    const totalRuntime = getTotalAlbumRuntime(album.tracks.items);

    return (
        <div>
            <NavBar />
            <div className={'album-details-container'}>
                <div className={'album-information'}>
                    {album.images.length > 0 && (
                        <img
                            src={album.images[0].url}
                            alt={album.name}
                            className={'album-details-image'}
                        />
                    )}

                    <div className={'album-information-container'}>
                        <h1>{album.name}</h1>
                        <Link href={`/artist/${album.artists[0]?.id}`}>
                            <h3 className={'album-artist'}>{album.artists[0]?.name}</h3>
                        </Link>
                        <p><span>Released: </span>{formatDate(album.release_date)}</p>
                        <p><span>Popularity: </span>{album.popularity}</p>
                        <a href={album.external_urls.spotify} target={'_blank'}>
                            <button>
                                <img src={'/Spotify_Primary_Logo_RGB_White.png'} alt={'Spotify'}/>
                                Open in Spotify
                            </button>
                        </a>
                    </div>
                </div>

                <div className={'album-tracklist'}>
                    <h1>Track List</h1>
                    {album.tracks.items.length > 0 && album.tracks.items.map((track, index) => (
                        <div key={index} className={'track-card'}>
                            <Link href={`/track/${track.id}`} className={'track-left'}>
                                <h5>{track.track_number}</h5>
                                <p>{track.name}</p>
                                {track.explicit && (
                                    <p><span className={'track-explicit'}>E</span></p>
                                )}
                            </Link>
                            <div className={'track-right'}>
                                <h5>{ConvertMilliseconds(track.duration_ms)}</h5>
                                <Link href={track.external_urls.spotify} target={'_blank'}>
                                    <CgPlayButtonO className={'track-play-button'}/>
                                </Link>
                            </div>
                        </div>
                    ))}
                    <h5 className={'total-album-runtime'}>{totalRuntime}</h5>
                </div>
            </div>
        </div>
    )
}