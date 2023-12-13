const _ = require('lodash');
const {input, testInput} = require('./input');

const isPossible = (string, length) => (string[0] === '.') ? false : (string.substring(0,length).split('').every(c => c != '.')) ? true : false;
const optionsLeft = (spring) => spring.filter(c => c !== '.').length;
const spotsNeeded = (groups) => groups.reduce((a,b) => a+b, 0);
const buildRegex = (groups) => {
    let r = '[^#]*\\#{';
    for (let i = 0; i < groups.length; i++) {
        r += groups[i] + '}\\.+\\#{';
    }
    return RegExp(r.substring(0, r.length-6) + '[^#]*')
}
const getArrangements = (spring, groups, options, valid, regex) => {
    if (spring.every(c => c !== '?') && optionsLeft(spring) === spotsNeeded(groups)) {
        let match = regex.exec(spring.join(''));
        if (match) {
            valid.add(spring.join(''));
        }
    } else {
        let flips = spring.map((c, i) => [c, i]).filter(([c]) => c === '?').map(([c, i]) => i);
        if (flips.length) {
            let part1 = [...spring];
            part1.splice(flips[0], 1, '.');
            getArrangements(part1, groups, options, valid, regex);
            
            let part2 = [...spring];
            part2.splice(flips[0], 1, '#');
            getArrangements(part2, groups, options, valid, regex);
        }
    }
}

function part1(input) {
    let totalArrangements = 0;
    for (const [index, spring] of input.entries()) {
        let options = new Set();
        let valid = new Set();
        
        getArrangements(spring.spring, spring.groups, options, valid, buildRegex(spring.groups));
        
        totalArrangements += valid.size;
    }
    return totalArrangements;
}

function part2(input) {
    let expandedRecords = unfold(input);

    let totalArrangements = 0;
    for (spring of expandedRecords) {
        let options = new Set();
        let valid = new Set();
        console.log(`Starting ${spring.spring}`)
        getArrangements(spring.spring, spring.groups, options, valid, buildRegex(spring.groups));
        console.log(`Found ${valid.size} arrangements`)
        totalArrangements += valid.size;
    }
    return totalArrangements;
}

// ???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3
// ???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3
const numFolds = 5;
function unfold(input) {
    let out = [];
    for (spring of input) {
        spring.spring.push('?')
        let s = Array(numFolds).fill(spring.spring).flat();
        s.pop();
        let g = Array(numFolds).fill(spring.groups);
        out.push({
            spring : s.flat(),
            groups: g.flat()
        })
    }
    return out;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));