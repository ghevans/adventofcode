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
    let cardMap = {};
    for (card of input) {
        cardMap[card.num] = 1;
    }

    for (card of input) {
        let matches = _.intersection(card.winners, card.numbers).length;
        for (let j = 0; j < cardMap[card.num]; j++) {
            for (let i = 1; i <= matches; i++) {
                cardMap[card.num+i] = cardMap[card.num+i] + 1;
            }
        }
    }
    return _.sum(Object.values(cardMap));
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));