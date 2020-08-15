import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "router";
import TopBar from "components/top-bar";
import { CurrentUserProvider } from "contexts/current-user-context";
import CurrentUserChecker from "components/current-user-checker";

const App = () => {
  return (
    <div>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <TopBar />
            <Routes />
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
