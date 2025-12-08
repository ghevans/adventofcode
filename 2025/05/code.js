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
                validIds++;
                break;
            }
        }
    }
    return validIds;
}

function part2(input) {
    let ranges = input[0].map(p => { 
        parts = p.split('-');
        return {
            start: Number(parts[0]),
            end: Number(parts[1])
        }
    })

    merged = merge(_.sortBy(ranges, "start"));

    let totalValid = 0;
    for (range of merged) {
        totalValid += (range.end - range.start + 1)
    }
    return totalValid;
}

function merge(ranges) {
    let merged = [];
    for (range of ranges) {
        if (merged.length === 0) {
            merged.push(range);
        } else {
            let workingRange = merged.pop();
            if (range.start <= workingRange.end + 1) {
                workingRange.end = Math.max(range.end, workingRange.end);
                merged.push(workingRange);
            } else {
                merged.push(workingRange);
                merged.push(range);
            }
        }
    }
    return merged;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));