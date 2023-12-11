const _ = require('lodash');
const {input, testInput} = require('./input');

const isEmpty = (row) => row.every(c => c === '.');
const rotate90 = (universe) => { return universe[0].map((val, index) => universe.map(row => row[index]).reverse()); }

function expand(input, expansionFactor) {
    let [galaxies, rows, cols] = bigExpand(input);

    return _.sum(Object.values(getBigDistances(galaxies, rows, cols, expansionFactor)));
}

function bigExpand(universe) {
    const galaxies = universe.split('\n')
                            .flatMap((row, y) => row.split('').map((c, x) => ({ y: y, x: x, char: c})))
                            .filter(({char}) => char === '#')

    const rowsToAdd = universe.split('\n')
                    .map((row, y) => ({row: row.split(''), y}))
                    .filter(({row}) => isEmpty(row))
                    .map(({y}) => y)

    const colsToAdd = rotate90(universe.split('\n').map(r => r.split('')))
                .map((col, x) => ({col, x}))
                .filter(({col}) => isEmpty(col))
                .map(({x}) => x);
    
    return [galaxies, rowsToAdd, colsToAdd];
}

function getBigDistances(galaxies, rows, cols, expansionFactor) {
    let dists = {};
    for (let i = 0; i < galaxies.length; i++) {
        let curG = galaxies[i];
        for (let j = i+1; j < galaxies.length; j++) {
            let otherG = galaxies[j];

            dists[`${i+1},${j+1}`] = (Math.abs(curG.x - otherG.x) + Math.abs(curG.y - otherG.y)) + 
                                        checkForExpansionZones(curG.y, otherG.y, rows)*(expansionFactor) + 
                                        checkForExpansionZones(curG.x, otherG.x, cols)*(expansionFactor);
        }
    }
    return dists;
}

function checkForExpansionZones(current, other, vals) {
    return vals.filter(val => (val > Math.min(current, other) && val < Math.max(current, other))).length;
}

const print = (universe) => {
    let out = '';
    for(let y = 0; y < universe.length; y++) {
        let row = '';
        for(let x = 0; x < universe[0].length; x++) {
            row += universe[y][x];
        }
        out += row + '\n';
    }
    console.log(out);
}

console.log("Part 1 - " + expand(input, 1));
console.log("Part 2 - " + expand(input, 999999));