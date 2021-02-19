// # This module is a direct mirror of endpoint definition at:
// #    https://github.com/crunchypi/wikinodes-server
// # 
// # More details found above individual funcs.

import axios from 'axios'
const axiosDefault = axios.default;

const serverIP = 'http://localhost';
const serverPort = 1234;
const serverPath = `${serverIP}:${serverPort}`;


// # Searches the backend for an article (partial) with the given
// # id. The ok promise result will be in the following form:
// #    [{id:1234, title: 'some title'}]
export async function searchArticlesByID(id) {
    const endpoint = '/data/search/articles/byid';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`,{
        id :id
    });
    return resp.data
}

// # Searches the backend for one or more article(s) (partial)
// # with the given title. The ok promise result will be in the
// # following form:
// #    [{id:1234, title:'given title'}, ...]
export async function searchArticlesByTitle(title) {
    const endpoint = '/data/search/articles/bytitle'
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        title :title
    });
    return resp.data
}

// # Searches the backend for one or more article(s) (partial)
// # where the body (main text bulk) matches the given str.
// # As this query can result in many nodes, an option (arg)
// # for limiting the response is given. The ok promise 
// # result will be in the following form:
// #    [{id:1234, title:'some title'}, ...]
export async function searchArticlesByContent(str, limit=5) {
    const endpoint = '/data/search/articles/bycontent';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        str   :str,
        limit :limit
    });
    return resp.data
}

// # Searches the backend for articles that are linked from
// # an article with the specified ID. Limit option limits
// # the response. The ok promise result will be in the
// # following form:
// #    [{id:1234, title:'some title'}, ...]
export async function searchArticlesByNeighs(id, limit=5) {
    const endpoint = '/data/search/articles/byneigh';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        id      :id,
        limit   :limit
    });
    return resp.data
}

// # Searches the backend for the HTML content of an article with
// # the given ID. The ok promise result is a string.
export async function searchHTMLByID(id) {
    const endpoint = '/data/search/html/byid';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        id :id
    });
    return resp.data
}

// # Checks if relationships between articles (i.e one links another)
// # exist. The expected input is an array of arrays, where the 
// # nested one contains two elements: 'from' ID and 'to' ID.
// #
// # For example, if there exists two articles in the database
// # where the former has id 8, latter has id 9, and it is of interest
// # whether or not 8 links to 9, then the function argument can be
// #    [[8,9]]  (order matters).
// # 
// # If the relationship is true, then the ok promise result will be
// #    [true]
// #
// # This function can naturally have multiple checks, such as
// #    [[1,2],[3,4],[5,6]] -> (the result might be) [true, true, false]
export async function checkRelsExist(rels) {
    const endpoint = '/data/check/relsexist';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        rels :rels
    });
    return resp.data
}

// # Retrieves a specified amount of random articles (partial).
// # The ok promise result will be in the following form:
// #    [{id:1234, title:'some title'}, ...]
export async function randomArticles(limit) {
    const endpoint = '/data/random/articles';
    const resp = await axiosDefault.post(`${serverPath}${endpoint}`, {
        limit :limit
    });
    return resp.data 
} 


