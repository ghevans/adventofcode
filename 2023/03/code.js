const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let nums = input.filter(i => _.isNumber(i.val))
    let symbols = input.filter(i => !_.isNumber(i.val))

    let sum = 0;
    for (num of nums) {
        sum += checkNear(num, symbols) ? num.val : 0;
    }
    return sum;
}

function checkNear(num, symbols) {
    symbols = symbols.filter(s => (Math.abs(s.y - num.y) <= 1));
    for (symbol of symbols) {
        let minX = num.x - 1;
        let maxX = num.x + (''+num.val).length;

        if (symbol.x <= maxX && symbol.x >= minX) {
            return true;
        }
    }

    return false;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));