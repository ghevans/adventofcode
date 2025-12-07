const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let count = 0;
    for(y=0; y < input.length; y++) {
        for(x = 0; x < input[0].length; x++) {
            if (input[y][x] === '@') {
                count += (helper.getAllNeighbors(input, y, x).filter(c => c==='@').length < 4) ? 1 : 0
            }
        }
    }
    return count;
}


function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));