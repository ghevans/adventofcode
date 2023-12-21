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

    let finishedGardens = new Map();
    let activeGardens = new Map();

    for (let i = 0; i < steps; i++) {
        let nextTiles = new Map();
        for (tile of currentTiles) {
            let moves = getAllowedNeighbors(garden, tile, true);
            for (move of moves) {
                if (!finishedGardens.has(`${move[2]},${move[3]}`)) {
                    if (!nextTiles.has(`${move[0]},${move[1]},${move[2]},${move[3]}`)) {
                        nextTiles.set(`${move[0]},${move[1]},${move[2]},${move[3]}`, move);
                    }
                }
            }
        }

        let currentGardens = [...new Set([...nextTiles.values()].map((set) => `${set[2]},${set[3]}`))];
        for (curGarden of currentGardens) {
            let [y,x] = curGarden.split(',').map(Number);
            let evenOrOdd = (i % 2 === 0) ? 'e' : 'o';
            let key = curGarden + ',' + evenOrOdd;
            let gardenNumber = [...nextTiles.values()].map((set) => [set[2], set[3]]).filter(([yLoop, xLoop]) => yLoop === y && xLoop === x).length;
            if (activeGardens.has(key)) {
                if (activeGardens.get(key) === gardenNumber) {
                    // console.log(`before Size: ${nextTiles.size}`)
                    pruneTiles(nextTiles, y, x);
                    // console.log(`after Size: ${nextTiles.size}`)
                    // console.log(activeGardens.get(key))
                    finishedGardens.set(`${y},${x}`, [activeGardens.get(`${y},${x},e`), activeGardens.get(`${y},${x},o`)]);
                    activeGardens.delete(`${y},${x},e`);
                    activeGardens.delete(`${y},${x},o`);
                } else {
                    // console.log(`no loop found, updating ${key} with ${gardenNumber}`)
                    activeGardens.set(key, gardenNumber);
                }
            } else {
                // console.log(`first time seeing this key ${key} with ${gardenNumber}`)
                activeGardens.set(key, gardenNumber);
            }
        }

        currentTiles = [...nextTiles.values()];
        if (i % 100 === 0) {
            console.log(`After step ${i}, we have ${currentTiles.length} active tiles and ${finishedGardens.size} finished gardens`)
        }
        
    }
    
    return currentTiles.length;
}

function pruneTiles(nextTiles, y, x) {
    let keysToRemove = [...nextTiles.keys()].map((key) => [key, Number(key.split(',')[2]), Number(key.split(',')[3])]).filter(([key, yLoop, xLoop]) => yLoop === y && xLoop === x);
    for(k of keysToRemove) {
        nextTiles.delete(k[0]);
    }
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput, 5000));