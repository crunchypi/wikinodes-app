import {nodeSingle, nodeNeigh, nodeRand, checkNeighs} from '../api/api.js'
import GRAPHCONFIG from './config.js'

// # This file contains code for managing graph data, which
// # is intended to be used internally by d3js state (found
// # inside this folder).

// # The purpose of Node(s) is to be used inside Graph and
// # contain values which are provided by the api -- also
// # additional state that is set and used by d3js.

// # The graph data-structure inside Graph is a bit special;
// # it stores nodes inside a hashmap, where keys are id's
// # and values are Node(s) with those id's (id's are given
// # by the api and server db, so should be unique). Edge(s),
// # on the other hand, are stored inside an array and contain
// # id's (from&to) of Nodes, which are used to access the
// # aforementioned hashmap.


// # Simple store of data provided by the API (i.e.
// # wiki nodes in the db). Will also get data from
// # d3js. 
export class Node {
    constructor(apiJSON, preserved) {
        // # API data.
        this.id = apiJSON.id
        this.title = apiJSON.title
        this.html = ""
        // # Generations are how long a node has been
        // # around. The Graph evolves by fetching new
        // # nodes in batches, and each batch is a gen.
        // # This is used to flush nodes that are too old.
        this.generation = 0
        // # This value is used for special nodes which
        // # should be preserved on generation flushes.
        this.preserved = preserved
    }
}

// # Simple store of Node IDs -- used to access hashmap
// # in Graph to retrieve the associated Nodes.
export class Edge {
    constructor(fromID, toID) {
        this.fromID = fromID
        this.toID = toID
    }
}

export class Graph {
    constructor() {
        // # Keys: ID, Vals: Node(s) with those IDs
        this.nodes = {}
        // # Array of Edge(s), which have keys to
        // # the hashmap above.
        this.edges = []
    }

    // # Returns all nodes contained in this instance in a
    // # format that works for D3JS.
    formatD3Nodes() {
        return Object.values(this.nodes)
    }
    // # Returns all edges contained in this instance in a
    // # format that works for D3JS.
    formatD3Edges() {
        return this.edges.map(e => {
             return  {
                'source': this.nodes[e.fromID],
                'target': this.nodes[e.toID]
            }
        })
    }
    // # Get all special nodes (marked as preserved) contained 
    // # in this instance -- in an array that is ordered by their
    // # generations (ascending order).
    preservedNodeChan() {
        return Object.values(this.nodes)
            .filter(node => {return node.preserved})
            .sort((n, m) => {return n.generation - m.generation})
    }

    // # Removes all expired data, specifically Nodes that have exceeded
	// # the specified <GRAPHCONFIG.graphGenerationCount> and all associated
	// # edges. This also ticks the generation count in each Node. Toggling
	// # <force> to true will also removed all preserved Nodes.
    trimGeneration(force=false) {
        // # Trim Node(s) & tick them.
        Object.values(this.nodes).forEach(node => {
            node.generation++
            if (node.preserved == false || force == true) {
                if (node.generation > GRAPHCONFIG.graphGenerationCount) {
                    delete this.nodes[node.id]
                }
            }
        })
        // # Trim Edge(s).
        this.edges = this.edges.filter(edge => {
            return (
                this.nodes[edge.fromID] != undefined &&
                this.nodes[edge.toID] != undefined
            )
        })
    }

    // # Re-calculates all edges by checking with the api.
    // # As such, this method can be very expensive.
    async recalculateEdges() {
        // # Remove all expired data.
        this.trimGeneration()

        // # Create a cartesian product such that each element 
        // # in <candidates> are unique ordered pairs consisting 
        // # of Node IDs -- in all variations except when n=n.
        let candidates = []
        let ids = Object.keys(this.nodes)
        for (let i=0; i<ids.length; i++) {
            for (let j=0; j<ids.length; j++) {
                if (i != j) {
                    candidates.push([ids[i], ids[j]])
                }
            }    
        }
        // # Check the cartesian product with the API. This will return
        // # another array of booleans with a 1:1 mapping to <candidates>.
        let confirmations = await(checkNeighs(candidates.map(pair => {
            // # Map each candidate such that both elements are titles.
            // # This is required by the api.
            return [this.nodes[pair[0]].title, this.nodes[pair[1]].title]
        })))

        this.edges = candidates
            // # Only use the ordered pairs in <candidates> that
            // # have been confirmed in <confirmations>.
            .filter((_, index) => {return confirmations[index]})
            // # Map ordered pairs into Edge objects.
            .map(pair => {return new Edge(pair[0], pair[1])})

    }


    // # This method evolves this Graph instance. It uses a seed,
    // # which is expected to be a Node (or undefined for random).
    // # The seed will be added to this graph, along with any
    // # neighbours (disabled with <pullNeigh>=false) which are 
    // # found by the api. This method also recalculates all edges
    // # at the end (and ticks generations).
    async addGenerationBySeed(seedNode=undefined, pullNeigh=true) {
        let newNodes = {}
        // # Get random node if seedNode is not set.
        if (seedNode == undefined) {
            let rand = await nodeRand(1)
            seedNode = rand[0]
            seedNode = new Node(rand[0], true)
        }
        newNodes[seedNode.id] = seedNode

        // # Optionally get neighbours of seed.
        if (pullNeigh==true) {
            // # Get and add new nodes.
            let neighsOfSeed = await nodeNeigh(
                seedNode.title, [], GRAPHCONFIG.graphNeighbourCount
            )
            neighsOfSeed.forEach(neigh => {
                newNodes[neigh.id] = new Node(neigh, false)
            })
        }
        // # Expand the internal hashmap before re-calculating edges.
        this.nodes = Object.assign(this.nodes, newNodes)
        // # NOTE: This is a naive implementation, or a shortcut,
        // # because many of the edges are already known. For 
        // # instance <seedNode> is obviously connected to
        // # <neighsOfSeed>. Also, the edges in this.edges are
        // # known. This is left as a TODO.
        await this.recalculateEdges()
    }
}
