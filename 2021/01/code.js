const _ = require('lodash');
const input = require('./input');

function part1(input) {
    let increased = 0;
    for (let i = 1; i < input.length; i++) {
        increased += (input[i] > input[i-1]) ? 1 : 0;
    }
    return increased;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));