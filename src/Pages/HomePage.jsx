import React, { useState, useEffect } from "react";
import Game from "../Components/Game";
import StartGame from "../Components/StartGame";
import logo from "../images/Spotter.png";

const HomePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [top50Tracks, setTop50Tracks] = useState([]);
  const [spotterPlaylistId, setSpotterPlaylistId] = useState("");

  //Get auth from url
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

  //Set auth in locaStorage
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
        <img className=""
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
      )}
    </div>
  );
};
export default HomePage;
