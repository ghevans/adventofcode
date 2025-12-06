const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    return rotate(input, false);
}

function part2(input) {
    return rotate(input, true);
}

function rotate(input, countAll) {
    let pos = 50, numZeros = 0;
    for (ins of input) {
        if (countAll) { 
            numZeros += Math.trunc(ins.val / 100); // we start knowing we've done N full turns before we dial in
        }
        let moves = ins.val % 100, touchedZero = 0;

        if (moves > 0) { // if we are doing a pure rotation, don't move anything
            switch (ins.dir) {
                case 'L':
                    nextPos = pos - moves;
                    if (nextPos < 0) { // we crossed zero again
                        touchedZero = (pos !== 0) ? 1 : 0; // if we start at 0, ignore
                        pos = 100 + nextPos;
                    } else {
                        touchedZero += (nextPos === 0) ? 1 : 0; // check if we landed on zero
                        pos = nextPos;
                    }
                    break;
                case 'R':
                    nextPos = pos + moves;
                    if (nextPos > 99) { // we crossed zero again
                        touchedZero = (pos !== 0) ? 1 : 0; // if we start at 0, ignore
                        pos = nextPos - 100;
                    } else {
                        touchedZero += (nextPos === 0) ? 1 : 0; // check if we landed on zero
                        pos = nextPos;
                    }
                    break;
            }
        }

        numZeros += (countAll) ? touchedZero : (pos === 0) ? 1 : 0; // Count the touches
    }
    return numZeros;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));