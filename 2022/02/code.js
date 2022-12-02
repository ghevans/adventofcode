const _ = require('lodash');
const {input, testInput} = require('./input');

const turnVals = {
    'rock': 1,
    'paper': 2,
    'scissors': 3
}

function part1(input) {
    return input.map(doRound).reduce((a,b) => a+b, 0);
}

function doRound(moves) {

    let winner = ((moves.opp === 'rock' && moves.me === 'paper') ||
                  (moves.opp === 'paper' && moves.me === 'scissors') ||
                  (moves.opp === 'scissors' && moves.me === 'rock'));

    return (winner) ? (6 + turnVals[moves.me]) : (moves.opp === moves.me) ? (3 + turnVals[moves.me]) : turnVals[moves.me];
}

let endRound = {
    'rock': 'L',
    'paper': 'D',
    'scissors': 'W'
}

function part2(input) {
    input = input.map(round => {
        return {
            opp: round.opp,
            end: endRound[round.me]
        }
    })
    
    return input.map(doRound2).reduce((a,b) => a+b, 0);
}

function doRound2(round) {

    let score = {
        'W': {
            'rock': turnVals['paper'],
            'paper': turnVals['scissors'],
            'scissors': turnVals['rock']
            },
        'D': turnVals[round.opp],
        'L': {
            'rock': turnVals['scissors'],
            'paper': turnVals['rock'],
            'scissors': turnVals['paper']
            }
    }

    return (round.end === 'W') ? (6 + score[round.end][round.opp]) : (round.end === 'D') ? (3 + score[round.end]) : score[round.end][round.opp];
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));