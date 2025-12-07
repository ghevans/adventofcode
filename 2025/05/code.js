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
    let validRanges = [];
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
                // console.log(`ID ${id} is VALID in range [${range.start}, ${range.end}]`)
                validRanges.push(range)
            }
        }
    }

    let [changed, freshIds] = mergeLists(validRanges);
    while (changed) {
        console.log(`loop`);
        [changed, freshIds] = mergeLists(freshIds);
    }
    let finished = new Set(freshIds);
    console.log(freshIds)
    let totalValid = 0;
    for (range of freshIds) {
        totalValid += (range.end - range.start + 1)
    }
    return totalValid;
}

function mergeLists(ranges) {
    let freshIds = [];
    let changed = false;
    freshIds.push(ranges[0]);
    for (let i = 1; i < ranges.length; i++){
        let curStart = ranges[i].start;
        let curEnd = ranges[i].end;

        let overlap = false;
        for (range of freshIds) {
            // if (curStart < range.start)
            

            if (curStart === range.start && curEnd === range.end) { // same exact range
                overlap = true;
                break;
            }

            if (isInRange(curStart, range) && !isInRange(curEnd, range)) { // if this range is AFTER the start and AFTER the end
                console.log(`overlap detected btwn: [${curStart},${curEnd}] and [${range.start},${range.end}]`)
                changed = true;
                overlap = true;
                range.end = curEnd;
            } else if (!isInRange(curStart, range) && isInRange(curEnd, range)) { // if this range is BEFORE the start and BEFORE the end
                console.log(`overlap detected btwn: [${curStart},${curEnd}] and [${range.start},${range.end}]`)
                changed = true;
                overlap = true;
                range.start = curStart;
            } else if (curStart < range.start && curEnd > range.end) { // if this range FULLY encompasses another range, eat it
                console.log(`it happened`)
                changed = true;
                overlap = true;
                range.start = curStart;
                range.end = curEnd;
            } else if (curStart >= range.start && curEnd <= range.end) { // this range is already accounted for in the range it's comparing to so skip it
                console.log(`it happened1`)
                changed = true;
                overlap = true;
            }
        }
        if (!overlap) {
            freshIds.push(ranges[i])
        }
    }
    return [changed, freshIds];
}

// checks if val is WITHIN the start/end of the range provided INCLUSIVE of both
function isInRange(val, range) {
    return (val >= range.start && val <= range.end)
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));