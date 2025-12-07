const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let jolts = []
    for (bank of input) {
        jolts.push(getMaxJoltage(bank));
    }
    return jolts.reduce((a,b) => a+b, 0);
}

function getMaxJoltage(bank) {
    let max = -1;
    for (let i = 0; i < bank.length; i++) {
        let first = bank[i];
        for (let j = i+1; j < bank.length; j++) {
            let jolts = Number(first.concat(bank[j]));
            max = (jolts > max) ? jolts : max;
        }
    }
    // console.log(`finished ${bank}: jolts is ${max}`)
    return max;
}

function part2(input) {
    return "tbd";
}



console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));