import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

const SpotterPlaylistView = ({ endpoint, isPlaylistOpen }) => {
  // const { playlistId, trackUri } = useContext(PlaylistContext);
  // const [listId] = playlistId;
  const [playlist, setPlaylist] = useState([]);
  // const SPOTTER_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${spotterPlaylistId}/tracks`;
  console.log("spotterPlaylistId", endpoint);

  const getSpotterPlaylist = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });
      if (response.status === 200) {
        setPlaylist(response.data.items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSpotterPlaylist();
  }, []);

  return (
    <div className="playlist">
      <div
      className="playlistTitle"
        style={{

        }}
      >
        <h1>My Songs</h1>
      </div>
      {/* <div style={{ height: "70px" }}></div> */}
      <div style={{ paddingTop: "70px" }}>
        {playlist.map((item, index) => (
          <div className="playlistItem" key={index}>
            <div className="playlistConImg">
              <img
                className="playlistImg"
                src={item.track.album.images[0].url}
                alt="albumImage"
              />
            </div>
            <li>{item.track.name}</li>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpotterPlaylistView;
