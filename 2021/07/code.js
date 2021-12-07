const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let min = _.min(input);
    let max = _.max(input);
    let lowest = Number.MAX_SAFE_INTEGER;
    for(let pos = min; pos <= max; pos++) {
        let cost = 0;
        for (crab of input) {
            cost += Math.abs(crab - pos);
        }
        lowest = (cost < lowest) ? cost : lowest;
    }
    return lowest;
}

function part2(input) {
    let min = _.min(input);
    let max = _.max(input);
    let lowest = Number.MAX_SAFE_INTEGER;
    for(let pos = min; pos <= max; pos++) {
        let cost = 0;
        for (crab of input) {
            for(let step = 1; step <=  Math.abs(crab - pos); step++) {
                cost += step;
            }
        }
        lowest = (cost < lowest) ? cost : lowest;
    }
    return lowest;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));