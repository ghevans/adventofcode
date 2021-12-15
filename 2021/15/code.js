const _ = require('lodash');
const dijkstra = require('../../node_modules/dijkstrajs');
const {input, testInput} = require('./input');

function part1(map) {
    let graph = {};
    for(let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            graph[`${x},${y}`] = getAdjacent(map,x,y);
        }
    }

    let path = dijkstra.find_path(graph, `0,0`, `${map.length-1},${map[0].length-1}`)
    // console.log(path);
    return getCost(map, path);
}

function part2(smallMap) {
    return part1(buildLargeMap(smallMap));
}

function getCost(map, path) {
    let cost = 0;
    for (let i = 1; i < path.length; i++) {
        let coors = path[i].split(',');
        cost += map[coors[1]][coors[0]];
    }
    return cost;
}

function getAdjacent(map, x, y) {
    let adj = {};
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined) {
            adj[`${x+dx[i]},${y+dy[i]}`] = next;
        }
    }
    return adj;
}


function buildLargeMap(map) {
    let out = [...Array(map.length*5)].map(x=>Array(map[0].length*5));
    let height = map.length;
    let width = map[0].length;

    for(let i = 0; i < 5; i++) { // copies on y
        for(let j = 0; j < 5; j++) { // copies on x
            for(let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let val = (map[y][x] + (j+i)) % 9;
                    out[y + (i*height)][x + (j*width)] = (val === 0) ? 9 : val;
                }
            }
        }
    }

    return out;
}

function print(map) {
    let output = "";
    for (let y = 0; y < map.length; y++) {
        let row = "\n";
        row += ((y)%10 === 0) ? `-\n` : '';
        for (let x = 0; x < map[0].length; x++) {
            row += `${map[y][x]} `;
            row += ((x+1)%10 === 0) ? `|` : '';
        }
        output += `${row}`;
    }
    console.log(output)
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));