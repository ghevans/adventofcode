const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const buildLists = (lists) => {
    const list1 = [], list2 = [];

    lists.split('\n').map(line => {
        list1.push(Number(line.split('   ')[0]));
        list2.push(Number(line.split('   ')[1]));
    });

    return [_.sortBy(list1), _.sortBy(list2)];
}

function part1(input) {
    let lists = buildLists(input);

    let totalDist = 0;
    for(let i = 0; i < lists[0].length; i++) {
        totalDist += Math.abs(lists[0][i] - lists[1][i]);
    }
    return totalDist;
}

function part2(input) {
    let lists = buildLists(input);
    return "tbd";
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));