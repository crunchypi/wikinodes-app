import React, { Component } from "react";
import "./App.css";
import Graph from "./components/graph/Graph";
import WikiBox from "./components/wikibox/WikiBox";
import ConfigBox from "./components/cfgbox/ConfigBox.js";
import SearchBar from "./components/searchbar/SearchBar.jsx";

import CallbackManager from "./callbackmanager/callbackmanager.js";

export default class App extends Component {
  state = { callbackManager: new CallbackManager() };

  render() {
    return (
      <div className="App navbar">
        <div className="title">WikiNodes</div>
        <SearchBar callbackManager={this.state.callbackManager} />
        <div className="main-container">
          <div className="graph-box">
            <Graph callbackManager={this.state.callbackManager} />
          </div>

          <WikiBox callbackManager={this.state.callbackManager} />
        </div>
        <ConfigBox />
      </div>
    );
  }
}
