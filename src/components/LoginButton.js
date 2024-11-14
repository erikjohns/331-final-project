import Link from 'next/link';

export default function LoginButton() {
    return (
        <Link href="/api/login">
            <button>Login with Spotify</button>
        </Link>
    );
}
