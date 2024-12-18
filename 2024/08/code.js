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
        while (type.length > 0) {
            let cur = type.shift();
            for (let i = 0; i < type.length; i++) {
                let distY = cur[0] - type[i][0];
                let distX = cur[1] - type[i][1];
                
                antinodes.push([cur[0] + distY, cur[1] + distX]);
                antinodes.push([type[i][0] + (distY*-1), type[i][1] + (distX*-1)]);
            }
        }
        
    });

    antinodes = antinodes.filter(c => ((c[0] >= 0 && c[0] < input.length) && (c[1] >= 0 && c[1] < input[0].length)))
    return [...new Set(antinodes.map(c => `${c[0]},${c[1]}`))].length;
}

function part2(input) {
    let antennas = findAntennas(input);
    let antinodes = [];

    antennas.forEach(type => {
        while (type.length > 1) {
            let cur = type.shift();
            antinodes.push(cur);
            for (let i = 0; i < type.length; i++) {
                let dist = [type[i][0] - cur[0], type[i][1] - cur[1]];

                let j = 1;
                while (true) {
                    let nextY = cur[0] + (dist[0] * j);
                    let nextX = cur[1] + (dist[1] * j);

                    if ((nextY < 0 || nextY >= input.length) || 
                        (nextX < 0 || nextX >= input[0].length)) {
                            break;
                    }

                    antinodes.push([nextY, nextX]);
                    j++
                }

                j = 1;
                dist = dist.map(d => d * -1);
                while (true) {
                    let nextY = cur[0] + (dist[0] * j);
                    let nextX = cur[1] + (dist[1] * j);

                    if ((nextY < 0 || nextY >= input.length) || 
                        (nextX < 0 || nextX >= input[0].length)) {
                            break;
                    }

                    antinodes.push([nextY, nextX]);
                    j++
                }
            }
        }
        
    });

    return [...new Set(antinodes.map(c => `${c[0]},${c[1]}`))].length;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));