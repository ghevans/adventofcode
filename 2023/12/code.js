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

const getArrangements = (spring, groups, valid, regex) => {
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
            getArrangements(part1, groups, valid, regex);
            
            let part2 = [...spring];
            part2.splice(flips[0], 1, '#');
            getArrangements(part2, groups, valid, regex);
        }
    }

    return valid.size;
}

const numFolds = 5;
const unfold = (input) => {
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

class Possibility {
    constructor(curGroup, curCount, arrangements) {
        this.curGroup = curGroup;
        this.curCount = curCount;
        this.arrangements = arrangements;
    }
}

function workSmarter(springs, groups) {
    let options = [new Possibility(0,0,1)];
    for (let i = 0; i < springs.length; i++) {
        let currentSpring = springs[i];

        if (currentSpring === '?') {
            // walk through all current options and potentionally add the new options / prune if needed
            options = options.flatMap(opt => {
                let out = [];
                if(opt.curGroup < groups.length && opt.curCount < groups[opt.curGroup]) { // # case as long as we don't go past the count we need
                    out.push(new Possibility(opt.curGroup, opt.curCount+1, opt.arrangements));
                }

                if (opt.curCount === 0) { // . case, if count=0, we weren't building toward a group, so pass it along
                    out.push(opt);
                } else if (opt.curCount === groups[opt.curGroup]) { // . case, this checks if we closed out a group with this .
                    out.push(new Possibility(opt.curGroup+1, 0, opt.arrangements));
                }
                return out;
            }).filter(opt => opt !== undefined); // remove any steps that were pruned
        } else {
            // walk through all current options and adjust based on # or . (3 options: we finished a group (.), we have a non-impactful (.), we add to a currently building group as long as it's not too big / too many groups (#))
            options = options.flatMap(opt => {
                if (currentSpring === '#' && opt.curGroup < groups.length && opt.curCount < groups[opt.curGroup]) { // this will add to a current group as long as we haven't passed the needed number AND we aren't building more groups than needed
                    return new Possibility(opt.curGroup, opt.curCount+1, opt.arrangements);
                } else if (currentSpring === '.' && opt.curCount === 0) { // if count = 0, we weren't building toward a group, so pass this along
                    return opt;
                } else if (currentSpring === '.' && opt.curCount === groups[opt.curGroup]) { // we properly closed/spaced a group
                    return new Possibility(opt.curGroup+1, 0, opt.arrangements);
                }
            }).filter(opt => opt !== undefined); // remove any steps that were pruned
        }
        
        // Remove options that can't work
        options = options.filter(opt => opt.curGroup <= groups.length)
                        .filter(opt => (springs.length - i + opt.curCount) >= groups.slice(opt.curGroup).reduce((a,b) => a+b, 0));


        // There should be a better way of this, but basically count up duplicates for curGroup/curCount and collapse them back down to a single state
        let collapsed = new Map();
        for (opt of options) {
            if (collapsed.has(`${opt.curGroup},${opt.curCount}`)) {
                collapsed.set(`${opt.curGroup},${opt.curCount}`, collapsed.get(`${opt.curGroup},${opt.curCount}`) + opt.arrangements);
            } else {
                collapsed.set(`${opt.curGroup},${opt.curCount}`, opt.arrangements);
            }
        }

        // Start the next loop with no dups
        options = [];
        for (const [key, value] of collapsed.entries()) {
            options.push(new Possibility(Number(key.split(',')[0]), Number(key.split(',')[1]), value))
        }
    }

    // Final clean up to remove anything that didn't finish properly
    options = options.filter(opt => (opt.curGroup === groups.length) || ((opt.curGroup === (groups.length - 1)) && opt.curCount === groups[opt.curGroup]));

    return options.map(opt => opt.arrangements).reduce((a,b) => a+b,0);
}


function part1(input) {
    return input.map(spring => getArrangements(spring.spring, spring.groups, new Set(), buildRegex(spring.groups))).reduce((a,b) => a+b,0);
}

function part2(input) {
    return unfold(input).map(spring => workSmarter(spring.spring, spring.groups)).reduce((a,b) => a+b,0);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));