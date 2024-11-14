import axios from 'axios';
import queryString from 'query-string';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
        },
        data: queryString.stringify({
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code',
        }),
    };

    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;

    return new Response(null, {
        status: 302,
        headers: {
            Location: `/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`,
        },
    });
}
