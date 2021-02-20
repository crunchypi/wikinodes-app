import React, { Component } from 'react'
import D3State from '../../graph/d3state.js'
import * as api from '../../api/api.js'

export default class Graph extends Component {
    state = {d3state:null, nodeHTML:":O"}

    // # Sets up d3graph in state with a rand graph.
    componentDidMount() {
        // # Define new D3Graph abstraction obj.
        let g = new D3State(
            // # graphbody is the target html element.
            '#graphbody', 
            // # Pass object containing callbacks to obj.
            {callback: {
                nodeClick:this.containerCallbackOnNodeClick
            }}
        )
        g.resetGraph()
        this.setState({
            d3state: g,
        })
    }

    // # Callback that is meant to be called from D3Graph
    // # object when a node is clicked. This will fetch
    // # the html of that node and send it to all observers
    // # (observer pattern) as a callback.
    containerCallbackOnNodeClick = (_, node) => {
        // # Get all relevant observers and their callbacks.
        let {callbackManager} = this.props
        let callbacks = callbackManager.callbackFuncs(
            'Graph', 'containerCallbackOnNodeClick'
        )
        // # Add html to node if it has none, then
        // # use the callback to present that html.
        if (node.html == "") {
            api.searchHTMLByID(node.id)
                .then(res => {
                    // # Assign html in case the node is
                    // # used again at a later point.
                    node.html = res
                    callbacks.forEach(f => f(node.html))
                })
        } else {
            callbacks.forEach(f => f(node.html))
        }
    }
    
    render() {
        return (
            <div id='graphbody'/>
        )
    }
}
