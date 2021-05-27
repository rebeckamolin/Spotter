import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotterPlaylistView = ({ endpoint, isPlaylistOpen }) => {
  const [playlist, setPlaylist] = useState([]);
  console.log("spotterPlaylistId", endpoint);

  //Get the Spotter playlist and presenting all songs
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
      <div className="playlistTitle">
        <h1>My Songs</h1>
      </div>
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
