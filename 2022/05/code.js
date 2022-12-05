const _ = require('lodash');
const {input, startStack, testInput, testStartStack} = require('./input');

function part1(inst, stack) {
    let moves = inst.split('\n').map(getMove);

    _.forEach(moves, move => {
        for (let i = 0; i < move.size; i++) {
            stack[move.to].push(stack[move.from].pop());
        }
    })

    return getTops(stack);
}

function part2(inst, stack) {
    let moves = inst.split('\n').map(getMove);
    _.forEach(moves, move => {
        stack[move.to].push.apply(stack[move.to], stack[move.from].splice(-move.size, move.size));
    })

    return getTops(stack);
}

function getTops(stack) {
    let ans = '';
    for (let i = 1; i <= Object.keys(stack).length; i++) {
        ans += stack[i][stack[i].length-1];
    }
    return ans;
}

function getMove(move) {
    let parts = move.split(' ');
    return {
        size: Number(parts[1]),
        from: Number(parts[3]),
        to: Number(parts[5])
    }
}

// console.log("Part 1 - " + part1(input, startStack));
console.log("Part 2 - " + part2(input, startStack));