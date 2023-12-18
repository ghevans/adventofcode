const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');
const dijkstra = require('dijkstrajs');


const canMove = (grid, cur, adjacent, dirInARow) => {
    return true;
    // cur = (cur === 'S') ? 'a' : (cur === 'E') ? 'z' : cur;
    // adjacent = (adjacent === 'S') ? 'a' : (adjacent === 'E') ? 'z' : adjacent;
    // let curVal = getHeight(cur);
    // let adjacentVal = getHeight(adjacent);
    // return (curVal >= adjacentVal) || (curVal + 1 === adjacentVal);
}

const buildDists = (grid, start) => {
    let out = {}
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            out[`${y},${x}`] = Infinity;
        }
    }
    out[`${start.y},${start.x}`] = 0;
    return out;
}

const atEnd = (curLoc, end) => { return (curLoc.y === end.y && curLoc.x === end.x); }

function part1(grid) {
    console.log(helper.print(grid))

    const start = {y: 0, x: 0}, end = {y: grid.length-1, x: grid[0].length-1}

    let next = helper.getAdjacentByWeight(grid, start.y, start.x, canMove);
    console.log(next);

    // Dijkstra's Algo with custom hueristic of tracking direction to know when we must turn
    let dists = buildDists(grid, start);

    let graph = {};
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            graph[`${y},${x}`] = helper.getAdjacentByWeight(grid, y, x, canMove);
        }
    }

    console.log(graph)

    let d = dijkstra2(graph, `${start.y},${start.x}`)
    console.log(d)
    // let visited = new Set();
    // let curLoc = start;
    // while(!atEnd(curLoc, end)) {
    //     let key = `${curLoc.y},${curLoc.x}`;
    //     // get the nextPossibleSteps
    //     if (visited.has(key)) {
    //         console.log(`have already visited ${key}`)
    //     } else {
    //         visited.add(key);
    //     }



    //     curLoc = 
    //     break;
    // }

    // console.log(dists);
    return "tbd";
}


function dijkstra2(graph, start) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;
    }
    
    // The distance from the start node to itself is 0
    distances[start] = 0;

    let lastDirections = [];

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);

        // GET THE DIRECTION WE'RE POTENTIALLY MOVING BY COMPARING THE NEIGHBOR LOC(Y,X) TO CURRENT LOC(Y,X)
        // ADD TO lastDirections to be used in the for loop
        let closestNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // adjust graph[closestNode][neighbor] distance to be Infinity (can't go that way)
            // if the potential direction === the last 2! moves

            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];
                
                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    // Return the shortest distance from the start node to all nodes
    return distances;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));