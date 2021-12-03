const _ = require('lodash');
const input = require('./input');

function part1(input) {
    let gamma = '';
    for(let i = 0; i < input[0].length; i++) {
        gamma += mostCommon(input, i);
    }

    let epsilon = '';
    for(let i = 0; i < input[0].length; i++) {
        epsilon += leastCommon(input, i);
    }

    return (parseInt(gamma, 2) * parseInt(epsilon, 2));
}

function mostCommon(input, col) {
    let zeros = _.filter(_.map(input, row => row[col]), item => item === '0').length;
    let ones = _.filter(_.map(input, row => row[col]), item => item === '1').length;
    return ((ones === zeros) || (ones > zeros)) ? '1' : '0';
}

function leastCommon(input, col) {
    return (mostCommon(input, col) === '1') ? '0' : '1';
}

function part2(input) {
    let oxygenRating = _.cloneDeep(input);
    let co2ScrubberRating = _.cloneDeep(input);
    let index = 0;
    while (oxygenRating.length > 1) {
        oxygenRating = _.filter(oxygenRating, item => item[index] === mostCommon(oxygenRating, index));
        index++;
    }

    index = 0;
    while (co2ScrubberRating.length > 1) {
        co2ScrubberRating = _.filter(co2ScrubberRating, item => item[index] === leastCommon(co2ScrubberRating, index));
        index++;
    }
    
    return (parseInt(oxygenRating, 2) * parseInt(co2ScrubberRating, 2));
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));