const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(map) {
    return Object.values(findLowPoints(map)).reduce((acc, val) => acc  + val + 1, 0);
}

function part2(map) {
    let lowPoints = findLowPoints(map);
    let locs = Object.keys(lowPoints).map(key => { return { x: Number(key.split(',')[1]), y: Number(key.split(',')[0]) }});

    let basins = []
    for(loc of locs) {
        basins.push(dfs(map, loc.x, loc.y));
    }
    basins.sort((a,b) => b-a);
    return basins[0]*basins[1]*basins[2];
}

function getAdjacent(map, y, x, visited) {
    let adj = [];
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined && next != 9 && visited[`${y+dy[i]},${x+dx[i]}`] !== true) {
            adj.push([y+dy[i], x+dx[i]])
        }
    }
    return adj;
}

function dfs(map, startX, startY) {
    let basinSize = 0;
    let visited = {};
    let stack = [];
    stack.push([startY, startX]);

    while(stack.length !== 0) {
        let loc = stack.pop();
        if (!visited[`${loc[0]},${loc[1]}`]) {
            basinSize++;
            visited[`${loc[0]},${loc[1]}`] = true;
            stack.push(...getAdjacent(map, loc[0], loc[1], visited));
        }
    }
    return basinSize;
}

function findLowPoints(map) {
    let lowPoints = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let height =  map[y][x];
            let up = map[y-1]?.[x] ?? 10;
            let down = map[y+1]?.[x] ?? 10;
            let left = map[y]?.[x-1] ?? 10;
            let right = map[y]?.[x+1] ?? 10;

            if (height < up && height < down && height < left && height < right) {
                lowPoints[`${y},${x}`] = height;
            }
        }
    }
    return lowPoints
}

function print(map) {
    let output = "";
    for (let y = 0; y < map.length; y++) {
        let row = "";
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] !== 9) {
                row += `${map[y][x]}`;
            } else {
                row += '*'
            }
        }
        output += `${row}\n`;
    }
    console.log(output)
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));