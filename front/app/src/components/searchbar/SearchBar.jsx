import React, { Component } from "react";
import Spinner from "../spinner/Spinner";
import * as api from "../../api/api.js";

import "../spinner/Spinner.css";
import "./SearchBar.css";

export default class SearchBar extends Component {
    state = { currentText: "", resultReturned: true };

    // # Called when text input is completed. Uses input to
    // # fetch content from the backend and send it along to
    // # everyone that is registered in the callbackmanager
    // # for this func. Not super clean impl but better than
    // # the previous alternative.
    done = () => {
        // # Get observers.
        let { callbackManager } = this.props;
        let callbacks = callbackManager.callbackFuncs(
            // # Curernt cls and func.
            "SearchBar",
            "done"
        );
        // # Try request and pass to observers.
        api
            .searchArticlesByContent(this.state.currentText, 1)
            .then((resp) => {
                if (resp.length == 0) {
                    this.setState({ resultReturned: false });
                    return;
                }
                this.setState({ resultReturned: true });
                // # Send to all observers.
                callbacks.forEach((f) => f(resp));
            })
            .catch((_) => {
                this.setState({ resultReturned: false });
            });
    };

    textInput = () => {
        return (
            //red alert outline if nothing found in search is defined in state
            <div
                className={
                    this.state.resultReturned ? "search-bar" : "search-bar red-alert"
                }
            >
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
                <button className="search-btn" type="submit"
                    onClick={(e) => {
                        this.done();
                    }}>
                    <span className="magnify"></span>
                </button>
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
