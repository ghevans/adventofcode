const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let nextVals = [];
    for (line of input) {
        nextVals.push(line[line.length-1] + findNext(line));
    }
    return _.sum(nextVals);
}

function findNext(input) {
    let diff = [];
    let nextVal = 0;
    for (let i = 1; i < input.length; i++) {
        diff.push(input[i] - input[i-1]);
    }

    if (diff.some(n => n !== 0)) {
        nextVal = findNext(diff);
    }

    return nextVal + diff[diff.length-1];
}

function part2(input) {
    let nextVals = [];
    for (line of input) {
        nextVals.push(line[0] - findPrev(line));
    }
    return _.sum(nextVals);
}

function findPrev(input) {
    let diff = [];
    let nextVal = 0;
    for (let i = 1; i < input.length; i++) {
        diff.push(input[i] - input[i-1]);
    }

    if (diff.some(n => n !== 0)) {
        nextVal = findPrev(diff);
    }

    return diff[0] - nextVal;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));