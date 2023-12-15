const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(sequence) {
    return sequence.map(part => getHash(part)).reduce((a,b) => a+b, 0);
}

function getHash(part) {
    let hash = 0;
    for (char of part) {
        hash += char.charCodeAt(0);
        hash *= 17
        hash = (hash % 256);
    }
    return hash;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));