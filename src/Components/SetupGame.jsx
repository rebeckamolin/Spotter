import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SetupGame = ({
  gameStartedState: [gameStarted, setGameStarted],
}) => {
  const [playlists, setPlaylists] = useState([]);
  const { playlistId, trackUri, playlist } = useContext(PlaylistContext);
  // const [showPlaylist, setShowPlaylist] = playlist;
  const [listId, setListId] = playlistId;
  const [loading, setLoading] = useState(true);

  const getAllPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setPlaylists(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewPlaylist = () => {
    axios
      .post(
        PLAYLISTS_ENDPOINT,
        {
          name: "Spotter",
          description: "Spotter - New Music",
          public: true,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.accessToken,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setGameStarted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPlaylistExists = () => {
    const exists = playlists.find(
      (playlist) => playlist.name.toLowerCase() === "spotter"
    );

    if (exists !== undefined) {
      console.log("lägg till i befintlig lista");
      setListId(exists.id);
      setGameStarted(true);
    } else {
      console.log("skapa ny lista");
      addNewPlaylist();
    }
  };

  useEffect(() => {
    if (!loading) {
      checkPlaylistExists();
    }
  }, [loading]);

  return (
    <>
      <div
        className="card"
        style={{
          width: "432px",
          height: "652px",
        }}
      >
        <button onClick={getAllPlaylists}>Hämtar alla listor</button>
        {/* <button onClick={checkPlaylistExists}>kolla lista</button> */}
      </div>
      {loading ? "loading" : <p>klart</p>}
    </>
  );
};

export default SetupGame;
