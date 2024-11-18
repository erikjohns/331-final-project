import Link from 'next/link';

export default function LoginButton() {
    return (
        <Link href="/api/login">
            <button>
                <img src={'/Spotify_Primary_Logo_RGB_White.png'} alt={'Spotify'}/>
                Login with Spotify
            </button>
        </Link>
    );
}
