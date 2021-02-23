import React, { Component } from "react";
import "./NavBar.css";


export default class NavBar extends Component {

    //include slider component in show hide / logic here

render() {
    return (
        <div className="topnav background-2">
        <div className="title">WikiNodes</div>
        <a href="./app">The team</a>
        <a href="./app">User guide</a>
        <button className="layout-btn">Change layout</button>
        <div className="dropdown">
          <button className="dropbtn">
            Customize
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a href="./app" >Option 1</a>
           
          </div>
        </div>
      </div>
    );
  }

}