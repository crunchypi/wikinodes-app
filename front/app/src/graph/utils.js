import {nodeSingle, nodeNeigh, nodeRand, checkNeighs} from '../api/api.js'



// # Expects an array of strings which represent titles
// # of nodes in the db; returns an array of index tuples 
// # which represents connectivity of said nodes.
// # Example: titles = ['a','b'], where 'a' is the title
// # of a node V and 'b' is a title of a node W. If
// # V connects to W but not the other way around then
// # the return is [[0,1]].
export async function adjacencyMatrixFlat(titles) {
    // # Cartesian product of indeces representing 'titles',
    // # excluing when x==x.
    let candidates = []
    for(let i=0; i<titles.length; i++) {
        for(let j=0; j<titles.length; j++) {
            if (i != j) {
                candidates.push([i,j])
            }
        }  
    }
    // # Query API for info on whether or not the titles represented
    // # by each ordered pair in the cartesian product (made above)
    // # are connected in that particular order. If following the
    // # example at the top of this func, then:
    // #    'candidates' = [[0,1],[1,0]]
    // #    'confirmations' = [true, false]
    let confirmations = await checkNeighs(candidates.map(pair => {
        // # Map indeces back to titles for query.
        return [titles[pair[0]], titles[pair[1]]]
    }))
    // # Only return ordered pairs which are confirmed to be
    // # connected.
    return candidates.filter((_, index) => {
        return confirmations[index]
    })
}

// # Creates a new graph of size 'nodeCount' with an
// # optional 'seed', which is expected to be a node
// # title in the db (if not provided, then it'll be
// # random). Return is a json with the following
// # format (example):
// # {
// #    titles:['a', 'b', 'c'],
// #    graph: [[0,1], [0,2], [0,3]]   
// # }
// # As suggested, the 'graph' property is a flat 
// # adjacency matrix, and in this particular example,
// # 'a' is connected to all other nodes. Do note that
// # 'graph' contains ordered pairs so direction matters.
export async function newGraphFlat(nodeCount=5, seed=undefined) {
    // # Contain all titles.
    let allTitles = [];
    // # Contain all ordered tuples (of indeces)
    let indeces = [];

    // # If seed is undefined, set one (random).
    if (seed == undefined) {
        let rand = await nodeRand(1);
        seed = rand[0].title;
    }
    allTitles.push(seed);
    // # Get more nodes. This approach (as opposed to using
    // # nodeRand(nodeCount)) is arbitrary, but would arguably
    // # generate a graph with multiple related connections.
    let nodes = await nodeNeigh(seed, [], nodeCount);
    for (let i=1; i < nodes.length; i++) {
        allTitles.push(nodes[i].title)
        indeces.push([0, i])
    }
    // # Get connections which isn't known yet and add them,
    // # if any, to the result.
    let moreIndeces = await adjacencyMatrixFlat(
        allTitles.slice(1, allTitles.length)
    )
    if (moreIndeces.length > 0) {
        indeces.push(...moreIndeces)
    }
    
    return {titles:allTitles, graph:indeces}        
}
