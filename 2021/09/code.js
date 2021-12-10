const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(map) {
    return Object.values(findLowPoints(map)).reduce((acc, val) => acc  + val + 1, 0);
}

function part2(map) {
    let lowPoints = findLowPoints(map);
    console.log(lowPoints);
    print(map);
}

function findLowPoints(map) {
    let lowPoints = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let height =  map[y][x];
            let up = map[y-1]?.[x] ?? 10;
            let down = map[y+1]?.[x] ?? 10;
            let left = map[y]?.[x-1] ?? 10;
            let right = map[y]?.[x+1] ?? 10;

            if (height < up && height < down && height < left && height < right) {
                lowPoints[`${y},${x}`] = height;
            }
        }
    }
    return lowPoints
}

function print(map) {
    let output = "";
    for (let y = 0; y < map.length; y++) {
        let row = "";
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] !== 9) {
                row += `${map[y][x]}`;
            } else {
                row += '*'
            }
        }
        output += `${row}\n`;
    }
    console.log(output)
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));