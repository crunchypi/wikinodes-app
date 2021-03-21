import React, { Component } from "react";
import "./NavBar.css";
import ConfigBox from "../cfgbox/ConfigBox.js";

export default class NavBar extends Component {

render() {
    return (
        <div className="topnav background-2">
          <div className="title">WikiNodes</div>
          <a href="./app">The team</a>
          <a href="./app">User guide</a>
          <div className="dropdown">
          <button className="dropbtn">
            Customize
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
          <ConfigBox /> 
          </div>
        </div>
      </div>
    );
  }

}