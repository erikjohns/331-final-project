import LoginButton from '@/components/LoginButton';
import '@/styles/login.css';

export default function Home() {
    return (
        <main className={'login-page'}>
            <h1>Welcome to the Spotify Stats App</h1>
            <LoginButton />
        </main>
    );
}
