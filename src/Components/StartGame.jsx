// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { PlaylistContext } from "../Contexts/PlaylistContext";

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

// const StartGame = () => {
//   const [playlists, setPlaylists] = useState([]);
//   const { playlistId, trackUri, playlist, setStart } =
//     useContext(PlaylistContext);
//   // const [showPlaylist, setShowPlaylist] = playlist;
//   const [listId, setListId] = playlistId;
//   const [loading, setLoading] = useState(true);

//   const getAllPlaylists = () => {
//     axios
//       .get(PLAYLISTS_ENDPOINT, {
//         headers: {
//           Authorization: "Bearer " + localStorage.accessToken,
//         },
//       })
//       .then((response) => {
//         setPlaylists(response.data.items);
//         setLoading(false);
//         console.log("then 1");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const addNewPlaylist = () => {
//     axios
//       .post(
//         PLAYLISTS_ENDPOINT,
//         {
//           name: "Spotter",
//           description: "Spotter - New Music",
//           public: true,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.accessToken,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then()
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const checkPlaylistExists = () => {
//     // console.log("playlists", playlists);
//     const exists = playlists.find(
//       (playlist) => playlist.name.toLowerCase() === "spotter"
//     );

//     if (exists !== undefined) {
//       console.log("lägg till i befintlig lista");
//       setListId(exists.id);
//     } else {
//       console.log("skapa ny lista");
//       addNewPlaylist();
//     }
//   };

//   useEffect(() => {
//     if (!loading && playlists.length > 0) {
//       checkPlaylistExists();
//       //   console.log("hey");
//     }
//     return () => setStart(true);
//   }, [loading]);
//   //   useEffect(() => {
//   //       effect
//   //       return () => {
//   //           cleanup
//   //       }
//   //   }, [input])

//   return (
//     <div
//       className="card"
//       style={{
//         width: "432px",
//         height: "652px",
//       }}
//     >
//       <button onClick={getAllPlaylists}>Start game</button>
//     </div>
//   );
// };
// export default StartGame;
