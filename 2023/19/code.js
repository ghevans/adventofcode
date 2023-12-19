const _ = require('lodash');
const {realWorkflows, realParts, testWorkflows, testParts} = require('./input');
const helper = require('../../helpers');

class Ranges {
    constructor(x, m, a, s) {
        this.x = x;
        this.m = m;
        this.a = a;
        this.s = s;
    }

    clone() {
        return new Ranges(this.x, this.m, this.a, this.s);
    }

    possibilites() {
        return  Math.abs(this.x[1] - this.x[0] + 1) * Math.abs(this.m[1] - this.m[0] + 1) 
                * Math.abs(this.a[1] - this.a[0] + 1) * Math.abs(this.s[1] - this.s[0] + 1);
    }
}

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


function walkTree(prevPath, prevRanges, curLoc, workflows) {
    let out = 0;
    if (curLoc === 'R') {
        return 0;
    } else if (curLoc === 'A') {
        return prevRanges.possibilites();
    } else {
        let curWorkflow = workflows.get(curLoc);
        let rules = [...curWorkflow.rules];
        for (let i = 0; i < rules.length; i++) {
            let nextRanges = prevRanges.clone();
            let rule = rules[i];
            let newPath = prevPath+'->'+curWorkflow.name;

            for(let j = 0; j < i; j++) {
                let ruleToFlip = rules[j];
                nextRanges[ruleToFlip.category] = ruleToFlip.notSelected(nextRanges[ruleToFlip.category]);
            }
            nextRanges[rule.category] = rule.selected(nextRanges[rule.category]);
            out += walkTree(newPath, nextRanges, rule.nextWorkflow, workflows);
        }
    }
    
    return out;
}

function part2(workflows) {
    let total = 0;
    workflows.set('A', null);
    workflows.set('R', null);

    let rulesToEval = [...workflows.get('in').rules];
    for (let i = 0; i < rulesToEval.length; i++) {
        let rule = rulesToEval[i];
        let ranges = new Ranges([1,4000],[1,4000],[1,4000],[1,4000]);

        for(let j = 0; j < i; j++) {
            let ruleToFlip = rulesToEval[j];
            ranges[ruleToFlip.category] = ruleToFlip.notSelected(ranges[ruleToFlip.category]);
        }

        ranges[rule.category] = rule.selected(ranges[rule.category]);

        total += walkTree('in', ranges, rule.nextWorkflow, workflows);
    }
    return total;
}

console.log("Part 1 - " + part1(realWorkflows, realParts));
console.log("Part 2 - " + part2(realWorkflows));