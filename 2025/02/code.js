const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let invalidIds = new Set();
    for ([start, end] of input) {
        for (let i = start; i <= end; i++) {
            let patternNum = Number(getPattern(i).repeat(2));

            if (!invalidIds.has(patternNum)) {
                if (patternNum >= start && patternNum <= end) {
                    invalidIds.add(patternNum)
                }
            }
        }
    }
    return [...invalidIds].reduce((a,b) => a+b, 0);
}

function part2(input) {
    let invalidIds = new Set();
    for ([start, end] of input) {
        for (let i = start; i <= end; i++) {
            let sNum = String(i);
            for (let j = 1; j <= sNum.length / 2; j++) {
                let pattern = sNum.substring(0,j);
                if (sNum.length % pattern.length === 0) { // only worry about evenly repeatable patterns
                    let patternNum = Number(pattern.repeat(sNum.length / pattern.length));
                    if (!invalidIds.has(patternNum)) {
                        if (patternNum >= start && patternNum <= end) {
                            invalidIds.add(patternNum)
                        }
                    }
                }
            }
        }
    }
    return [...invalidIds].reduce((a,b) => a+b, 0);
}

function getPattern(num) {
    let s = String(num)
    if (s.length % 2 !== 0) {
        return '';
    } else {
        return s.substring(0,s.length / 2);
    }
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));