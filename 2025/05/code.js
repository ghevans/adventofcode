const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let validIds = 0;
    let ingredients = input[1].map(Number)
    let ranges = input[0].map(p => { 
        parts = p.split('-');
        return {
            start: Number(parts[0]),
            end: Number(parts[1])
        }
    })
    
    for (id of ingredients) {
        for (range of ranges) {
            if (id >= range.start && id <= range.end) {
                console.log(`ID ${id} is VALID in range [${range.start}, ${range.end}]`)
                validIds++;
                break;
            }
        }
    }
    return validIds;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));