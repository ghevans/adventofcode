const _ = require('lodash');
const {input, testInput} = require('./input');



let openSet = ['(','[','{','<'];
let closeSet = [')',']','}','>'];

function part1(subsystem) {
    let score = 0;
    for (line of subsystem) {
        let stack = [];
        for(char of line) {
            if (openSet.includes(char)) {
                stack.push(char);
            } else {
                let found = stack.pop();
                if (openSet.indexOf(found) != closeSet.indexOf(char)) {
                    switch(char) {
                        case ')':
                            score += 3;
                            break;
                        case ']':
                            score += 57;
                            break;
                        case '}':
                            score += 1197;
                            break;
                        case '>':
                            score += 25137;
                            break;
                    }
                }
            }
        }
    }
    return score;
}

function removeCorrupted(subsystem) {
    let cleaned = [];
    for (line of subsystem) {
        let stack = [];
        let corrupted = false;
        for(char of line) {
            if (openSet.includes(char)) {
                stack.push(char);
            } else {
                let found = stack.pop();
                if (openSet.indexOf(found) != closeSet.indexOf(char)) {
                    corrupted = true;
                    break;
                }
            }
        }
        if (!corrupted) {
            cleaned.push(line);
        }
    }
    return cleaned;
}

function part2(subsystem) {
    let incomplete = removeCorrupted(subsystem);

    let scores = [];
    for (line of incomplete) {
        let stack = [];    
        let score = 0;

        for(char of line) {
            if (openSet.includes(char)) {
                stack.push(char);
            } else {
                stack.pop();
            }
        }

        while(stack.length > 0) {
            let char = stack.pop();
            score *= 5;
            score += openSet.indexOf(char) + 1;
        }
        scores.push(score);
    }
    scores.sort((a,b) => a-b);
    return scores[Math.floor(scores.length/2)];
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));