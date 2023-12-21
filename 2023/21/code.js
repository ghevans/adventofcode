const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const getStart = (garden) => {
    for (let y = 0; y < garden.length; y++) {
        for (let x = 0; x < garden[0].length; x++) {
            if (garden[y][x] === 'S') {
                return [y, x];
            }
        }
    }
}

const getAllowedNeighbors = (garden, tile) => {
    let allowed = [];
    let neighbors = helper.getAdjacentLocs(garden, tile[0], tile[1]);
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
            let moves = getAllowedNeighbors(garden, tile);
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

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));