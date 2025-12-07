const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let count = 0;
    for(y=0; y < input.length; y++) {
        for(x = 0; x < input[0].length; x++) {
            if (input[y][x] === '@') {
                count += (helper.getAllNeighbors(input, y, x).filter(c => c==='@').length < 4) ? 1 : 0;
            }
        }
    }
    return count;
}

function part2(input) {
    let count = 0, toRemove = [], updated = true;

    while (updated) {
        updated = false;
        for(y=0; y < input.length; y++) {
            for(x = 0; x < input[0].length; x++) {
                if (input[y][x] === '@') {
                    if (helper.getAllNeighbors(input, y, x).filter(c => c==='@').length < 4) {
                        count++;
                        toRemove.push({y: y, x: x});
                        updated = true;
                    }
                }
            }
        }
        input = removeRolls(input, toRemove);
    }
    return count;
}

function removeRolls(grid, toRemove) {
    let out = grid;
    for (loc of toRemove) {
        out[loc.y][loc.x] = '.'
    }
    return out;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));