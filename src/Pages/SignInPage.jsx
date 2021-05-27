import React from "react";
import logo from "../images/Spotter.png";

const CLIENT_ID = "07720dacbc5f4c5d88232f48031f7a46";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_SIGNIN = "http://localhost:3000/spotter";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-modify-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const App = () => {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_SIGNIN}&scope=${SCOPES_URL_PARAM}&response_type=token&showdialog=true`;
  };

  return (
    <div className="signInContainer">
      <div>
        <img className="logo"
          style={{}}
          src={logo}
          alt=""
        />
      </div>
      <button className="signInBtn" onClick={handleLogin}>
        Sign in with Spotify
      </button>
    </div>
  );
};

export default App;
