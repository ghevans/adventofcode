const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let pos = 50, max = 99, min = 0;
    let runs = 0;
    console.log(`The dial starts by pointing at 50`)
    for (ins of input) {
        // console.log(`turning ${ins.dir} for ${ins.val} turns`);
        let fullTurns = Math.trunc(ins.val / 100);
        let actMoves = ins.val % 100;
        let from = pos;
        switch (ins.dir) {
            case 'L':
                nextPos = pos - actMoves;
                if (nextPos < 0) {
                    pos = 100 + nextPos;
                } else {
                    pos = nextPos;
                }
                break;
            case 'R':
                nextPos = pos + actMoves;
                if (nextPos > 99) {
                    pos = nextPos - 100;
                } else {
                    pos = nextPos;
                }
                break;
        }
    
        if (ins.dir === 'R') {
            console.log(`[${ins.dir}${ins.val}]:\t[${from} -> ${pos}] which was ${fullTurns} full turns and (${actMoves}) moves`)
        } else {
            console.log(`[${ins.dir}${ins.val}]:\t[${pos} <- ${from}] which was ${fullTurns} full turns and (${actMoves}) moves`)
        }
        runs++;
        // if (runs >= 100) break;
    }
    return pos;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));