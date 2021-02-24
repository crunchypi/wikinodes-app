import React, { Component } from "react";
import Spinner from "../spinner/Spinner";
import "../spinner/Spinner.css";
import "./SearchBar.css";

export default class SearchBar extends Component {
  state = { currentText: "" };

  done = () => {
    let { callbackManager } = this.props;
    let callbacks = callbackManager.callbackFuncs(
      // # Curernt cls and func.
      "SearchBar",
      "done"
    );
    // # Send to all observers.
    callbacks.forEach((f) => f(this.state.currentText));
  };

    //if nothing found in search add class red-alert alongside className search-bar
    //in the first div

    //while text search retrieval in action show loading animation - add <Spinner />
    // toggle the element visibility
    //let toggle = (elem) => {
        //   elem.classList.toggle('hidden');
    //}

    // toggle
    //toggle(document.querySelector('.loader'));

  

  textInput = () => {
    return (
      <div className="search-bar red-alert">
        <input
          type="text"
          className="form-control"
          placeholder="Search your topic!"
          // # Update state to current field value.
          onChange={(e) => {
            this.setState({ currentText: e.target.value });
          }}
          // # On enter; call this.done.
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.done();
            }
          }}
        />
      </div>
    );
  };
  render() {
    return (
      <div className="search-container">
        {this.textInput()}
        <Spinner />
      </div>
    );
  }
}
