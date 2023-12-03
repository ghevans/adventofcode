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
    symbols = symbols.filter(s => (Math.abs(s.y - num.y) <= 1))
                     .filter(s => ((s.x <= num.x + (''+num.val).length) && (s.x >= num.x - 1)));
    
    return (symbols.length > 0) ? true : false;
}

function part2(input) {
    let nums = input.filter(i => _.isNumber(i.val))
    let gears = input.filter(i => i.val === '*')

    let sum = 0;
    for (gear of gears) {
        sum += findGears(gear, nums);
    }
    return sum;
}

function findGears(gear, nums) {
    nums = nums.filter(n => (Math.abs(n.y - gear.y) <= 1))
               .filter(n => ((gear.x >= n.x - 1) && (gear.x <= n.x + (''+n.val).length)));

    return (nums.length === 2) ? nums.reduce((a,b) => a.val*b.val) : 0;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));