// # Config for this folder.

function clamp(val, min, max) {
	if (val < min) {val = min}
	if (val > max) {val = max}
	return val
}


let GRAPHCONFIG = {
    // # Used to identify groups(nodes, links, etc)
    d3containerName: 'g',
    // # Background color for whole d3 thing.
    svgBackgroundColor: '#1f1d2b', // #202020',
	// # Graph dimensions.
	graphWidth: 400,
	graphHeight: 400,
    // # ------------ nodes ------------------------------ # //
    // # Dynamic node size. <w> & <h> are width and height
    // # of the d3 svg. <c> is the total node count.
	nodeSizeMin: 20,
	nodeSizeMax: 50,
	nodeSizeMultiplier: 1,
    nodeSize: (nodeCount) => {
		let w = GRAPHCONFIG.graphWidth
		let h = GRAPHCONFIG.graphHeight
		let c = clamp(nodeCount, 1, nodeCount)
		let maxRadius = Math.sqrt(w*h) / c
		let newRadius = maxRadius / 3 * GRAPHCONFIG.nodeSizeMultiplier
		return clamp(newRadius, GRAPHCONFIG.nodeSizeMin, GRAPHCONFIG.nodeSizeMax)
    },
    // # Color of all nodes. <n> is a Node type.
	nodeColorBrightnessMin:20,
	nodeColorBrightnessMax:100,
	nodeColorBrightness:50,
	nodeColorHistoryMultiplier:40,
    nodeColor: (n) => {
		let brighness = clamp(
			GRAPHCONFIG.nodeColorBrightness,
			GRAPHCONFIG.nodeColorBrightnessMin,
			GRAPHCONFIG.nodeColorBrightnessMax
		)
		// # Generation color modifier (additional brighness per gen.)
		let genModi = n.generation * GRAPHCONFIG.nodeColorHistoryMultiplier
        let r = brighness + genModi
        let b = brighness + genModi
		r = clamp(r, 0, 255)
		b = clamp(r, 0, 255)
        r = r.toString(16)
        b = b.toString(16)
		// # Override to green if node is the current select.
		return n.generation == 0? '#00ff33' : `#${r}00${b}` 

    },
    // # ------------ edges ------------------------------ # //
    linkWidth: 2,
    linkColor: '#555555',
    // # Dynamic link dist. <w> & <h> are width and height
    // # of the d3 svg. <c> is the total node count.
	linkDistanceMin: 50,
	linkDistanceMax: 500,
	linkDistanceMultiplier: 1,
    linkDistance: (nodeCount) => {
		let newSize = GRAPHCONFIG.nodeSize(nodeCount)
		return clamp(
				newSize,
				GRAPHCONFIG.linkDistanceMin,
				GRAPHCONFIG.linkDistanceMax
		)
	},

    // # ------------ labels ------------------------------ # //
    labelOffsetX:4,
    labelOffsetY:2,
    labelColor:'#ffffff',

    // # ------------ graph ------------------------------ # //
	graphNeighbourCount: 3,
    graphGenerationCount: 3
}
export default GRAPHCONFIG
