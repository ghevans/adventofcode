const _ = require('lodash');
const {input, testInput} = require('./input');

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

class Node {
    constructor(val, l, r, u, d) {
        this.val = val,
        this.l = l,
        this.r = r,
        this.u = u,
        this.d = d
    }
}

function part1(input) {
    let droneMap = input.split('\n').map(row => {
        return row.split('');
    })

    let startPos, exitPos;    
    for (let y = 0; y < droneMap.length; y++) {
        for (let x = 0; x < droneMap[0].length; x++) {
            if (droneMap[y][x] === 'S') { startPos = {x: x, y: y}}
            if (droneMap[y][x] === 'E') { exitPos = {x: x, y: y}}
        }
    }

    dfs(droneMap, startPos.x, startPos.y, exitPos.x, exitPos.y);
    return "tbd";
}

function getAdjacent(map, y, x, visited) {
    let adj = [];
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined && canMove(map[y][x], next) && visited[`${y+dy[i]},${x+dx[i]}`] !== true) {
            adj.push([y+dy[i], x+dx[i]])
        }
    }
    return adj;
}

function dfs(map, startX, startY, exitX, exitY) {
    let numSteps = 0;
    let visited = {};
    let stack = [];
    stack.push([startY, startX]);

    while(stack.length > 0) {
        let loc = stack.pop();
        if (!visited[`${loc[0]},${loc[1]}`]) {
            numSteps++;
            console.log(`visiting: ${loc}`)
            if (`${loc[0]},${loc[1]}` === `${exitY},${exitX}`) {
                console.log(`FOUND THE EXIT AFTER ${numSteps}`)
                break;
            }
            visited[`${loc[0]},${loc[1]}`] = true;
            stack.push(...getAdjacent(map, loc[0], loc[1], visited));
        }
    }
    return numSteps;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(input));