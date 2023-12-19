const _ = require('lodash');
const {realWorkflows, realParts, testWorkflows, testParts} = require('./input');
const helper = require('../../helpers');

function part1(workflows, parts) {
    let validParts = [], rejectedParts = [];
    for (part of parts) {
        let rulesToEval = [...workflows.get('in').rules];
        let rule = rulesToEval.shift();
        while (rule !== undefined) {
            if (rule.category === '') { // end of the rule list, either A/R/nextWorkflow
                if (rule.nextWorkflow === 'A') {
                    validParts.push(part);
                    break;
                } else if (rule.nextWorkflow === 'R') {
                    rejectedParts.push(part);
                    break;
                } else {
                    rulesToEval = [];
                    rulesToEval = [...workflows.get(rule.nextWorkflow).rules];
                }
            } else {
                if (rule.validate(part)) {
                    if (rule.nextWorkflow === 'A') {
                        validParts.push(part);
                        break;
                    } else if (rule.nextWorkflow === 'R') {
                        rejectedParts.push(part);
                        break;
                    } else {
                        rulesToEval = [];
                        rulesToEval = [...workflows.get(rule.nextWorkflow).rules];
                    }
                }
            }
            rule = rulesToEval.shift();
        }
    }

    return validParts.map(part => Object.values(part).reduce((a,b) => a+b,0)).reduce((a,b) => a+b, 0);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(realWorkflows, realParts));
// console.log("Part 2 - " + part2(testInput));