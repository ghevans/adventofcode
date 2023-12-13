const _ = require('lodash');
const {input, testInput} = require('./input');

const rotate90 = (universe) => { return universe[0].map((val, index) => universe.map(row => row[index]).reverse()); }
const rotate270 = (valley) => { return rotate90(rotate90(rotate90(valley))); }

function searchForMirror(valley) {
    let rowLength = valley[0].length;
    valley = valley.flat().join('');
    for (let i = rowLength, rowNum = 1; i < valley.length; i+=rowLength) {
        let previous = valley.split('').map((char, idx) => (idx < i) ? char : '').reverse().join('');
        let rest = '';
        for (let j = i; j < valley.length; j+=rowLength) {
            let chunk = valley.substring(j, j+rowLength).split('').reverse().join('');
            rest += chunk;
        }

        let shortest = Math.min(previous.length, rest.length);
        let match = true;
        for (let k = 0; k < shortest; k++) {
            if (previous[k] !== rest[k]) {
                match = false;
            }
        }

        if (match) {
            return rowNum;
        }
        rowNum++;
    }
}
function part1(map) {
    let sum = 0;
    for (valley of map) {
        let mirrorLine = searchForMirror(valley);
        if (mirrorLine) {
            sum += (100 * mirrorLine);
        } else {
            valley = rotate90(valley);
            mirrorLine = searchForMirror(valley);
            if (mirrorLine) {
                sum += mirrorLine;
            } else {
                console.log(`no mirrorline found!!!`)
            }
        }
    }
    return sum;
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

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));