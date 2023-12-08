const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let loc = 'AAA';
    let steps = 0;

    while(true) {
        let dir = input.inst[steps%input.inst.length];
        // console.log(`Moving from ${loc} to the ${dir} meaning ${(dir === 'L') ? input.map[loc][0] : input.map[loc][1]}`);
        loc = (dir === 'L') ? input.map[loc][0] : input.map[loc][1];
        steps++;
        if(loc === 'ZZZ') {
            return steps;
        }
    }
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));