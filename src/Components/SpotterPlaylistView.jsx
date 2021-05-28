import React, { useEffect, useState } from "react";
import axios from "axios";
import close from "../images/close.png";

const SpotterPlaylistView = ({ endpoint }) => {
  const [spotterPlaylist, setSpotterPlaylist] = useState([]);

  // Get the Spotter playlist
  const getSpotterPlaylist = async () => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });
      if (response.status === 200) {
        setSpotterPlaylist(response.data.items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete song in Spotter playlist
  const deleteTrack = async (idx) => {
    try {
      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.accessToken,
        },
        data: {
          tracks: [
            {
              uri: spotterPlaylist[idx].track.uri,
            },
          ],
        },
      });

      if (response.status === 200) {
        getSpotterPlaylist();
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
        {spotterPlaylist.map((item, index) => (
          <div className="playlistItem" key={index} style={{}}>
            <div className="itemsInfo">
              <div className="playlistConImg">
                <img
                  className="playlistImg"
                  src={item.track.album.images[0].url}
                  alt="albumImage"
                />
              </div>
              <li>{item.track.name}</li>
            </div>
            <div
              className="deleteBtn"
              onClick={() => {
                if (window.confirm("This song will be permanent deleted"))
                  deleteTrack(index);
              }}
            >
              <img src={close} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SpotterPlaylistView;
