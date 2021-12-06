const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input, days) {
    let allFish = _.cloneDeep(input);

    for(let i = 1; i <= days; i++) {
        let newFish = 0;
        for(let idx = 0; idx < allFish.length; idx++) {
            if (allFish[idx] === 0) {
                newFish++;
                allFish[idx] = 6;
            } else {
                allFish[idx] -= 1;
            }
        }
        for(let count = 0; count < newFish; count++) {
            allFish.push(8);
        }
    }
    return allFish.length;
}

function part2(input, days) {
    // console.log(input);
    let lastGen = new Map();
    for(age of input) {
        if (lastGen.has(age)) {
            lastGen.set(age, lastGen.get(age) + 1);
        } else {
            lastGen.set(age, 1);
        }
    }
    
    for(let i = 1; i <= days; i++) {
        let ages = new Map([...lastGen.entries()].sort()).keys();
        
        let nextGen = new Map();
        for (age of ages) {
            if (age === 0) {
                nextGen.set(6, lastGen.get(age));
                nextGen.set(8, lastGen.get(age));
            } else {
                if (nextGen.has(age-1)) {
                    nextGen.set(age-1, nextGen.get(age-1) + lastGen.get(age));
                } else {
                    nextGen.set(age-1, lastGen.get(age));
                }
            }
        }
        lastGen = nextGen;
    }

    let totalFish = 0;
    for (const [age, count] of lastGen) {
        totalFish += count;
    }
    return totalFish;
}

console.log("Part 1 - " + part1(input, 80));
console.log("Part 2 - " + part2(input, 256));