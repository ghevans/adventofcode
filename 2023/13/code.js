const _ = require('lodash');
const {input, testInput} = require('./input');

const rotate90 = (universe) => { return universe[0].map((val, index) => universe.map(row => row[index]).reverse()); }
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

function searchForMirror(valley, allowedErrors) {
    let rowLength = valley[0].length;
    valley = valley.flat().join('');
    for (let i = rowLength, rowNum = 1; i < valley.length; i+=rowLength) {
        let previous = valley.split('').map((char, idx) => (idx < i) ? char : '').reverse().join('');
        let rest = '';
        for (let j = i; j < valley.length; j+=rowLength) {
            let chunk = valley.substring(j, j+rowLength).split('').reverse().join('');
            rest += chunk;
        }

        let errors = 0;
        for (let k = 0; k < Math.min(previous.length, rest.length); k++) {
            errors += (previous[k] !== rest[k]) ? 1 : 0;
        }

        if (errors === allowedErrors) {
            return rowNum;
        }
        rowNum++;
    }
}

function findMirrors(map, allowedErrors) {
    let sum = 0;
    for (valley of map) {
        let mirrorLine = searchForMirror(valley, allowedErrors);
        sum += (mirrorLine) ? (100 * mirrorLine) : searchForMirror(rotate90(valley), allowedErrors);
    }
    return sum;
}

console.log("Part 1 - " + findMirrors(input, 0));
console.log("Part 2 - " + findMirrors(input, 1));