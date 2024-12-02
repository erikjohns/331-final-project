import Link from "next/link";

export default function RecentTracksDashboard({ tracks }) {
    if (!tracks || !tracks.length || tracks.length === 0) return null;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>RECENT TRACKS</h2>

            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {tracks.map((track, index) => (
                        <Link href={{
                            pathname: `/track/${track.track.id}`,
                            query: { lastPlayed: track.played_at },
                        }} key={index} >
                            <li key={index}>
                                <div className={'track'}>
                                    <h1>{index + 1}</h1>
                                    {track.track.album.images.length > 0 && (
                                        <img
                                            src={track.track.album.images[0]?.url}
                                            alt={track.name}
                                            className={index === 0 ? 'first-track-image' : 'track-image'}/>
                                    )}
                                    <div className={'track-info'}>
                                        <h1>{track.track.name}</h1>
                                        <p>{track.track.artists[0]?.name}</p>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}