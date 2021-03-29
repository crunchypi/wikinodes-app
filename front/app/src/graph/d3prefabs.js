import * as d3 from 'd3'
import GRAPHCONFIG from './config.js'



// # Mount and get SVG object.
export function svg(config) {
    let {divID, resizeCallback} = config
    // # width&height is not set because pre-existing
    // # dimensions aren't accurate. Instead, a resize
    // # event is triggered by the containing React comp.
    // # The resize event for d3 is defined further down
    // # in this func.
    let svg = d3.select(divID)
        .append('svg')

    d3.select(window)
        .on("resize", function(e) {
            svg.attr("width", e.target.innerWidth * 0.9);
            svg.attr("height", e.target.innerHeight * 0.9);
            resizeCallback()
    });
    // global zoom & ban behavior.
    let zoom = d3.zoom()
        .scaleExtent([1,1])     // change at your own risk -- seems buggy with
        .on('zoom', (e) => {    // other values (super jittery and other issues).
            svg.attr('transform', e.transform)
        })
    svg.call(zoom)
    return svg
}

// # Force simulation prefab.
export function forceSimulation(config) {
	let {forceCenterX, forceCenterY, collisionDistance, linkDistance} = config
	return d3.forceSimulation()
            .force('charge',  d3.forceManyBody())
            .force('center',  d3.forceCenter(forceCenterX, forceCenterY))
			.force('collide', d3.forceCollide(collisionDistance))
            .force('link',    d3.forceLink().id(n => n.id).distance(linkDistance))
}

// # Get a new link group (with old appended if it
// # is provided).
export function linkGroup(config) {
    let {svg, containerID, oldLinkGroup, edges, linkWidth, linkColor} = config
    let newLinkGroup = svg
            .append(containerID)
            .attr("class", "links")
            .selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .attr("stroke-width", linkWidth)
            .attr('stroke', linkColor)

    if (oldLinkGroup != null) {
        newLinkGroup.enter().append(oldLinkGroup)
    }
   return newLinkGroup
}

// # Get a new node group (with old appended if it
// # is provided).
export function nodeGroup(config) {
	let {svg, containerID, oldNodeGroup, nodes, nodeSize, nodeColorFunc,
			clickEvent, labelOffsetX, labelOffsetY, labelColor, linkGroup} = config

    // # New group.
    let newNodeGroup = svg
        .append(containerID)
        .attr("class", "nodes")
        .selectAll(containerID)
        .data(nodes)
        .enter().append(containerID)
        .on('click', clickEvent)
        .on('mouseover', (_, n) => {
            newNodeGroup
                .select('circle')
                .attr("opacity", m => n.id == m.id? 1: 0.2)
            newNodeGroup
                .select('text')
                .attr('opacity', m => n.id == m.id? 1: 0.2)
            linkGroup.style('opacity', (l, _) => {
                return l.source.id == n.id || l.target.id == n.id? 1: 0
            })
        })
        .on('mouseout', (_, n) => {
            newNodeGroup
                .select('circle')
                .attr('opacity', _ => 1)
            newNodeGroup
                .select('text')
                .attr('opacity', labelColor)
            linkGroup.style('opacity', _ => 1)
         })
    // # Visual.
    newNodeGroup.append("circle")
        .attr("r", nodeSize)
        .attr("fill", nodeColorFunc)
    // # Label.
    newNodeGroup.append("text")
        .text(n => n.title)
        .attr('x', labelOffsetX)
        .attr('y', labelOffsetY)
        .attr('stroke', labelColor)

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
