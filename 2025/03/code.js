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
    let numDigits = 12;
    let jolts = [];
    for (bank of input) {
        let dropsAllowed = bank.length - numDigits;
        let currentBest = [];

        for (i = 0; i < bank.length; i++) {
            let num = Number(bank[i]);
            
            while(currentBest.length > 0 && dropsAllowed > 0 && currentBest[currentBest.length -1] < num) {
                currentBest.pop();
                dropsAllowed--;
            }
            currentBest.push(num)
        }

        jolts.push(Number(currentBest.slice(0,numDigits).join('')));
    }
    return jolts.reduce((a,b) => a+b, 0);
}


console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));