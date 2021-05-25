import React, { useState, useEffect, useContext } from "react";
import Game from "../Components/Game";
import StartGame from "../Components/StartGame";
import SpotterPlaylistView from "../Components/SpotterPlaylistView";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";
import logo from "../images/Spotter.png";

const HomePage = () => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [top50Tracks, setTop50Tracks] = useState([]);
  const [spotterPlaylistId, setSpotterPlaylistId] = useState("");
  // const SINGLE_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${listId}/tracks`;

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    return paramsSplitUp;
  };

  const setLocal = () => {
    const { access_token, expires_in } = getReturnedParamsFromSpotifyAuth(
      window.location.hash
    );
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("accessToken", access_token);
  };
  useEffect(() => {
    setLocal();
  }, []);

  return (
    <div className="mainContainer">
      <div>
        <img
          style={{ maxHeight: "60px", paddingTop: "3rem" }}
          src={logo}
          alt=""
        />
      </div>
      {!gameStarted ? (
        <StartGame
          gameStartedState={[gameStarted, setGameStarted]}
          top50TracksState={[top50Tracks, setTop50Tracks]}
          spotterPlaylistIdState={[spotterPlaylistId, setSpotterPlaylistId]}
        />
      ) : (
        <Game top50Tracks={top50Tracks} spotterPlaylistId={spotterPlaylistId} />
        // {isPlaylistOpen ? <SpotterPlaylistView /> : }
      )}
    </div>
  );
};
export default HomePage;

// return (
//   <div className="mainContainer">
//     <h1>Spotter</h1>
//     {!start ? (
//       <StartGame />
//     ) : (
//       <div>
//         <button onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}>
//           {buttonName}
//         </button>
//         {isPlaylistOpen ? <SpotterPlaylistView /> : <GetPlaylist />}
//       </div>
//     )}
//   </div>
// );
