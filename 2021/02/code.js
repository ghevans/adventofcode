const _ = require('lodash');
const input = require('./input');

function part1(input) {
    let loc = {pos: 0, depth: 0};
    _.forEach(input, step => {
        switch(step.type) {
            case 'forward': 
                loc.pos += step.val;
                break;
            case 'down':
                loc.depth += step.val;
                break;
            case 'up':
                loc.depth -= step.val;
                break;
        }
    })
    return loc.pos * loc.depth;
}

function part2(input) {
    let loc = {pos: 0, depth: 0, aim: 0}
    _.forEach(input, step => {
        switch(step.type) {
            case 'forward': 
                loc.pos += step.val;
                loc.depth += loc.aim*step.val;
                break;
            case 'down':
                loc.aim += step.val;
                break;
            case 'up':
                loc.aim -= step.val;
                break;
        }
    })
    return loc.pos * loc.depth;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));