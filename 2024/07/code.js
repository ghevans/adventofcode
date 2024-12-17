const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

function part1(input) {
    let correct = [];

    for (line of input) {
        if (performStep(line.output, line.vals[0], _.clone(line.vals.slice(1)), '+', `${line.vals[0]}`)) {
            correct.push(line);
        } else if(performStep(line.output, line.vals[0], _.clone(line.vals.slice(1)), '*', `${line.vals[0]}`)) {
            correct.push(line);
        }
    }

    // console.log(correct);
    return correct.map(v => v.output).reduce((a,b) => a + b);
}

const performStep = (output, currentVal, rest, operator, str) => {
    let nextOper = rest.shift();
    let nextVal = (operator === '+') ? currentVal + nextOper : currentVal * nextOper;

    if (nextVal > output) { 
        return false;
    } else if (rest.length === 0) {
        return (output === nextVal);
    }

    if (performStep(output, nextVal, _.clone(rest), '+', str.concat(` ${operator} ${nextOper}`))) {
        return true;
    }
    if (performStep(output, nextVal, _.clone(rest), '*', str.concat(` ${operator} ${nextOper}`))) {
        return true;
    }
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));