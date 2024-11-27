export default function TopGenresDashboard({ genres }) {
    if (!genres || genres.length === 0) return null;

    return (
        <div className={'track-list-dashboard-container'}>
            <h2 className={'dashboard-section-header'}>TOP GENRES</h2>

            <div className={'track-list-container'}>
                <ul className={'track-list'}>
                    {genres.map((genre, index) => (
                        <li key={index}>
                            <div className={'track'}>
                                <h1>{index + 1}. </h1>
                                <div className={'track-info'}>
                                    <h1>{genre}</h1>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}