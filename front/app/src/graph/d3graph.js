

import * as d3 from 'd3'

// # Name for graph.
const containerName = 'g'

// # Node settings
const defaultNodeSize = 5
const defaultNodeColor = '#990099'
const nodeIdentityProp = 'id'

// # Link settings.
const defaultLinkWidth = 0.4
const defaultLinkColor = '#000000'

// # Label settings
const defaultLabelOffsetX = 4
const defaultLabelOffsetY = 2
const defaultLabelData = (d) => {
    return d[nodeIdentityProp]
}

export default class D3Graph {
    constructor(id, width, height) {
        this.data = {'nodes':[], 'links':[]}
        this.svg = null
        this.forceSimulation = null
        this.linkPrefab = null
        this.nodePrefab = null

        // # Force an initial setting.
        this.setSVG(id, width, height)
        this.setForceSimulation(width, height)
    }

    // # Adds a node with <id> to this.graph.
    addNode(id) {
        let newNode = { 'id': id }
        this.data.nodes.push(newNode)
    }

    // # Adds a link/edge to this graph such that
    // #  {source:<from>, 'target':<to>}
    addLink(from, to) {
        let newLink = {'source': from, 'target': to }
        this.data.links.push(newLink)
    }

    // # Mounts svg to a html element with name <id>
    // # with the specified size.
    setSVG(id, width, height) {
        this.svg = d3.select(id)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid black')
    }

    // # Setup of force simulation in <this>
    setForceSimulation(width, height) {
        this.forceSimulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(
                (d) => { return d[nodeIdentityProp]})
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));
    }

    // # Sets/replaces a new link/edge group in <self>
    // # with link data in <this.data.links>
    setLinkGroup() {
        // # New
        let linkGroup = this.svg
            .append(containerName)
            .attr("class", "links")
            .selectAll("line")
            .data(this.data.links)
            .enter()
            .append("line")
            .attr("stroke-width", defaultLinkWidth)
            .attr('stroke', defaultLinkColor)

        // # Merge with old.
        if (this.linkPrefab != null) {
            linkGroup.enter().append(this.linkPrefab)
        }
        this.linkPrefab = linkGroup

    }

    // # Sets/replaces a new node group in <self>
    // # with link data in <this.data.nodes>
    setNodeGroup() {
        // # New group.
        let nodeGroup = this.svg
            .append(containerName)
            .attr("class", "nodes")
            .selectAll(containerName)
            .data(this.data.nodes)
            .enter().append(containerName)
        // # Visual.
        nodeGroup.append("circle")
            .attr("r", defaultNodeSize)
            .attr("fill", defaultNodeColor)
        // # Label.
        nodeGroup.append("text")
            .text(defaultLabelData)
            .attr('x', defaultLabelOffsetX)
            .attr('y', defaultLabelOffsetY);

        // # Merge with old.
        if (this.nodePrefab != null) {
            nodeGroup.enter().append(this.nodePrefab)
        }
        this.nodePrefab = nodeGroup
    }


    // # Starts rendering and physics loop.
    // # Each call to this func includes all
    // # new nodes & links/edges in this.data
    apply() {
        // # Clear old (AA: room for improvements).
        this.svg.selectAll(containerName).remove()
        this.svg.selectAll(containerName).remove()
        // # Set new.
        this.setLinkGroup()
        this.setNodeGroup()
        // # Update loop task for physics sim.
        const tickTask = () => {
            // # Update edges
            this.linkPrefab
                .attr('x1', (d) => { return d.source.x })
                .attr('y1', (d) => { return d.source.y })
                .attr('x2', (d) => { return d.target.x })
                .attr('y2', (d) => { return d.target.y })
            // # Update nodes.
            this.nodePrefab
                .attr('transform', (d) => {
                    return 'translate('+d.x+','+d.y+')'
                })
        }
        // # Apply force: nodes
        this.forceSimulation
            .nodes(this.data.nodes)
            .on('tick', tickTask)
        
        // # Apply force: edges
        this.forceSimulation
            .force('link')
            .links(this.data.links)
    }
    
    
    
}