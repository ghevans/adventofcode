const _ = require('lodash');
const {input, testInput} = require('./input');

const isPossible = (string, length) => (string[0] === '.') ? false : (string.substring(0,length).split('').every(c => c != '.')) ? true : false;
const optionsLeft = (spring) => spring.filter(c => c !== '.').length;
const spotsNeeded = (groups) => groups.reduce((a,b) => a+b, 0);
const buildRegex = (groups) => {
    let r = '\\#{';
    for (let i = 0; i < groups.length; i++) {
        r += groups[i] + '}.+\\#{';
    }
    return RegExp(r.substring(0, r.length-5),'g')
}
const buildOptions = (spring, groups, options, regex) => {
    if ((options.has(spring.join('')) ||
        (optionsLeft(spring) < spotsNeeded(groups)))) {
        return;
    }

    if (spring.every(c => c !== '?') && optionsLeft(spring) === spotsNeeded(groups)) {
        let match = regex.exec(spring.join(''));
        if (match) {
            options.add(spring.join(''));
        }
    } else {
        for(let i = 0; i < spring.length; i++) {
            if (spring[i] === '?') {
                let part = [...spring];
                part.splice(i,1,'.');
                buildOptions(part, groups, options, regex);
                part.splice(i,1,'#');
                buildOptions(part, groups, options, regex);
            }
        }
    }
}

function part1(input) {
    let totalArrangements = 0;
    for (spring of input) {
        let options = new Set();

        let regex = buildRegex(spring.groups);

        // console.log(`Starting to work on ${spring.spring}`)
        buildOptions(spring.spring, spring.groups, options, regex);
        console.log(`Finished working on ${spring.spring} which has [${options.size}] arrangements`)

        totalArrangements += options.size;
        // break;
    }
    return totalArrangements;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));