import React, { Component } from "react";
import "./App.css";
import Graph from "./components/graph/Graph";
import WikiBox from "./components/wikibox/WikiBox";
import SearchBar from "./components/searchbar/SearchBar.jsx";
import CallbackManager from "./callbackmanager/callbackmanager.js";
import NavBar from "./components/navbar/NavBar";

export default class App extends Component {
  state = { callbackManager: new CallbackManager() };

  //import Spinner from "./components/spinner/Spinner";
  //import ConfigBox from "./components/cfgbox/ConfigBox.js";
  
  render() {
    return (
      <div className="App">
        <NavBar />
        <SearchBar callbackManager={this.state.callbackManager} />
        <div className="main-container">
          <div className="graph-box" id="graph-wrapper">
            <Graph callbackManager={this.state.callbackManager} />
          </div>
          <WikiBox callbackManager={this.state.callbackManager} />
        </div>
      </div>
    );
  }
}
