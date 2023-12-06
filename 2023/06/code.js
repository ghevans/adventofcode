const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let winners = [];
    for(let race = 0; race < input.times.length; race++) {
        let raceW = 0;
        for (let i = 0; i <= input.times[race]; i++) {
            let dist = i * (input.times[race] - i); 
            raceW += (dist > input.dists[race]) ? 1 : 0;
        }
        winners.push(raceW);
    }
    return winners.reduce((a,b) => a*b);
}


function part2(input) {
    let time = Number(input.times.map(n => ''+n).join(''));
    let dist = Number(input.dists.map(n => ''+n).join(''));
    let raceW = 0;
    for (let i = 0; i <= time; i++) {
        let raceD = i * (time - i); 
        raceW += (raceD > dist) ? 1 : 0;
    }
    return raceW;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));
