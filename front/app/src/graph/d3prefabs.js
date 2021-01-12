import * as d3 from 'd3'
import GRAPHCONFIG from './config.js'



// # Mount and get SVG object.
export function svg(config) {
    let {divID, width, height} = config
    let svg = d3.select(divID)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('border', '1px solid black')
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', GRAPHCONFIG.svgBackgroundColor)
    return svg
}

// # Force simulation prefab.
export function forceSimulation(config) {
    let {width, height, nodeCount} = config

    return d3.forceSimulation()
            .force("link",   d3.forceLink().id(n => n.id)
                .distance(GRAPHCONFIG.defaultLinkDistance(
                    width, height, nodeCount
                )))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width/2, height/2))
}

// # Get a new link group (with old appended if it
// # is provided).
export function linkGroup(config) {
    let {svg, edges, oldLinkGroup} = config

    let newLinkGroup = svg
            .append(GRAPHCONFIG.d3containerName)
            .attr("class", "links")
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .attr("stroke-width", GRAPHCONFIG.defaultLinkWidth)
            .attr('stroke', GRAPHCONFIG.defaultLinkColor)

    if (oldLinkGroup != null) {
        newLinkGroup.enter().append(oldLinkGroup)
    }
    return newLinkGroup
}

// # Get a new node group (with old appended if it
// # is provided).
export function nodeGroup(config) {
    let {svg, nodes, clickEvent,
            oldNodeGroup, width, height} = config

    // # New group.
    let newNodeGroup = svg
        .append(GRAPHCONFIG.d3containerName)
        .attr("class", "nodes")
        .selectAll(GRAPHCONFIG.d3containerName)
        .data(nodes)
        .enter().append(GRAPHCONFIG.d3containerName)
        .on('click', clickEvent)
    // # Visual.
    newNodeGroup.append("circle")
        .attr("r", GRAPHCONFIG.defaultNodeSize(
            width, height, nodes.length
        ))
        // .attr("fill", GRAPHCONFIG.defaultNodeColor)
        .attr("fill", (n) => {
            console.log('xxx', n)
            return GRAPHCONFIG.defaultNodeColor(n)})

    // # Label.
    newNodeGroup.append("text")
        .text(n => n.title)
        .attr('x', GRAPHCONFIG.defaultLabelOffsetX)
        .attr('y', GRAPHCONFIG.defaultLabelOffsetY)
        .attr('stroke', GRAPHCONFIG.defaultLinkColor)

    // # Merge with old.
    if (oldNodeGroup != null) {
        newNodeGroup.enter().append(oldNodeGroup)
    }
    return newNodeGroup
}

// # Starts rendering and physics loop.
export function apply(config) {
    let {nodes, nodeGroup, edges,
            linkGroup, forceSimulation} = config

    forceSimulation
            .nodes(nodes)
            .on('tick', () => {
                // # Update loop task for physics sim.
                linkGroup
                    .attr('x1', (n) => { return n.source.x })
                    .attr('y1', (n) => { return n.source.y })
                    .attr('x2', (n) => { return n.target.x })
                    .attr('y2', (n) => { return n.target.y })
                // # Update nodes.
                nodeGroup
                    .attr('transform', (n) => {
                        return `translate(${n.x}, ${n.y})`
                    })
            })
    forceSimulation
            .force('link')
            .links(edges)

}