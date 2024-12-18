const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const findAntennas = (map) => {
    let antennas = new Map();
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] != '.') {
                if (!antennas.has(map[y][x])) {
                    antennas.set(map[y][x], [[y,x]])
                } else {
                    antennas.get(map[y][x]).push([y,x])
                }
            }
        }
    }
    return antennas;
}

function part1(input) {
    let antennas = findAntennas(input);

    let antinodes = [];
    antennas.forEach(type => {
        // console.log(`STARTING to build antinodes with: ${type}`)
        while (type.length > 0) {
            let cur = type.shift();
            // console.log(`\tSTARTING ${cur}`)
            for (let i = 0; i < type.length; i++) {
                // console.log(`\t\tCOMPARING to [${type[i]}]`)
                let distY = cur[0] - type[i][0];
                let distX = cur[1] - type[i][1];
                // console.log(`\t\t\tdist is = [${distY}, ${distX}]`)
                // console.log(`\t\t\tantinode at [${cur[0] + distY}, ${cur[1] + distX}]`)
                // console.log(`\t\t\tantinode at [${type[i][0] + (distY*-1)}, ${type[i][1] + (distX*-1)}]`)

                antinodes.push([cur[0] + distY, cur[1] + distX]);
                antinodes.push([type[i][0] + (distY*-1), type[i][1] + (distX*-1)]);
            }
            // console.log(`\tFINISHED with ${cur}`)
        }
        
    });

    antinodes = antinodes.filter(c => ((c[0] >= 0 && c[0] < input.length) && (c[1] >= 0 && c[1] < input[0].length)))

    antinodes = [...new Set(antinodes.map(c => `${c[0]},${c[1]}`))]
    return antinodes.length;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));