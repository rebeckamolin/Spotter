import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/spotter" component={HomePage} />
        <Route path="/" component={SignInPage} />
      </Switch>
    </div>
  );
};

export default App;
