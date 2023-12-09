const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let nextVals = [];
    for (line of input) {
        nextVals.push(line[line.length-1] + findDiff(line));
    }
    return _.sum(nextVals);
}

function findDiff(input) {
    let diff = [];
    let nextVal = 0;
    for (let i = 1; i < input.length; i++) {
        diff.push(input[i] - input[i-1]);
    }

    if (diff.some(n => n !== 0)) {
        nextVal = findDiff(diff);
    }

    return nextVal + diff[diff.length-1];
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));