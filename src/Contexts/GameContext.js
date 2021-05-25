import React, { createContext, useState } from "react";

export const GameContext = createContext({});

const GameContextProvider = ({ children }) => {
  //   const [playlist, setPlaylist] = useState([]);
  //   const [playlistId, setPlaylistId] = useState("");
  //   const [trackUri, setTrackUri] = useState("");
  //   const [start, setStart] = useState(true);

  //   const [top50Tracks, setTop50Tracks] = useState([]);
  //   const [spotterPlaylistId, setSpotterPlaylistId] = useState("");

  const top50Tracks = [];
  const spotterPlaylistId = "";

  return (
    <GameContext.Provider
      value={{
        // top50Tracks: [top50Tracks, setTop50Tracks],
        // spotterPlaylistId: [spotterPlaylistId, setSpotterPlaylistId],
        top50Tracks: top50Tracks,
        spotterPlaylistId: spotterPlaylistId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
