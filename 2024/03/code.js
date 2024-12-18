const _ = require('lodash');
const {input, testInput, testInput2} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let instructions = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
    return instructions.map(ins => {
        return ins.match(/\d{1,3}/g).map(Number).reduce((a,b) => a*b);
    }).reduce((a,b) => a+b);
}

function part2(input) {
    let instructions = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);

    let ignore = false;
    return instructions.map(ins => {
        if (ins === `don't()`) {
            ignore = true;
            return 0;
        } else if (ins === `do()`) {
            ignore = false;
            return 0;
        } else {
            return (!ignore) ? ins.match(/\d{1,3}/g).map(Number).reduce((a,b) => a*b) : 0;
        } 
    }).reduce((a,b) =>  a+b );
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));