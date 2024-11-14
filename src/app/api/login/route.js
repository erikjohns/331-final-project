import queryString from 'query-string';

/**
 * GET route handler for initiating the Spotify OAuth authentication process
 * This route redirects the user to Spotify's authorization endpoint, where they can grant access to the app
 *
 * @returns {Response} - A redirect response to Spotify's authorization page
 */
export async function GET() {
    // Define the scopes that the application is requesting permission for
    // These scopes determine what data the app can access on behalf of the user
    const scope = [
        'user-top-read',                // Access the user's top tracks and artists
        'user-read-recently-played',    // Access the user's recently played tracks
        'user-read-private',            // Access the user's private profile information
        'user-read-email',              // Access the user's email address
    ].join(' ');

    // Constructs the query parameters for the Spotify Authorization URL
    const queryParams = queryString.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope,
    });

    // Return a new redirect response to the Spotify authorization URL with the constructed query parameters
    return new Response(null, {
        status: 302,
        headers: { Location: `https://accounts.spotify.com/authorize?${queryParams}` },
    });
}
