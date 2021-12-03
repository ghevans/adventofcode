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
    console.log(`ones: ${ones} | zeros: ${zeros}`)
    return ((ones === zeros) || (ones > zeros)) ? '1' : '0';
    return (_.sum(_.map(input, row => { return Number(row[col])})) > input.length / 2) ? '1' : '0';
}

function leastCommon(input, col) {
    return (mostCommon(input, col) === '1') ? '0' : '1';
}

function filterGroup(group, col, val) {
    return _.filter(group, item => item[col] === val);
}

function part2(input) {
    let possibilities = input;
    let index = 0;
    while (possibilities.length > 1) {
        possibilities = filterGroup(possibilities, index, mostCommon(possibilities, index));
        console.log(`${index} | ${possibilities}`);
        index++;
    }
    console.log(`oxyGen = ${possibilities}`)
    // for(let i = 0; i < input[0].length; i++) {
    //     let bits = _.map(input, row => { return Number(row[i])});
    //     console.log(bits);
    // }
    return "tbd";
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));