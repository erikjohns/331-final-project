import axios from 'axios';
import queryString from 'query-string';

/**
 * GET route handler for handling Spotify's OAuth callback
 * This route exchanges the authorization code for an access token and a refresh token
 *
 * @param {Request} req - The incoming request object containing the authorization code
 * @returns {Response} - A redirect response to the dashboard page with the access token
 */
export async function GET(req) {
    // Extract the authorization code from the query parameters in the request URL
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    // Prepare the options for the token request to Spotify
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

    // Redirect the user to the dashboard with the tokens as query parameters
    return new Response(null, {
        status: 302,
        headers: {
            Location: `/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`,
        },
    });
}
