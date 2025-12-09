const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let eqs = _.zip(...input);
    let solutions = [];
    
    for (eq of eqs) {
        let func = eq.pop();
        let vals = eq.map(Number);
        switch (func) {
            case '+':
                solutions.push(vals.reduce((a,b) => a + b, 0));
                break;
            case '*':
                solutions.push(vals.reduce((a,b) => a * b, 1));
                break;
        }
    }
    
    return solutions.reduce((a,b) => a+b, 0);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));