const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const getStart = (garden) => {
    for (let y = 0; y < garden.length; y++) {
        for (let x = 0; x < garden[0].length; x++) {
            if (garden[y][x] === 'S') {
                return [y, x, 0, 0];
            }
        }
    }
}

const getAllowedNeighbors = (garden, tile, infiniteMap) => {
    let allowed = [];
    let neighbors = helper.getAdjacentLocs(garden, tile[0], tile[1], tile[2], tile[3], infiniteMap);
    for (neighbor of neighbors) {
        if (garden[neighbor[0]][neighbor[1]] !== '#') {
            allowed.push(neighbor);
        }
    }
    return allowed;
}

function part1(garden) {
    let currentTiles = [getStart(garden)];

    for (let i = 0; i < 64; i++) {
        let nextTiles = new Map();
        for (tile of currentTiles) {
            let moves = getAllowedNeighbors(garden, tile, 0, 0, false);
            for (move of moves) {
                if (!nextTiles.has(`${move[0]},${move[1]}`)) {
                    nextTiles.set(`${move[0]},${move[1]}`, move);
                }
            }
        }
        currentTiles = [...nextTiles.values()];
    }
    return currentTiles.length;
}

function part2(garden, steps) {
    let currentTiles = [getStart(garden)];

    for (let i = 0; i < steps; i++) {
        let nextTiles = new Map();
        for (tile of currentTiles) {
            let moves = getAllowedNeighbors(garden, tile, true);
            for (move of moves) {
                if (!nextTiles.has(`${move[0]},${move[1]},${move[2]},${move[3]}`)) {
                    nextTiles.set(`${move[0]},${move[1]},${move[2]},${move[3]}`, move);
                }
            }
        }
        let numberInFirst = [...nextTiles.values()].map((set) => [set[2], set[3]]).filter(([yLoop, xLoop]) => yLoop === 0 && xLoop === 0);
        console.log(`[${i+1}] | Number in origin garden: ${numberInFirst.length}`)
        // console.log(`END OF STEP ${i+1}`)
        currentTiles = [...nextTiles.values()];
        // console.log(currentTiles)
    }
    return currentTiles.length;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput, 50));