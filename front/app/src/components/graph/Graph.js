import React, { Component } from 'react'

import D3Graph from '../../graph/d3graph.js'
import {newGraphFlat} from '../../graph/utils.js'
import {nodeSingle} from '../../api/api.js'


export default class Graph extends Component {
    state = {d3graph:null, nodeHTML:":O"}

    // # Sets up d3graph in state with a rand graph.
    componentDidMount() {
        // # Define new D3Graph abstraction obj.
        let g = new D3Graph(
            // # graphbody is the target html element.
            '#graphbody', 
            400, 
            300,
            // # Pass object containing callbacks to obj.
            {callback: {
                nodeClick:this.containerCallbackOnNodeClick
            }}
        )
        g.replaceGraphUsingTitle()
        this.setState({
            d3graph: g,
        })
    }

    // # Callback that is meant to be called from D3Graph
    // # object when a node is clicked. This will call
    // # another callback in the container of this component,
    // # which should update the state with html from a node.
    containerCallbackOnNodeClick = (e, node) => {
        // # Get node from the db by using the title of <node>.
        nodeSingle(node.id, false)
            .then(res => {
                // # Bubble up.
                this.props.updateSideBar(res[0].html)
            })
            .catch(rej => {
                console.log(rej)
            })
    }
    
    render() {
        return (
            <div id='graphbody'/>
        )
    }
}
