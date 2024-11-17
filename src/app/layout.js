import { SpotifyProvider } from '@/context/SpotifyContext';
import '@/styles/globals.css';

export const metadata = {
  title: "Spotify Top Songs",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <SpotifyProvider>
            <html lang="en">
            <head>
                <link rel="stylesheet" href="https://use.typekit.net/wqk5pyn.css"/>
            </head>
            <body>
                {children}
            </body>
            </html>
        </SpotifyProvider>
    );
}

