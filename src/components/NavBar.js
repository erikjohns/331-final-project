import Link from "next/link";
import '@/styles/NavBar.css';

export default function NavBar() {
    return (
        <div className="dashboard-taskbar">
            <h1 className="taskbar-title">SpotiMetrics</h1>
            <div className="taskbar-buttons">
                <Link href="/dashboard">
                    <button>Home Dashboard</button>
                </Link>
                <Link href="/top-tracks">
                    <button>Top Tracks</button>
                </Link>
                <Link href="/top-artists">
                    <button>Top Artists</button>
                </Link>
                <Link href="/recent-tracks">
                    <button>Recent Tracks</button>
                </Link>
                <Link href="/top-genres">
                    <button>Top Genres</button>
                </Link>
                <Link href="/top-albums">
                    <button>Top Albums</button>
                </Link>
            </div>
        </div>
    )
}