import React, { useState, useEffect } from "react";
import axios from "axios";
import SpotterPlaylistView from "./SpotterPlaylistView";
import ThumbsUp from "../images/thumbs-up-transparent.png";
import ThumbsDown from "../images/thumbs-down-transparent.png";
import Pause from "../images/pause.png";
import Play from "../images/play.png";

const GetPlaylist = ({ top50Tracks, spotterPlaylistId }) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(top50Tracks[0].track);
  const [spotterPlaylist, setSpotterPlaylist] = useState([]);
  const [loading] = useState(false);
  const [buttonName, setButtonName] = useState("See Playlist");
  const playerBtns = { Pause, Play };
  const [player, setPlayer] = useState(playerBtns.Play);
  const [audio, setAudio] = useState();

  const SPOTTER_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${spotterPlaylistId}/tracks`;

  //Change currentTrack to the next song in order. Add the liked song to Spotify playlist
  const handleLikeClick = () => {
    addNewSongToPlaylist();
    getNextSong();
  };

  //Change currentTrack to the next song in order.
  const getNextSong = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayer(playerBtns.Play);
    setIndex(index + 1);
  };

  //Controlls the sound and play/pause buttons
  const playerToggle = () => {
    if (audio !== null) {
      if (audio.paused) {
        audio.play();
        setPlayer(playerBtns.Pause);
      } else {
        audio.pause();
        setPlayer(playerBtns.Play);
      }
    } else {
      alert(
        "no song avaliable :( But like it and find it in your Spotter playlist on Spotify!"
      );
    }
  };

  useEffect(() => {
    setAudio(document.getElementById(currentTrack.preview_url));
  }, [currentTrack]);

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

        if (response.status !== 201) {
          console.log("In addNewSongToPlaylist, status:,", response.status);
        }

      } catch (err) {
        console.error(err);
      }
    } else {
      alert(
        "No need for doubles! This track is already in your Spotter playlist!"
      );
    }
  };

  //Get Your personal Spotter playlist where your songs will be added
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

  //Toggles the see playlist/game button
  useEffect(() => {
    if (isPlaylistOpen) {
      setButtonName("Choose songs");
      setPlayer(playerBtns.Play);
      audio.pause();
      audio.currentTime = 0;
    } else {
      setButtonName("See Playlist");
    }
  }, [isPlaylistOpen]);

  //Makes sure the whole list is saved before countinuing
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
                playerToggle();
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
              // autoplay
              name="media"
              key={currentTrack.preview_url}
              id={currentTrack.preview_url}
              onEnded={() => setPlayer(playerBtns.Play)}
            >
              <source src={currentTrack.preview_url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      )}
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
    </>
  );
};

export default GetPlaylist;
