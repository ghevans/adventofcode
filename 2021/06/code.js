const _ = require('lodash');
const {input, testInput} = require('./input');

function simulate(input, days) {
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
            let count = lastGen.get(age);
            if (age === 0) {
                nextGen.set(6, count);
                nextGen.set(8, count);
            } else {
                if (nextGen.has(age-1)) {
                    nextGen.set(age-1, nextGen.get(age-1) + count);
                } else {
                    nextGen.set(age-1, count);
                }
            }
        }
        lastGen = nextGen;
    }

    let totalFish = 0;
    for (count of lastGen.values()) {
        totalFish += count;
    }
    return totalFish;
}

console.log("Part 1 - " + simulate(input, 80));
console.log("Part 2 - " + simulate(input, 256));