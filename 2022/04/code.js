const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let overlaps = input.split('\n')
                        .map(parseRange)
                        .filter(isContained);
    
    return overlaps.length;
}

function part2(input) {
    let noOverlaps = input.split('\n')
                          .map(parseRange)
                          .filter(noOverlap);
    return input.split('\n').length - noOverlaps.length;
}

function parseRange(pair) {
    let p = pair.split(',').map(elf => {
        let e = elf.split('-');
        return {
            start: Number(e[0]),
            end: Number(e[1])
        }
    });
    return p;
}

function isContained(pair) {
    return (((pair[0].start <= pair[1].start) && (pair[0].end >= pair[1].end)) ||
            ((pair[1].start <= pair[0].start) && (pair[1].end >= pair[0].end)))
}

function noOverlap(pair) {
    return (pair[0].end < pair[1].start) || (pair[1].end < pair[0].start);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));