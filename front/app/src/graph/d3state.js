

import * as d3 from 'd3'
import * as d3prefabs from './d3prefabs.js'
import {Graph} from './graphtypes.js'
import GRAPHCONFIG from './config.js'



export default class D3State {
    constructor(divID, width, height, containerCallbacks) {
        // # Accessed with this div tag.
        this.divID = divID

        // # Dimensions of svg(/canvas?)
        this.width = width
        this.height = height

        // # State of prefab objects.
        this.svg = null
        this.forceSimulation = null
        this.linkGroup = null
        this.nodeGroup = null
        
        // # Graph state.
        this.data = new Graph(
            GRAPHCONFIG.defaultGraphGenerationCount, 
            GRAPHCONFIG.defaultGraphNeighbourCount
        )
        // # Force an initial setting.
        this.setSVG()
        this.setForceSimulation()
        this.setLinkGroup()
        this.setNodeGroup()
        // # Keep track of required callbacks.
        this.containerCallbacks = containerCallbacks
    }

    // # Simply resets this.graph.
    async resetGraph() {
        this.data.nodes = {}
        this.data.edges = []
        this.data.addGenerationBySeed().then(_ => this.apply())
    }

    // # Event for node click.
    onNodeClick = (e, node) => {
        this.containerCallbacks.callback.nodeClick(e, node)
        this.data.addGenerationBySeed(node).then(_ => {
            this.setForceSimulation()
            this.apply()
        })
    }

    // # Mount and set SVG object.
    setSVG() {
        this.svg = d3prefabs.svg({
            divID:  this.divID,
            width:  this.width,
            height: this.height
        })
    }

    // # Setup of force simulation prefab.
    setForceSimulation() {
        this.forceSimulation = d3prefabs.forceSimulation({
            width:      this.width,
            height:     this.height,
            nodeCount:  this.data.formatD3Nodes().length
        })
    }

    // # Sets/replaces a new link group.
    setLinkGroup() {
        this.linkGroup = d3prefabs.linkGroup({
            svg:            this.svg,
            edges:          this.data.formatD3Edges(),
            oldLinkGroup:   this.linkGroup
        })
    }

    // # Sets/replaces a new node group.
    setNodeGroup() {
        this.nodeGroup = d3prefabs.nodeGroup({
            svg:            this.svg,
            nodes:          this.data.formatD3Nodes(),
            clickEvent:     this.onNodeClick,
            oldNodeGroup:   this.nodeGroup,
            width:          this.width,
            height:         this.height
        })
    }


    // # Starts rendering and physics loop.
    // # Each call to this func includes all
    // # new nodes & links/edges in this.data
    apply() {
        // # Clear old (AA: room for improvements).
        // # This prevents node duplication.
        this.svg.selectAll(
            GRAPHCONFIG.d3containerName).remove()
        // # Why was this here? Afraid to remove it :<
        // this.svg.selectAll(containerName).remove()

        // # Set new.
        this.setLinkGroup()
        this.setNodeGroup()

        d3prefabs.apply({
            nodes:          this.data.formatD3Nodes(),
            nodeGroup:      this.nodeGroup,
            edges:          this.data.formatD3Edges(),
            linkGroup:      this.linkGroup,
            forceSimulation:this.forceSimulation
        })
    }
    
    
    
}