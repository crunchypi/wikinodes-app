import React, { Component } from 'react'

import D3Graph from '../../graph/d3graph.js'

export default class GraphExample extends Component {
    state = {d3graph:null}

    componentDidMount() {
        // # Define new D3Graph abstraction obj.
        let g = new D3Graph(
            // # graphbody is the target html element.
            '#graphbody', 
            400, 
            300
        )
        // # Add dummy nodes.
        g.addNode('1')
        g.addNode('2')
        g.addNode('3')
        g.addLink('1', '2')
        g.addLink('2', '3')
        g.addLink('3', '1')
        // # Start draw and physics update loop.
        g.apply()

        this.setState({
            d3graph: g,
        })
    }
    // # Button action: Add a new graph node.
    addToGraph = () => {
        let g = this.state.d3graph
        g.addNode('4')
        g.addLink('4', '3')
        g.apply()
    }

    render() {
        return (
            <div id='graphbody'>
                <button onClick={this.addToGraph}> Click me!</button>
            </div>
        )
    }
}
