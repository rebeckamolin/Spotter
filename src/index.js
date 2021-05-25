import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GameContextProvider from "./Contexts/GameContext";

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
