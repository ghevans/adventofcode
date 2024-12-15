const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const checkUpdates = (rules, updates) => {
    let validUpdates = [], invalidUpdates = [];

    for (update of updates) {
        if (checkUpdate(rules, update)) { 
            validUpdates.push(update); 
        } else {
            invalidUpdates.push(update);
        }
    }

    return [validUpdates, invalidUpdates];
}

const checkUpdate = (rules, update) => {
    for(let i = 0; i < update.length; i++) {
        let rule = rules.get(update[i]);
        let prevPages = update.slice(0, i), postPages = update.slice(i+1);
        
        for (prev of prevPages) {
            if (!rule.after.includes(prev)) {
                return false;
            }
        }
        for (post of postPages) {
            if (!rule.before.includes(post)) {
                return false;
            }
        }
    }

    return true;
}

function part1(input) {
    [validUpdates, invalidUpdates] = checkUpdates(input[0], input[1]);

    return validUpdates.map(u => u[Math.round((u.length - 1) / 2)]).reduce((a,b) => a + b);
}

const fixOnce = (rules, update) => {
    for(let i = 0; i < update.length; i++) {
        let rule = rules.get(update[i]);
        let prevPages = update.slice(0, i), postPages = update.slice(i+1);
        
        for (prev of prevPages) {
            if (!rule.after.includes(prev)) {
                [update[update.indexOf(prev)], update[update.indexOf(update[i])]] = [update[update.indexOf(update[i])], update[update.indexOf(prev)]];
                return update;
            }
        }
        for (post of postPages) {
            if (!rule.before.includes(post)) {
                [update[update.indexOf(post)], update[update.indexOf(update[i])]] = [update[update.indexOf(update[i])], update[update.indexOf(post)]];
                return update;
            }
        }
    }

    return true;
}

const correctInvalid = (rules, updates) => {
    let correctedUpdates = [];

    for (option of updates) {
        while (true) {
            option = fixOnce(rules, option);
            if (checkUpdate(rules, option)) {
                correctedUpdates.push(option);
                break;
            }
        }
    }

    return correctedUpdates;
}

function part2(input) {
    [validUpdates, invalidUpdates] = checkUpdates(input[0], input[1]);
    
    return correctInvalid(input[0], invalidUpdates).map(u => u[Math.round((u.length - 1) / 2)]).reduce((a,b) => a + b, 0);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));