import NavBar from '@/components/NavBar';
import ConvertMilliseconds from "@/utils/ConvertMilliseconds";
import Link from "next/link";
import formatDate from "@/utils/FormatDate";
import '@/styles/TrackView.css';
import getRelativeTime from "@/utils/GetRelativeTime";

export default function TrackView({ track, lastPlayed }) {
    return (
        <div>
            <NavBar />
            <div className={'track-details-container'}>
                <div className={'track-information'}>
                    {track.album.images.length > 0 && (
                        <img
                            src={track.album.images[0].url}
                            alt={track.name}
                            className={'track-details-image'}
                        />
                    )}

                    <div className={'track-information-container'}>
                        <h1>{track.name} {track.explicit && (
                            <span className={'track-explicit'}>E</span>
                        )}</h1>
                        <div className={'track-album-artist-container'}>
                            <Link href={`/artist/${track.artists[0]?.id}`}>
                                <h3 className={'track-artist'}>{track.artists[0]?.name}</h3>
                            </Link>
                            <h3>&bull;</h3>
                            <Link href={`/album/${track.album?.id}`}>
                                <h3 className={'track-album'}>{track.album?.name}</h3>
                            </Link>
                        </div>
                        {lastPlayed && (
                            <p><span className={'track-info-title'}>Last Played: </span>{getRelativeTime(lastPlayed)}
                            </p>
                        )}
                        <p><span className={'track-info-title'}>Released: </span>{formatDate(track.album.release_date)}
                        </p>
                        <p><span className={'track-info-title'}>Length: </span>{ConvertMilliseconds(track.duration_ms)}
                        </p>
                        <p><span className={'track-info-title'}>Popularity: </span>{track.popularity}</p>
                        <a href={track.external_urls.spotify} target={'_blank'}>
                            <button>
                                <img src={'/Spotify_Primary_Logo_RGB_White.png'} alt={'Spotify'}/>
                                Open in Spotify
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}