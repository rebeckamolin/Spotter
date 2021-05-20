import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

const MySongs = () => {
  const { playlistId, trackUri } = useContext(PlaylistContext);
  const [listId] = playlistId;
  const [tracks, setTracks] = useState([]);
  const PLAYLIST_50_ENDPOINT = `https://api.spotify.com/v1/playlists/${listId}/tracks`;

  const showMySongs = () => {
    axios
      .get(PLAYLIST_50_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setTracks(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    showMySongs();
  }, []);

  return (
    <div className="playlist">
      {tracks.map((tracks, index) => (
        <div className="playlistItem" key={index}>
          <div className="playlistConImg">
            <img
              className="playlistImg"
              src={tracks.track.album.images[0].url}
              alt="albumImage"
            />
          </div>
          <li>{tracks.track.name}</li>
        </div>
      ))}
    </div>
  );
};
export default MySongs;
