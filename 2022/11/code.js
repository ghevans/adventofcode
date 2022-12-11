const _ = require('lodash');
const {input, testInput} = require('./input');

function monkeyInTheMiddle(rules, numRounds, part) {
    let calmFactor = (part === 1) ? 3 : _.toArray(rules).map(rule => rule.test).reduce((a,b) => a*b, 1);

    for(let round = 0; round < numRounds; round++) {
        for(let i = 0; i < Object.keys(rules).length; i++) {
            let monkey = rules[i];

            for (item of monkey.items) {
                monkey.inspected++;
                if (monkey.opVal === -1) {
                    item = item * item;
                } else {
                    item = (monkey.op === '+') ? item+monkey.opVal : item*monkey.opVal;
                }

                item = (part === 1) ? Math.floor(item / calmFactor) : item % calmFactor;
                if (item % monkey.test === 0) {
                    rules[monkey.ifTrue].items.push(item);
                } else {
                    rules[monkey.ifFalse].items.push(item);
                }
            }
            monkey.items = [];
        }
        // if ([0,19,999,1999,2999,3999,4999,5999,6999,7999,8999,9999].includes(round)) {
        //     printInspected(rules, round);
        // }
    }
    
    return _.sortBy(rules, 'inspected')
            .reverse()
            .map(monkey => { return monkey.inspected;})
            .slice(0,2)
            .reduce((a,b) => a*b, 1);
}

function printInspected(rules, round) {
    console.log(`\n== After round ${round+1} ==`)
    for (let i = 0; i < Object.keys(rules).length; i++) {
        console.log(`Monkey ${i} inspected items ${rules[i].inspected} times.`)
    }
}

// console.log("Part 1 - " + monkeyInTheMiddle(input, 20, 1));
console.log("Part 2 - " + monkeyInTheMiddle(input, 10000, 2));