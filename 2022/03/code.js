const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(list) {
    let sacks = list.split('\n').map(sack => {
        let first = sack.slice(0, sack.length/2);
        let second = sack.slice(sack.length/2);
        let shared = null;

        for(let i = 0; i < first.length; i++) {
            if (second.indexOf(first[i]) > -1) {
                shared = first[i];
                break;
            }
        }

        return {
            first: first,
            second: second,
            shared: shared
        }
    });
    
    return getPriorities(sacks.map(sack => { return sack.shared}));
}

function getPriorities(items) {
    return items.map(item => {
                return (item === item.toUpperCase()) ? item.charCodeAt() - 38 : item.charCodeAt() - 96;
            }).reduce((a,b) => a+b, 0);
}

function part2(list) {
    let sacks = list.split('\n');
    let groups = [];
    while (sacks.length > 0) {
        groups.push(sacks.splice(0, 3));
    }

    let vals = groups.map(group => {
        let first = group[0];
        for (let i = 0; i < first.length; i++) {
            if (group[1].indexOf(first[i]) > -1 && group[2].indexOf(first[i]) > -1) {
                return first[i];
            }
        }
    })
    
    return getPriorities(vals);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));