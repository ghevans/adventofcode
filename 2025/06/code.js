const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    input = input.map(row => row.trim().split(' ').filter(c => c !== ""));
    let eqs = _.zip(...input);
    let solutions = [];
    
    for (eq of eqs) {
        let func = eq.pop();
        let vals = eq.map(Number);
        solutions.push(doOperation(vals, func));
    }
    
    return solutions.reduce((a,b) => a+b, 0);
}

function part2(input) {
    let sum = 0, func = '', currentGroup = [];

    for (let x = input[0].length - 1; x >= 0; x--) {
        let num = '', blank = true;

        for(let y = 0; y < input.length; y++) {
            let char = input[y][x];

            if (/\d/.test(char)) {
                num += char;
                blank = false;
            } else if (['+', '*'].includes(char)) {
                func = char;
                blank = false;
            }
        }

        if (!blank) {
            if (num.length > 0) {
                currentGroup.push(parseInt(num));
            }
        } else {
            if (currentGroup.length > 0) {
                sum += doOperation(currentGroup, func);

                // reset the column
                currentGroup = [];
                func = '';
            }
        }
    }

    sum += doOperation(currentGroup, func);

    return sum;
}

function doOperation(vals, func) {
    switch (func) {
        case '+':
            return vals.reduce((a,b) => a + b, 0);
        case '*':
            return vals.reduce((a,b) => a * b, 1);
    }
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));