const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(map) {
    // console.log(map)

    let totalRisk = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let height =  map[y][x];
            let up = map[y-1]?.[x] ?? 10;
            let down = map[y+1]?.[x] ?? 10;
            let left = map[y]?.[x-1] ?? 10;
            let right = map[y]?.[x+1] ?? 10;

            if (height < up && height < down && height < left && height < right) {
                // console.log(`\t${up}\n${left}\t${map[y][x]}\t${right}\n\t${down}`)
                // console.log(`LOW POINT FOUND\n`)
                totalRisk += height+1;
            }
        }
    }
    return totalRisk;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));