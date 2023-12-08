const _ = require('lodash');
const { lcm } = require('mathjs')
const {input, testInput, testInput2} = require('./input');

function part1(input) {
    let loc = 'AAA';
    let steps = 0;

    while(true) {
        let dir = input.inst[steps%input.inst.length];
        // console.log(`Moving from ${loc} to the ${dir} meaning ${(dir === 'L') ? input.map[loc][0] : input.map[loc][1]}`);
        loc = (dir === 'L') ? input.map[loc][0] : input.map[loc][1];
        steps++;
        if(loc === 'ZZZ') {
            return steps;
        }
    }
}

function part2(input) {
    let startingNodes = Object.keys(input.map).filter(node => node[2] === 'A');
    let totalSteps = [];
    
    for (let i = 0; i < startingNodes.length; i++) {
        let curNode = startingNodes[i];
        let steps = 0;
        while(true) {
            let nextDir = input.inst[steps%input.inst.length];
            let nextNode = (nextDir === 'L') ? input.map[curNode][0] : input.map[curNode][1];
            steps++;

            if(nextNode[2] === 'Z') {
                break;
            }
            curNode = nextNode;
        }
        totalSteps.push(steps);
    }
    return lcm(...totalSteps);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));