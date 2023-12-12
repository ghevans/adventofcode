const _ = require('lodash');
const {input, testInput} = require('./input');

const isPossible = (string, length) => (string[0] === '.') ? false : (string.substring(0,length).split('').every(c => c != '.')) ? true : false;
const optionsLeft = (spring) => spring.split('').filter(c => c !== '.').length;
const spotsNeeded = (groups) => groups.reduce((a,b) => a+b, 0);

function part1(input) {
    let totalArrangements = 0;
    for (spring of input) {
        let test = walk(spring.spring, spring.groups);
        console.log(`finished ${spring.spring} looking for ${spring.groups} and got ${test} options`)
        totalArrangements += walk(spring.spring, spring.groups);
    }
    return totalArrangements;
}

// function stillPossible(spring, groups) {
//     let groupsSum = groups.reduce((a,b) => a+b, 0);
//     let possibilities = spring.split('').filter(c => c !== '.').length;
//     return (groups.length > 0 && spring.length > 0 && groupsSum <= possibilities);
// }





// const valid = new Set();
console.log(walk("???.###", [1,1,3]));
// console.log(walk(".??..??...?##.", [1,1,3]));
// console.log(walk("????.######..#####.", [1,6,5]));
// console.log(valid)
// function yep(spring, groups) {
//     options.set(spring, groups);
//     walk(options, spring, groups);
//     console.log(options);
// }

function walk(spring, groups) {
    let validOptions = 0;
    console.log(`walk with ${spring} and [${groups}]`)

    if (spotsNeeded(groups) > optionsLeft(spring)) {
        // console.log(`\tnot enough valid spots (${spring}) left for all groups [${groups}]`)
        return 0;
    }

    while (groups.length > 0 && spring.length > 0) {
        if(spotsNeeded(groups) > optionsLeft(spring)) {
            // console.log(`\tnot enough valid spots (${spring}) left for all groups [${groups}]`)
            return 0;
        }

        if (spring[0] === '?') { // if we hit a ?, call this again with both options
            let rest = spring.substring(1);
            let s1 = '.' + rest;
            let s2 = '#' + rest

            // console.log(`\t1. parent (${spring}) spinning out recursion with ${s1} and [${groups}]`)
            // if(walk(s1, [...groups])) {
            //     valid.add(s1);
            //     validOptions += 1;
            // }
            validOptions += walk(s1, [...groups]);
            console.log(`\t1. parent (${spring}) validOptions after ${s1} = ${validOptions}`)
            // console.log(`\t2. parent (${spring}) spinning out recursion with ${s2} and [${groups}]`)
            validOptions += walk(s2, [...groups]);
            // if(walk(s2, [...groups])) {
            //     valid.add(s2);
            //     validOptions += 1;
            // }
            console.log(`\t2. parent (${spring}) validOptions after ${s2} = ${validOptions}`)
            break;

        } else {
        
            // console.log(`\t\tchecking: ${spring} against [${groups}]`)
            let curGroup = groups[0]; // current size group we're matching
            let canPlace = isPossible(spring, curGroup); // check if this group can be made based on where string is currently
            if (canPlace) {
                groups.shift(); // remove the group
                spring = spring.substring(curGroup); // remove the characters used
                if (spring[0] === '#') {
                    // console.log(`made a group, but next character is #, not possible`)
                    break;
                } else {
                    spring = spring.substring(1);
                }
            } else {
                spring = spring.substring(1); // remove the first character and try again
            }
            // console.log(`\t\t\tupdated to: ${spring} against [${groups}]`)
        }
    }
    //if we have no spring left OR the rest is just ? or . AND there are no groups left, then it was successful
    if ((spring.length === 0 || spring.split('').every(c => c !== '#')) && groups.length === 0) {
        // console.log(`end of walk with: ${spring} and [${groups}]\n\t===== VALID =====\n`)
        return validOptions + 1;
    } else {
        // console.log(`end of walk with: ${spring} and [${groups}]\n\t===== NOT VALID =====\n`)
        return validOptions;
    }
}

function part2(input) {
    return "tbd";
}

// console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));