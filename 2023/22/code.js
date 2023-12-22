const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const getMaxZ = (map) => {
    let max = 1;
    for (let i = 0; i < map.length; i++) {
        max = Math.max(max, map[i].start[2], map[i].end[2]);
    }
    return max;
}

function part1(input) {
    console.log(input);
    let maxZ = getMaxZ(input);
    console.log(maxZ);
    return "tbd";
}


function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));