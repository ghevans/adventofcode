const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let instructions = input.match(/mul\((\d{1,3}),(\d{1,3}\))/g);
    return instructions.map(ins => {
        return ins.match(/\d{1,3}/g).map(Number).reduce((a,b) => a*b);
    }).reduce((a,b) => a+b);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));