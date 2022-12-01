const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(rations) {
    elfRations = rations.split('\n\n').map(pack => {
        parts = pack.split('\n').map(Number);
        return {
            rations: parts,
            total: parts.reduce((a,b) => a+b, 0)
        }
    });
    
    return _.maxBy(elfRations, "total").total;
}

function part2(rations) {
    elfRations = rations.split('\n\n').map(pack => {
        parts = pack.split('\n').map(Number);
        return {
            rations: parts,
            total: parts.reduce((a,b) => a+b, 0)
        }
    });

    elfRations = _.sortBy(elfRations, "total").reverse();
    
    return elfRations[0].total + elfRations[1].total + elfRations[2].total;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));