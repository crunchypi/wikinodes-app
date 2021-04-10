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
                    <div className="graph-box">
                        <Graph callbackManager={this.state.callbackManager} />
                    </div>
                    <WikiBox callbackManager={this.state.callbackManager} />
                </div>
                <div className="footer">
                    <a className="wiki-att" href="https://wikimediafoundation.org/">Attribution: Wikimedia Foundation</a>
                    <span><br></br>Creative Commons Attribution-ShareAlike 3.0 Unported License (CC BY-SA) </span>
                    <span><br></br> GNU Free Documentation License (GFDL)</span>
                </div>
            </div>
        );
    }
}
