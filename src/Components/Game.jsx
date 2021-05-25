import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactCardFlip from "react-card-flip";
import { GameContext } from "../Contexts/GameContext";
import SpotterPlaylistView from "./SpotterPlaylistView";
import ThumbsUp from "../images/thumbs-up-transparent.png";
import ThumbsDown from "../images/thumbs-down-transparent.png";
import Pause from "../images/pause.png";
import Play from "../images/play.png";

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_50_ENDPOINT =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks";

const GetPlaylist = ({ top50Tracks, spotterPlaylistId }) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(top50Tracks[0].track);
  const [spotterPlaylist, setSpotterPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonName, setButtonName] = useState("See Playlist");

  const SPOTTER_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${spotterPlaylistId}/tracks`;

  //en låt gillas => ändrar currenttrack till nästa samt ändrar TUri => newUri => lägger till låten i listan
  const handleLikeClick = () => {
    addNewSongToPlaylist();
    getNextSong();
  };

  //En låt ogillas => ändrar currentTrack till ny låt
  const getNextSong = () => {
    setIndex(index + 1);
  };

  const pauseTrack = () => {
    const pause = document.getElementById(currentTrack.preview_url);
    if (pause !== null) {
      if (pause.paused) {
        pause.play();
        setPlayer(playerBtns.Pause);
      } else {
        pause.pause();
        setPlayer(playerBtns.Play);
      }
    } else {
      alert("no preview avaliable");
    }
  };

  const playerBtns = { Pause, Play };
  const [player, setPlayer] = useState(playerBtns.Play);

  const addNewSongToPlaylist = async () => {
    if (!spotterPlaylist.find((item) => item.track.id === currentTrack.id)) {
      const uri = currentTrack.uri.replaceAll(":", "%3A");
      try {
        const response = await axios.post(
          `${SPOTTER_PLAYLIST_ENDPOINT}?uris=${uri}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.accessToken,
            },
          }
        );

        if (response.status === 201) {
          console.log(response.status, response.data);
        } else {
          console.log("In addNewSongToPlaylist, status:,", response.status);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Track already in Spotter playlist!");
      alert("Track already in Spotter playlist!");
    }
  };

  const getSpotterPlaylist = async () => {
    try {
      const response = await axios.get(SPOTTER_PLAYLIST_ENDPOINT, {
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

  useEffect(() => {
    getSpotterPlaylist();
  }, []);

  useEffect(() => {
    if (isPlaylistOpen) {
      setButtonName("Choose songs");
    } else {
      setButtonName("See Playlist");
    }
  }, [isPlaylistOpen]);

  useEffect(() => {
    if (index < top50Tracks.length) {
      setCurrentTrack(top50Tracks[index].track);
    } else {
      console.log("END OF TOP 50");
    }
  }, [index]);

  return loading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <button
          className="playlistBtn"
          onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
        >
          {buttonName}
        </button>
      </div>
      {isPlaylistOpen ? (
        <SpotterPlaylistView
          endpoint={SPOTTER_PLAYLIST_ENDPOINT}
          isPlaylistOpen={{ isPlaylistOpen, setIsPlaylistOpen }}
        />
      ) : (
        <div className="card">
          <div className="image">
            <img src={currentTrack.album.images[0].url} alt="" />
          </div>
          <p>{currentTrack.name}</p>
          <p>{currentTrack.artists[0].name}</p>
          <div className="playerContainer">
            <button className="likeBtn">
              <img
                src={ThumbsUp}
                alt=""
                onClick={() => {
                  handleLikeClick();
                }}
              />
            </button>
            <button
              className="playerBtn"
              onClick={() => {
                pauseTrack();
              }}
            >
              <img src={player} alt="" />
            </button>
            <button className="dislikeBtn">
              <img
                src={ThumbsDown}
                alt=""
                onClick={() => {
                  getNextSong();
                }}
              />
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
      )}
    </>
  );
};

export default GetPlaylist;
