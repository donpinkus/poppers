import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./Store";
import bugsnag from "bugsnag-js";

import { polyfill } from "mobile-drag-drop";

import "./styles/App.scss";
import Home from "./Home";

// Bugsnag logging
const client = bugsnag("49b3d61b351cbb000ab9d82993d4c991");

polyfill();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Route path="*" component={Home} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
