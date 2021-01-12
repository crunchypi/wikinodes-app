// # Config for this folder.



let GRAPHCONFIG = {
    // # Used to identify groups(nodes, links, etc)
    d3containerName: 'g',
    // # Background color for whole d3 thing.
    svgBackgroundColor: '#202020',
    // # ------------ nodes ------------------------------ # //
    // # Dynamic node size. <w> & <h> are width and height
    // # of the d3 svg. <c> is the total node count.
    defaultNodeSize: (w, h, c) => {
        c = c < 1 ? 1 : c
        return (Math.sqrt(w*h) / c / 3)// - (c * 15)
    },
    // # Color of all nodes. <n> is a Node type.
    defaultNodeColor: (n) => {
        let r = 100 + (n.generation * 15)
        let b = 100 + (n.generation * 15)
        r = r.toString(16)
        b = b.toString(16)
        return `#${r}00${b}` 

    },
    // # ------------ edges ------------------------------ # //
    defaultLinkWidth: 2,
    defaultLinkColor: '#555555',
    // # Dynamic link dist. <w> & <h> are width and height
    // # of the d3 svg. <c> is the total node count.
    defaultLinkDistance: (w, h, c) => {
        c = c < 1 ? 1 : c
        return (Math.sqrt(w*h) / 2) - (c * 15)
    },

    // # ------------ labels ------------------------------ # //
    defaultLabelOffsetX:4,
    defaultLabelOffsetY:2,
    defaultLabelColor:'#ffffff',

    // # ------------ graph ------------------------------ # //
    defaultGraphNeighbourCount: 3,
    defaultGraphGenerationCount: 3
}
export default GRAPHCONFIG