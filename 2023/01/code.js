const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(calibrationDoc) {
    let numbers = calibrationDoc.split('\n')
                                .map(l => l.split('').filter(Number))
                                .map(a => Number(a[0] + a[a.length -1]));
    
    return numbers.reduce((a,b) => a+b, 0);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));