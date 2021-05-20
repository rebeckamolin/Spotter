import React, { createContext, useState } from "react";

export const PlaylistContext = createContext({});

const PlaylistContextProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useState("");
  const [trackUri, setTrackUri] = useState("");
  const [start, setStart] = useState(true);
  return (
    <PlaylistContext.Provider
      value={{
        playlistId: [playlistId, setPlaylistId],
        trackUri: [trackUri, setTrackUri],
        playlist: [playlist, setPlaylist],
        start: [start, setStart],
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
