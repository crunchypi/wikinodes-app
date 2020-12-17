// # This module is a direct mirror of endpoint definition at:
// #    https://github.com/crunchypi/wikinodes-server
// # 
// # It (this module) currently (201217) supports:
// #    - Query single node.
// #    - Query neighbours of a node (by title).
// #    - Query random nodes.
// #
// # More details found above individual funcs.

import axios from 'axios'
const axiosDefault = axios.default;

const serverIP = 'http://localhost';
const serverPort = 1234;
const serverPath = `${serverIP}:${serverPort}`;



// # Query a single node by <title>. <brief> is a switch
// # that specifies whether or not the response should
// # contain HTML in addition to a title and ID. The
// # return is an array since the server might have
// # several nodes related to a single title.
// # Example ok promise:
// #    [ 
// #        { 
// #            id: 306, 
// #            title: 'Art', 
// #            html: '<div></div>' 
// #        }
// #    ]
export async function nodeSingle(title, brief=false) {
    const endpoint = '/data/search/node';
    let resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        title:title,
        brief:brief
    });
    return resp.data;
}


// # Query neighbours of a node V, using <title> of V. Additionally,
// # response can be filtered by using <excludeTitles>, this is for
// # performance reasons -- no point in requesting data which is not
// # wanted. Last param will <limit> the response to a max amount of
// # returned nodes.
// # Example ok promise when ofTitle='a', excludeTitles=['b'], limit=2:
// #    [ 
// #        {id:3, title:'c' } // assume c is neighbour of a.
// #        {id:4, title:'d' } // assume d is neighbour of a.
// #                           // b will not be here.
// #    ]
export async function nodeNeigh(ofTitle, excludeTitles=[], limit=10) {
    const endpoint = '/data/search/neigh';
    let resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        title:ofTitle,
        exclude:excludeTitles,
        limit:limit
    });
    return resp.data;
}


// # Simply get random node(s), specifying how many with <amount>.
// # Example of ok promise when amount=2:
// #    [ 
// #        {id:3, title:'c' }
// #        {id:4, title:'d' }
// #    ]
export async function nodeRand(amount) {
    const endpoint = '/data/search/rand';
    let resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        amount:amount
    });
    return resp.data;
}


