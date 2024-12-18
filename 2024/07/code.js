const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const performStep = (output, currentVal, rest, operator, str, allowConcat) => {
    let nextOper = rest.shift();
    let nextVal = (operator === '+') ? currentVal + nextOper : (operator === '*') ? currentVal * nextOper : Number(''+ currentVal + nextOper);

    if (nextVal > output) { 
        return false;
    } else if (rest.length === 0) {
        return (output === nextVal);
    }

    if (performStep(output, nextVal, _.clone(rest), '+', str.concat(` ${operator} ${nextOper}`), allowConcat)) {
        return true;
    }
    if (performStep(output, nextVal, _.clone(rest), '*', str.concat(` ${operator} ${nextOper}`), allowConcat)) {
        return true;
    }
    if (allowConcat) {
        if (performStep(output, nextVal, _.clone(rest), '||', str.concat(` ${operator} ${nextOper}`), allowConcat)) {
            return true;
        }
    }
}

function part1(input, allowConcat) {
    let correct = [];

    for (line of input) {
        if (performStep(line.output, line.vals[0], _.clone(line.vals.slice(1)), '+', `${line.vals[0]}`, allowConcat)) {
            correct.push(line);
        } else if(performStep(line.output, line.vals[0], _.clone(line.vals.slice(1)), '*', `${line.vals[0]}`, allowConcat)) {
            correct.push(line);
        } else if(allowConcat) {
            if (performStep(line.output, line.vals[0], _.clone(line.vals.slice(1)), '||', `${line.vals[0]}`, allowConcat)) {
                correct.push(line);
            }
        }
    }

    return correct.map(v => v.output).reduce((a,b) => a + b);
}

console.log("Part 1 - " + part1(input, false));
console.log("Part 2 - " + part1(input, true));