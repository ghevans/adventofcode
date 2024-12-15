const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    const rules = input[0];
    const updates = input[1];

    let validUpdates = [];
    for (update of updates) {
        
        let valid = true;
        for(let i = 0; i < update.length; i++) {
            let rule = rules.get(update[i]);
            let prevPages = update.slice(0, i), postPages = update.slice(i+1);
            
            for (prev of prevPages) {
                if (!rule.after.includes(prev)) {
                    valid = false;
                    break;
                }
            }
            for (post of postPages) {
                if (!rule.before.includes(post)) {
                    valid = false;
                    break;
                }
            }

            if (!valid) { break; }
        }

        if (valid) { validUpdates.push(update); }
    }

    return validUpdates.map(u => u[Math.round((u.length - 1) / 2)]).reduce((a,b) => a + b);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));