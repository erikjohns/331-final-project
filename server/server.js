// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Enables CORS for all routes, allowing requests from any origin
app.use(cors());
// Parses incoming JSON requests
app.use(express.json());

/**
 * Route to handle Spotify Authorization Code Flow
 * - This endpoint initiates the OAuth 2.0 Authorization Code FLow.
 * - Redirects users to Spotify's login page where they can authorize the app.
 */
app.get('/login', (req, res) => {
    const scopes = 'user-top-read playlist-read-private';
    const redirectUri = process.env.REDIRECT_URI;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const responseType = 'code';

    // The Spotify Authorization URL with the required query parameters
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

    // Redirects the user to Spotify's authorization page
    res.redirect(authUrl);
});

/**
 * Route to handle Spotify Authorization Code callback
 * - After the user authorizes the app, Spotify redirects them to this endpoint with a code.
 * - The code is exchanged for an access token to access the Spotify API.
 */
app.post('/callback', async (req, res) => {
    const code = req.body.code; // Authorization code received from Spotify
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Authorization header with Base64-encoded client credentials
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            // Form data required for the token exchange
            data: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
        });

        // Send the access token and related information back to the client
        res.json(tokenResponse.data);
    } catch (error) {
        // Log the error for debugging purposes and respond with a 500 status code
        console.error("Error getting token:", error);
        res.status(500).json({error: 'Token exchange failed.'});
    }
});

// Define the port on which the server will listen for incoming requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})