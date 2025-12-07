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
                if (validRanges.filter(r => r.start === range.start && r.end === range.end).length == 0) {
                    validRanges.push(range);
                }
            }
        }
    }

    validRanges = _.sortBy(validRanges, "start");



        console.log(validRanges)
    merged = merge(validRanges);
    console.log(merged);
    // let [changed, freshIds] = mergeLists(validRanges);
    // freshIds = _.sortBy(freshIds, "start");
    // while (changed) {
    //     console.log(`loop`);
    //     [changed, freshIds] = mergeLists(freshIds);
    // }
    // freshIds = _.sortBy(freshIds, "start");
    // console.log(freshIds)
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
            if (range.start <= workingRange.end) {
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
function mergeLists(ranges) {
    let freshIds = [];
    let changed = false;
    freshIds.push(ranges[0]);
    for (let i = 1; i < ranges.length; i++){
        let curRange = ranges[i]
        // let curStart = ranges[i].start;
        // let curEnd = ranges[i].end;

        let overlap = false;
        for (range of freshIds) {
            if ((curStart < range.start && curEnd < range.start) || 
                (curStart > range.end && curEnd > range.end)) {
                // starts BEFORE, ends BEFORE or starts AFTER, ends AFTER => no updates for THIS range
            } else if (curStart < range.start && curEnd >= range.start) {
                // starts BEFORE, ends WITHIN => update the range.start to be curStart
                overlap = changed = true;
                range.start = curStart;
            } else if (curStart >= range.start && curEnd <= range.end) {
                // starts WITHIN, ends WITHIN => ignore this range going forward
                overlap = true;
            } else if (curStart >= range.start && curEnd > range.end) {
                // starts WITHIN, ends AFTER => update the range.end to be curEnd
                overlap = changed = true;
                range.end = curEnd;                
            }

            if (curStart === range.start && curEnd === range.end) { // same exact range
                overlap = true;
                break;
            }
        }
        if (!overlap) {
            freshIds.push(ranges[i]);
        }
    }
    return [changed, freshIds];
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));

// wrong and too low - 344752770033736
//                     344752770033736
//                     342306396024860 "not the right asnwer"