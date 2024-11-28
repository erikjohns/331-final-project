export default function TopGenresDashboard({ genres }) {
    if (!genres || genres.length === 0) return null;

    // Create a set to track displayed artists
    const displayedArtists = new Set();

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP GENRES</h2>

            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {genres.map((genre, index) => {
                        // Separate new and repeated artists
                        const newArtists = genre.artists.filter(artist => !displayedArtists.has(artist.name));
                        const repeatedArtists = genre.artists.filter(artist => displayedArtists.has(artist.name));

                        // Combine new and repeated artists, prioritizing new ones
                        const prioritizedArtists = [...newArtists, ...repeatedArtists].slice(0, 3);

                        // Add all displayed artists for this genre to the set
                        prioritizedArtists.forEach(artist => displayedArtists.add(artist.name));

                        return (
                            <li key={index}>
                                <div className={'track'}>
                                    <h1>{index + 1 + "."}</h1>
                                    <div className={'track-info'}>
                                        <h1>{genre.name}</h1>
                                        <p>
                                            Contributing Artists:{" "}
                                            {prioritizedArtists.map((artist, i) => (
                                                <a
                                                    key={artist.name}
                                                    href={artist.spotifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={'artist-link'}
                                                >
                                                    {artist.name}
                                                </a>
                                            )).reduce((prev, curr) => [prev, ", ", curr])}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
