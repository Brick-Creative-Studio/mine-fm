import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'
import { Buffer } from 'buffer'
import SpotifyWebApiServer from 'spotify-web-api-node'
import { useEffect } from 'react'

const scopes = [
    'streaming',
    'user-library-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'ugc-image-upload',
  ],
  redirectUri = 'https://mine-fm.vercel.app/',
  clientId = process.env.NEXT_PUBLIC_CLIENT_ID ? process.env.NEXT_PUBLIC_CLIENT_ID : '',
  clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET,
  state = 'some-state-of-my-choice'
var code = process.env.NEXT_PUBLIC_ACCESS_CODE ? process.env.NEXT_PUBLIC_ACCESS_CODE : ''

;(SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void })._addMethods(
  SpotifyWebApiServer
)
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
}).getAlbum('black album').then(function(data) {
  console.log(data.body.tracks)
  return data.body.tracks
})

// .clientCredentialsGrant().then(
//   function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     if(data.body.expires_in <= 5 ){
//       spotifyApi.resetRefreshToken();
//       spotifyApi.resetAccessToken();


//     } 

//   },
//   function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   }
// );

// spotifyApi.authorizationCodeGrant(code).then(
//     function(data) {
//       console.log('The token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
//       console.log('The refresh token is ' + data.body['refresh_token']);

//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//     },
//     function(err) {
//       console.log('Something went wrong!', err);
//     }
//   );

//console.log(spotifyApi);
// const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)
// console.log('function check', authorizeURL)
// console.log(authorizeURL);
// const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//     },
//     data: {
//       grant_type: 'client_credentials'
//     },
//   };

//   axios.post(authOptions.url, authOptions.data, {
//     headers: authOptions.headers,
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         const token = response.data.access_token;
//         console.log('auth token:', token)
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });

// // Retrieve an access token and a refresh token
// spotifyApi.authorizationCodeGrant(code).then(
//     function(data) {
//       console.log('The token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
//       console.log('The refresh token is ' + data.body['refresh_token']);

//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//     },
//     function(err) {
//       console.log('Something went wrong!', err);
//     }
//   );

//   spotifyApi.refreshAccessToken().then(
//     function(data) {
//       console.log('The access token has been refreshed!');

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function(err) {
//       console.log('Could not refresh access token', err);
//     }
//   );

export default spotifyApi
