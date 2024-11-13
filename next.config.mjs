/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
    env: {
        SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
        NEXT_PUBLIC_SPOTIFY_SCOPES: process.env.NEXT_PUBLIC_SPOTIFY_SCOPES,
    },
    reactStrictMode: true,
};

export default nextConfig;