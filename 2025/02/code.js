const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let invalidIds = new Set();
    for ([start, end] of input) {
        for (let i = start; i <= end; i++) {
            let patternNum = buildNumber(getPattern(i));
            if (patternNum >= start && patternNum <= end) {
                invalidIds.add(patternNum)
            }
        }
    }
    return [...invalidIds].reduce((a,b) => a+b, 0);
}

function buildNumber(pattern) {
    return Number(pattern.concat(pattern));
}

function getPattern(num) {
    let s = String(num)
    if (s.length % 2 !== 0) {
        return '';
    } else {
        return s.substring(0,s.length / 2);
    }
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));