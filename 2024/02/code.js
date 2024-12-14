const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    return checkSafe(input, false).length;
}

function part2(input) {
    return checkSafe(input, true).length;
}

const checkSafe = (reports, dampener) => {
    let safe = [];
    for (report of reports) {
        let isSafe = true;
        let dampenerUsed = false;
        let decreasing = report[0] > report[1];
        for (let i = 1; i < report.length; i++) {
            let diff = report[i-1] - report[i];
            
            if (diff === 0) {
                if (dampener && !dampenerUsed) {
                    dampenerUsed = true;
                }
                isSafe = false;
                break; 
            } 
            if (Math.abs(diff) > 3) {
                isSafe = false;
                break;
            }
            if (decreasing) {
                if (diff < 0) {
                    isSafe = false;
                    break;
                }
            } else {
                if (diff > 0) {
                    isSafe = false;
                    break;
                }
            }
        }
        if (isSafe) { safe.push(report); }
    }
    return safe;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));