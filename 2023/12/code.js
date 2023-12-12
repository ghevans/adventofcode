const _ = require('lodash');
const {input, testInput} = require('./input');

const isPossible = (string, length) => (string[0] === '.') ? false : (string.substring(0,length).split('').every(c => c != '.')) ? true : false;
const optionsLeft = (spring) => spring.filter(c => c !== '.').length;
const spotsNeeded = (groups) => groups.reduce((a,b) => a+b, 0);
const buildRegex = (groups) => {
    let r = '\\#{';
    for (let i = 0; i < groups.length; i++) {
        r += groups[i] + '}.+\\#{';
    }
    return RegExp(r.substring(0, r.length-5),'g')
}
const buildOptions = (spring, groups, options, regex) => {
    if ((options.has(spring.join('')) ||
        (optionsLeft(spring) < spotsNeeded(groups)))) {
        return;
    }

    if (spring.every(c => c !== '?') && optionsLeft(spring) === spotsNeeded(groups)) {
        let match = regex.exec(spring.join(''));
        if (match) {
            options.add(spring.join(''));
        }
    } else {

        for(let i = 0; i < spring.length; i++) {
            if (spring[i] === '?') {
                let part = [...spring];
                part.splice(i,1,'.');
                // console.log(part.join(''));
                buildOptions(part, groups, options, regex);
                part.splice(i,1,'#')
                // console.log(part.join(''));
                buildOptions(part, groups, options, regex);
                // buildOptions(spring.substring(0,i) + '.' + spring.substring(i+1), groups, options, regex);
                // buildOptions(spring.substring(0,i) + '#' + spring.substring(i+1), groups, options, regex);
            }
        }
    }
}

// .?..??#?##????#...? 4,1 <- one option, takes forever
function part1(input) {
    let totalArrangements = 0;
    for (spring of input) {
        let options = new Set();

        let regex = buildRegex(spring.groups);

        // console.log(`Starting to work on ${spring.spring}`)
        buildOptions(spring.spring, spring.groups, options, regex);
        console.log(`Finished working on ${spring.spring} which has [${options.size}] arrangements`)

        totalArrangements += options.size;
        // break;
    }
    return totalArrangements;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));


// let t = `.....##...###.
// ..#...#...###.
// ..#..#....###.
// ..#..##....##.
// .#....#...###.
// .#...#....###.
// .#...##....##.
// .##.......###.
// .##...#....##.
// .##..#.....##.`

// console.log(regexTest('..#...#...###.', [1,1,3]))
// console.log(regexTest(t, [1,1,3]))
// function regexTest(spring, groups) {
//     let r = '\\#{';
//     for (let i = 0; i < groups.length; i++) {
//         r += groups[i] + '}.+\\#{';
//     }
//     r = r.substring(0, r.length-5);
//     console.log(r);
//     let regex = RegExp(r,'g')

//     let count = 0;
//     while (m = regex.exec(spring)) {
//         console.log(m[0]);
//         count++
//     }
//     console.log(`total count: ${count}`)
// }

// function walk(spring, groups) {
//     let validOptions = 0;
//     let branched = false;
//     // console.log(`walk with ${spring} and [${groups}]`)

//     // if (spotsNeeded(groups) > optionsLeft(spring)) {
//     //     // console.log(`\tnot enough valid spots (${spring}) left for all groups [${groups}]`)
//     //     return 0;
//     // }

//     while (groups.length > 0 && spring.length > 0) {
//         if(spotsNeeded(groups) > optionsLeft(spring)) {
//             // console.log(`\tnot enough valid spots (${spring}) left for all groups [${groups}]`)
//             return 0;
//         }

//         // if (spring[0] === '?') { // if we hit a ?, call this again with both options
//         //     branched = true;
//         //     let rest = spring.substring(1);
//         //     let s1 = '.' + rest;
//         //     let s2 = '#' + rest;

//         //     let optionsW1 = walk(s1, [...groups]);
//         //     let optionsW2 = walk(s2, [...groups]);
//         //     validOptions += optionsW1 + optionsW2;
//         //     // console.log(`\tparent (${spring}) validOptions after ${s1} (${optionsW1}) | ${s2} (${optionsW2}) = ${validOptions}`)
//         //     // console.log(`\t2. parent (${spring}) validOptions after ${s2} = ${validOptions}`)
//         //     break;

//         // } else {
            
//             // console.log(`\t\tchecking: ${spring} against [${groups}]`)
//             let curGroup = groups[0]; // current size group we're matching
//             let canPlace = isPossible(spring, curGroup); // check if this group can be made based on where string is currently
//             if (canPlace) {
//                 groups.shift(); // remove the group
//                 spring = spring.substring(curGroup); // remove the characters used
//                 if (spring[0] === '#') {
//                     return 0;
//                 } else {
//                     spring = spring.substring(1); // remove the next character (space btwn springs)
//                 }
//             } else {
//                 spring = spring.substring(1); // remove the first character and try again
//             }
//             // console.log(`\t\t\tupdated to: ${spring} against [${groups}]`)
//         // }
//     }

//     // if (!branched) {
//         //if we have no spring left OR the rest is just ? or . AND there are no groups left, then it was successful
//         if ((spring.length === 0 || spring.split('').every(c => c !== '#')) && groups.length === 0 ) {
//             // console.log(`end of walk with: ${spring} and [${groups}]\n\t===== VALID =====\n`)
//             return validOptions + 1;
//         } else {
//             // console.log(`end of walk with: ${spring} and [${groups}]\n\t===== NOT VALID =====\n`)
//             return validOptions;
//         }
//     // } else {
//     //     return validOptions;
//     // }
// }