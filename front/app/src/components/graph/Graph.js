import React, { Component } from 'react'

import D3Graph from '../../graph/d3graph.js'
import {newGraphFlat} from '../../graph/utils.js'



export default class Graph extends Component {
    state = {d3graph:null}

    componentDidMount() {
        // # Define new D3Graph abstraction obj.
        let g = new D3Graph(
            // # graphbody is the target html element.
            '#graphbody', 
            400, 
            300
        )
        g.replaceGraphUsingTitle()
        this.setState({
            d3graph: g,
        })
    }
    // # Button action: Add a new graph node.
    addToGraph = () => {
        let g = this.state.d3graph
    }

    render() {
        return (
            <div id='graphbody'>
                <button onClick={this.addToGraph}> Click me!</button>
            </div>
        )
    }
}
