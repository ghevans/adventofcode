const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let program = getProgram(input);
    let register = 1, cycle = 0;
    let signalStrength = [];
    let checkPoints = [20, 60, 100, 140, 180, 220];

    for (inst of program) {
        let numCycles = (inst.type === 'noop') ? 1 : 2;
        for (let i = 0; i < numCycles; i++) {
            cycle++;
            if (checkPoints.includes(cycle)) {
                signalStrength.push(cycle * register)
            }
        }
        register += (inst.type === 'addx') ? inst.val : 0;
    }

    return signalStrength.reduce((a,b) => a+b, 0);
}

const getProgram = function(input) {
    return input.split('\n').map(line => {
        let parts = line.split(' ');
        return {
            type: parts[0],
            val: (parts[0] !== 'noop') ? Number(parts[1]) : null
        }
    })
}
function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));