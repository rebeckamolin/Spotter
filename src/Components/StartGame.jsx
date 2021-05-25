import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

const USER_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const TOP50_PLAYLIST_ENDPOINT =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks";

const StartGame = ({
  gameStartedState: [gameStarted, setGameStarted],
  top50TracksState: [top50Tracks, setTop50Tracks],
  spotterPlaylistIdState: [spotterPlaylistId, setSpotterPlaylistId],
}) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  // const { playlistId, trackUri, playlist } = useContext(PlaylistContext);
  // const [showPlaylist, setShowPlaylist] = playlist;
  // const [spotterPlaylistId, setSpotterPlaylistId] = playlistId;
  // const [top50Tracks, setTop50Tracks] = useState([]);
  // const [spotterPlaylistId, setSpotterPlaylistId] = useState("");

  const handleStartGame = async () => {
    getUserPlaylists();
    getSpotifyTopPlaylist();
  };

  const getUserPlaylists = async () => {
    try {
      const response = await axios.get(USER_PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });

      if (response.status === 200) {
        // console.log("getUserPlaylists resp:", response);
        setUserPlaylists(response.data.items);
      } else {
        console.log("In getUserPlaylists, status:,", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSpotifyTopPlaylist = async () => {
    try {
      const response = await axios.get(TOP50_PLAYLIST_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      });
      if (response.status === 200) {
        console.log("Got Top 50", response);
        setTop50Tracks(response.data.items);
      } else {
        console.log("In getSpotifyTopPlaylist, status:", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNewSpotterPlaylist = async () => {
    try {
      const response = await axios.post(
        USER_PLAYLISTS_ENDPOINT,
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
      );

      if (response.status === 201) {
        console.log("addNewSpotterPlaylist resp:", response);
        setSpotterPlaylistId(response.data.id);
      } else {
        console.log("In addNewSpotterPlaylist, status:,", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSpotterPlaylist = () => {
    // Check if a Spotter-playlist already exists
    const spotterPlaylist = userPlaylists.find(
      (playlist) => playlist.name.toLowerCase() === "spotter"
    );

    if (spotterPlaylist !== undefined) {
      console.log("Songs will be added to an EXISTING playlist");
      setSpotterPlaylistId(spotterPlaylist.id);
    } else {
      console.log("Songs will be added to a NEW playlist");
      addNewSpotterPlaylist();
    }
  };

  useEffect(() => {
    if (top50Tracks.length > 0 && spotterPlaylistId !== "") {
      setGameStarted(true);
      console.log("Game set up");
      console.log("userPlaylists", userPlaylists);
      console.log("top50Tracks", top50Tracks);
    } else if (userPlaylists.length > 0) {
      handleSpotterPlaylist();
    }
  }, [top50Tracks, spotterPlaylistId, userPlaylists]);

  return (
    <>
      <div
        className="card"
        style={{
          width: "432px",
          height: "652px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <button className="checkListBtn" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
        {/* <button onClick={checkPlaylistExists}>kolla lista</button> */}
      </div>
    </>
  );
};

export default StartGame;
