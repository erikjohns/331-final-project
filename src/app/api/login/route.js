import queryString from 'query-string';

export async function GET() {
    const scope = [
        'user-top-read',
        'user-read-recently-played',
        'user-read-private',
        'user-read-email',
    ].join(' ');

    const queryParams = queryString.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope,
    });

    return new Response(null, {
        status: 302,
        headers: { Location: `https://accounts.spotify.com/authorize?${queryParams}` },
    });
}
