import React, { Component } from "react";
import "./WikiBox.css";

export default class WikiBox extends Component {
  state = { content: "" };

  componentDidMount() {
    // # Register self as an observer for
    // # the event when a d3js node is clicked
    // # and the html content is fetched.
    let { callbackManager } = this.props;
    callbackManager.registerObserver(
      // # Target cls and func name.
      "Graph",
      "containerCallbackOnNodeClick",
      // # Ref to self and callback.
      this,
      "componentDidMount",
      (txt) => {
        this.setState({ content: txt });
      }
    );
  }

  render() {
    return (
    <div className="article-wrapper">
        <div  className="article-content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>
    );
  }
}
