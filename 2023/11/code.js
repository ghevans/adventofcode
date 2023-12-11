const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let [galaxies, universe] = expand(input);

    return _.sum(Object.values(getDistances(galaxies)));
}

function getDistances(galaxies) {
    let dists = {};
    for (let i = 0; i < galaxies.length; i++) {
        let curG = galaxies[i];
        for (let j = i+1; j < galaxies.length; j++) {
            let otherG = galaxies[j];
            dists[`${i+1},${j+1}`] = Math.abs(curG.x - otherG.x) + Math.abs(curG.y - otherG.y)
        }
    }

    return dists;
}

function expand(universe) {
    let current = universe.split('\n').map(row => row.split(''));
    let galaxies = [];
    let expanded = [];
    for (let y = 0; y < current.length; y++) {
        let row = [];
        if (current[y].every(c => c === '.')) {
            for (let x = 0; x < current[0].length; x++) {
                row[x] = '.';
            }
            expanded.push(row);
        }

        for (let x = 0; x < current[0].length; x++) {
            row[x] = current[y][x];
        }
        expanded.push(row);
    }

    let colsToAdd = [];
    for (let x = 0; x < expanded[0].length; x++) {
        let col = expanded.map(c => c[x]);
        if (col.every(c => c === '.')) {
            colsToAdd.push(x);
        }
    }

    for(col of colsToAdd.reverse()) {
        for (let y = 0; y < expanded.length; y++) {
            expanded[y].splice(col, 0, '.');
        }
    }

    for (let y = 0; y < expanded.length; y++) {
        for (let x = 0; x < expanded[0].length; x++) {
            if (expanded[y][x] === '#') {
                galaxies.push({y: y, x: x}); 
            }
        }
    }

    return [galaxies, expanded];
}

function print(universe) {
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

function part2(input) {
    return "tbd";
}

function bigExpand(universe) {
    let start = universe.split('\n').map(r => r.split(''));
    console.log(start);
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));