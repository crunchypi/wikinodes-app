import React, { Component } from "react";
import "./NavBar.css";
import ConfigBox from "../cfgbox/ConfigBox.js";

export default class NavBar extends Component {
  render() {
    return (
      <div className="topnav background-2">
        <div className="title">WikiNodes (prototype)</div>
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
