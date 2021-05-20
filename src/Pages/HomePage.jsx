import React, { useState, useEffect, useContext } from "react";
import GetPlaylist from "../Components/GetPlaylist";
import SetupGame from "../Components/SetupGame";
import MySongs from "../Components/MySongs";
import axios from "axios";
import { PlaylistContext } from "../Contexts/PlaylistContext";

const HomePage = () => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [buttonName, setButtonName] = useState("See Playlist");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (isPlaylistOpen) setButtonName("Choose songs");
    else setButtonName("See Playlist");
  }, [isPlaylistOpen]);

  return (
    <div className="mainContainer">
      <h1>Spotter</h1>
      {!gameStarted ? (
        <SetupGame gameStartedState={[gameStarted, setGameStarted]} />
      ) : (
        <div>
          <button onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}>
            {buttonName}
          </button>
          {isPlaylistOpen ? <MySongs /> : <GetPlaylist />}
        </div>
      )}
    </div>
  );
};
export default HomePage;

// return (
//   <div className="mainContainer">
//     <h1>Spotter</h1>
//     {!start ? (
//       <StartGame />
//     ) : (
//       <div>
//         <button onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}>
//           {buttonName}
//         </button>
//         {isPlaylistOpen ? <MySongs /> : <GetPlaylist />}
//       </div>
//     )}
//   </div>
// );
