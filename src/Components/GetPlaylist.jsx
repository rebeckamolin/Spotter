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
  const [loading, setLoading] = useState(true);
  const newUri = tUri.replaceAll(":", "%3A");
  const SINGLE_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${listId}/tracks`;
  console.log("tUri", tUri);
  console.log(listId);
  console.log(newUri);
  console.log(`${SINGLE_PLAYLIST_ENDPOINT}?uris=${newUri}`);

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

  const handleGetPlaylist = () => {
    const { access_token, expires_in } = getReturnedParamsFromSpotifyAuth(
      window.location.hash
    );
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("accessToken", access_token);

    axios
      .get(PLAYLIST_50_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        setTracks(response.data.items);
        setCurrentTrack(response.data.items[0].track);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getNextSongLike = () => {
    setTUri(tracks[index].track.uri);
    // addNewSongToPlaylist();

    setCurrentTrack(tracks[index + 1].track);
    setIndex(index + 1);
  };
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

  return loading ? (
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
        <video
          controls=""
          // autoplay=""
          name="media"
          key={currentTrack.preview_url}
          id={currentTrack.preview_url}
        >
          <source src={currentTrack.preview_url} type="audio/mpeg" />
        </video>
      </div>
    </div>
  );
};

export default GetPlaylist;
