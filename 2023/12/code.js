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
const buildOptions = (spring, groups, options, valid, regex) => {
    if (spring.every(c => c !== '?')) {
        // if(options.has(spring.join(''))) {
        //     return; 
        // } else {
            options.add(spring.join(''));
        // }

    }
    // options.add(spring.join(''))
    // console.log(`checking: ${spring.join('')}`)
    // if ((options.has(spring.join('')) ||
    //     (optionsLeft(spring) < spotsNeeded(groups)))) {
    //     return;
    // }

    // if (spring.join('') === '.#.###.#.######') {
    //     console.log('here')
    // }

    if (spring.every(c => c !== '?') && optionsLeft(spring) === spotsNeeded(groups)) {
        let match = regex.exec(spring.join(''));
        if (match && !valid.has(spring.join(''))) {
            console.log(spring.join(''))
            valid.add(spring.join(''));
        }
    } else {
        let flips = spring.map((c, i) => [c, i]).filter(([c]) => c === '?').map(([c, i]) => i);
        for(i of flips) {
        // for(let i = 0; i < spring.length; i++) {
            // if (spring[i] === '?') {
                let part1 = [...spring];
                part1.splice(i,1,'.');
                // if (!options.has(part.join(''))) {
                    buildOptions(part1, groups, options, valid, regex);
                // }
                let part2 = [...spring];
                part2.splice(i,1,'#');
                // if (!options.has(part.join(''))) {
                    buildOptions(part2, groups, options, valid, regex);
                // }
            // }
        }
    }
}

function part1(input) {
    let totalArrangements = 0;
    for (const [index, spring] of input.entries()) {
        let options = new Set();
        let valid = new Set();
        let regex = buildRegex(spring.groups);

        console.log(`Starting to work on ${spring.spring} with groups ${spring.groups}`)
        // console.log(regex)
        // console.log(index)
        buildOptions(spring.spring, spring.groups, options, valid, regex);
        console.log(valid)
        // console.log(options.has('.#.###.#.######'))
        totalArrangements += valid.size;
        // break;
    }
    return totalArrangements;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));