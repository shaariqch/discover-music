import Spotify from "spotify-web-api-js";

const spotifyApi = new Spotify();
var Q = require("q");
spotifyApi.setPromiseImplementation(Q);
async function getAndSetAccessToken() {
  const response = await fetch("/authorization");
  const json = await response.json();
  return json.access_token;
}

export async function getGlobalTracks() {
  const access_token = await getAndSetAccessToken();
  spotifyApi.setAccessToken(access_token);
  let result;
  return spotifyApi.getPlaylist("37i9dQZEVXbMDoHDwVN2tF").then(res => res);
}
