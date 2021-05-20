import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_50_ENDPOINT =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks";

const GetPlaylist = () => {
  const { playlistId, trackUri } = useContext(PlaylistContext);
  const [listId, setListId] = playlistId;
  const [tUri, setTUri] = trackUri;
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState("");
  const [loadingS, setLoadingS] = useState(true);
  const newUri = tUri.replaceAll(":", "%3A");
  const SINGLE_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${listId}/tracks`;


//hämtar listan med de låtar som presenteras för användaren
  const handleGetPlaylist = () => {
    axios
      .get(PLAYLIST_50_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + localStorage.accessToken,
        },
      })
      .then((response) => {
        setTracks(response.data.items);
        setCurrentTrack(response.data.items[0].track);
        setLoadingS(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //en låt gillas => ändrar currenttrack till nästa samt ändrar TUri => newUri => lägger till låten i listan
  const getNextSongLike = () => {
    setTUri(tracks[index].track.uri);
    setCurrentTrack(tracks[index + 1].track);
    setIndex(index + 1);
  };

  //En låt ogillas => ändrar currentTrack till ny låt
  const getNextSongDislike = () => {
    setCurrentTrack(tracks[index + 1].track);
    setIndex(index + 1);
  };
  const pauseTrack = () => {
    const pause = document.getElementById(currentTrack.preview_url);
    if (pause.paused) {
      pause.play();
    } else {
      pause.pause();
    }
  };

  useEffect(() => {
    if (newUri) {
      addNewSongToPlaylist();
    }
  }, [newUri]);

  const addNewSongToPlaylist = () => {
    axios
      .post(
        `${SINGLE_PLAYLIST_ENDPOINT}?uris=${newUri}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetPlaylist();
  }, []);

  return loadingS ? (
    "loading"
  ) : (
    <div className="card">
      <div className="image">
        <img src={currentTrack.album.images[0].url} alt="" />
      </div>
      <p>{currentTrack.name}</p>
      <p>{currentTrack.artists[0].name}</p>
      <div className="playerContainer">
        <button
          className="likeBtn"
          onClick={() => {
            getNextSongLike();
          }}
        >
          <img
            src="/Users/rebeckamolin/Code/Spotter/src/images/thumbs_up.svg"
            alt=""
          />
        </button>
        <button
          className="playerBtn"
          onClick={() => {
            pauseTrack();
          }}
        >
          Pause
        </button>
        <button
          className="dislikeBtn"
          onClick={() => {
            getNextSongDislike();
          }}
        >
          Dislike
        </button>
        <audio
          // autoplay=""
          name="media"
          key={currentTrack.preview_url}
          id={currentTrack.preview_url}
        >
          <source src={currentTrack.preview_url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default GetPlaylist;
