const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    return checkSafe(input)[0].length;
}

function part2(input) {
    let [safe, unsafe] = checkSafe(input);
    return safe.length + checkDampenerSafe(unsafe).length;
}

const checkReport = (report) => {
    let isSafe = true;
    let decreasing = report[0] > report[1];
    for (let i = 1; i < report.length; i++) {
        let diff = report[i-1] - report[i];
        
        if (diff === 0) {
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
    return isSafe;
}

const checkSafe = (reports) => {
    let safe = [], unsafe = [];
    for (report of reports) {
        if (checkReport(report)) {
            safe.push(report);
        } else {
            unsafe.push(report);
        }
    }
    return [safe, unsafe];
}

const checkDampenerSafe = (reports) => {
    let safe = [];
    for (report of reports) {
        for (let i = 0; i < report.length; i++) {
            let tempReport = _.clone(report);
            tempReport.splice(i,1);
            if (checkReport(tempReport)) {
                safe.push(report);
                break;
            }
        }

    }
    return safe;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));