const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let score = 0;
    for (card of input) {
        let matches = _.intersection(card.winners, card.numbers);
        score += (matches.length > 0) ? Math.pow(2,matches.length-1) : 0;
    }
    return score;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));