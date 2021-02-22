import React, { Component } from 'react'
import "./SearchBar.css"

export default class SearchBar extends Component {
    state = {currentText: ""}
    
    done = () => {
        let {callbackManager} = this.props
        let callbacks = callbackManager.callbackFuncs(
            // # Curernt cls and func.
            "SearchBar", "done"
        )
        // # Send to all observers.
        callbacks.forEach(f => f(this.state.currentText))
    }

    textInput = () => {
        return (
            <div className="search-bar">
            <input
                type="text"
                className="form-control"
                placeholder="Search your topic!"
                // # Update state to current field value.
                onChange={(e)=>{this.setState({currentText:e.target.value})}}
                // # On enter; call this.done.
                onKeyDown={(e)=>{
                    if (e.key === 'Enter') {
                        this.done()
                    }
                }}
            />
        </div>
        )
    }
    render() {
        return (
            <div className="search-container">
                {this.textInput()}
            </div>
        )
    }
}
