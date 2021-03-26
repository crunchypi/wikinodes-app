

import * as d3 from 'd3'
import * as d3prefabs from './d3prefabs.js'
import {Graph} from './graphtypes.js'
import GRAPHCONFIG from './config.js'


export default class D3State {
    constructor(divID, containerCallbacks) {
        // # Accessed with this div tag.
        this.divID = divID
		
        // # Graph state.
        this.data = new Graph()

        // # State of D3js prefab objects.
        this.svg = null
        this.forceSimulation = null
        this.linkGroup = null
        this.nodeGroup = null

        //state of graph wrapper for responsive sizing behaviour
        this.graphWrapper = [500,500] //default state?
        this.resizeWrapper()
        this.resizeAction()
        
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
        this.data.addInitialGeneration()
            .then(_ => {
                this.setForceSimulation()
                this.apply()
            })
    }

    // # Reset graph with specified seed data.
    async resetGraphUsingNode(nodeID, nodeTitle) {
        this.data.nodes = {}
        this.data.edges = []
        this.data.addInitialGeneration(nodeID, nodeTitle)
            .then(_ => {
                this.setForceSimulation()
                this.apply()
            })
    }
 
    // # Event for node click.
    onNodeClick = (e, node) => {
        this.containerCallbacks.callback.nodeClick(e, node)
        this.data.addInitialGenerationBySeedNode(node).then(_ => {
            this.setForceSimulation()
            this.apply()
        })
    }

    // # Mount and set SVG object.
    setSVG() {
        this.svg = d3prefabs.svg({
            divID:  this.divID,
            width:  GRAPHCONFIG.graphWidth,
            height: GRAPHCONFIG.graphHeight
        })
    }

    resizeWrapper(){
        d3.select('graph-wrapper').on("resize", resizeAction);
    }

    resizeAction() {
        width = window.innerWidth, height = window.innerHeight;
        svg.attr("width", width).attr("height", height);
        force.size([width, height]).resume();
      }

    // # Setup of force simulation prefab.
    setForceSimulation() {
		let l = this.data.formatD3Nodes().length
		this.forceSimulation = d3prefabs.forceSimulation({
			forceCenterX:		GRAPHCONFIG.graphWidth/2,
			forceCenterY:		GRAPHCONFIG.graphHeight/2,
			collisionDistance:	GRAPHCONFIG.nodeSize(l)*1.5,
			linkDistance:		GRAPHCONFIG.linkDistance(l)
		})
    }

    // # Sets/replaces a new link group.
    setLinkGroup() {
		this.linkGroup = d3prefabs.linkGroup({
			svg:			this.svg,
			containerID:	GRAPHCONFIG.d3containerName,
			oldLinkGroup:	this.linkGroup,
			edges:			this.data.formatD3Edges(),
			linkWidth:		GRAPHCONFIG.linkWidth,
			linkColor:		GRAPHCONFIG.linkColor
		})
    }

    // # Sets/replaces a new node group.
    setNodeGroup() {
		let l = this.data.formatD3Nodes().length
		this.nodeGroup = d3prefabs.nodeGroup({
			svg:			this.svg,
			containerID:	GRAPHCONFIG.d3containerName,
			oldNodeGroup:	this.nodeGroup,
			nodes:			this.data.formatD3Nodes(),
			nodeSize:		GRAPHCONFIG.nodeSize(l),
			nodeColorFunc:	GRAPHCONFIG.nodeColor,
			clickEvent:		this.onNodeClick,
			labelOffsetX:	GRAPHCONFIG.labelOffsetX,
			labelOffsetY:	GRAPHCONFIG.labelOffsetY,
			labelColor:		GRAPHCONFIG.labelColor
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
