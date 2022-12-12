const _ = require('lodash');
const {input, testInput} = require('./input');
const dijkstra = require('dijkstrajs');

const getHeight = function(char) {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(char);
};

const canMove = function(cur, adjacent) {
    cur = (cur === 'S') ? 'a' : (cur === 'E') ? 'z' : cur;
    adjacent = (adjacent === 'S') ? 'a' : (adjacent === 'E') ? 'z' : adjacent;
    let curVal = getHeight(cur);
    let adjacentVal = getHeight(adjacent);
    return (curVal >= adjacentVal) || (curVal + 1 === adjacentVal);
}

const getAdjacent = function(map, y, x, visited) {
    let adj = [];
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined && canMove(map[y][x], next) && visited[`${y+dy[i]},${x+dx[i]}`] !== true) {
            adj.push([[y+dy[i], x+dx[i]],1])
        }
    }
    return adj;
}

function part1(input) {
    let droneMap = input.split('\n').map(row => {
        return row.split('');
    })

    let startPos, exitPos;    
    let graph = {}
    for (let y = 0; y < droneMap.length; y++) {
        for (let x = 0; x < droneMap[0].length; x++) {
            if (droneMap[y][x] === 'S') { startPos = {x: x, y: y}}
            if (droneMap[y][x] === 'E') { exitPos = {x: x, y: y}}

            graph[`${y},${x}`] = Object.fromEntries(getAdjacent(droneMap, y, x, []));
        }
    }
    
    let path = dijkstra.find_path(graph, `${startPos.y},${startPos.x}`, `${exitPos.y},${exitPos.x}`)
    return path.length - 1;
}

function part2(input) {
    let droneMap = input.split('\n').map(row => {
        return row.split('');
    })

    let startPos = [], exitPos;    
    let graph = {};
    for (let y = 0; y < droneMap.length; y++) {
        for (let x = 0; x < droneMap[0].length; x++) {
            if (droneMap[y][x] === 'S' || droneMap[y][x] === 'a') { startPos.push({x: x, y: y})}
            if (droneMap[y][x] === 'E') { exitPos = {x: x, y: y}}

            graph[`${y},${x}`] = Object.fromEntries(getAdjacent(droneMap, y, x, []));
        }
    }
    
    let shortest = Infinity;
    for (start of startPos) {
        try {
            let path = dijkstra.find_path(graph, `${start.y},${start.x}`, `${exitPos.y},${exitPos.x}`);
            shortest = (path.length - 1 < shortest) ? path.length - 1 : shortest;
        } catch (e) { }
    }
    return shortest;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));