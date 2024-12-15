const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const left = (row, x) => { return (x < 3) ? 0 : (row.slice(x-3, x+1).reverse().join('') === 'XMAS') ? 1 : 0; }
const right = (row, x) => { return (x + 3 > row.length) ? 0 : (row.slice(x, x+4).join('') === 'XMAS') ? 1 : 0; }
const up = (map, x, y) => { return left(map.map(r => r[x]), y); }
const down = (map, x, y) => { return right(map.map(r => r[x]), y); }

const upLeft = (map, x, y) => { return ((x >= 3) && ( y >= 3)) ? ((map[y][x] + map[y-1][x-1] + map[y-2][x-2] + map[y-3][x-3] === 'XMAS') ? 1 : 0) : 0; }
const upRight = (map, x, y) => { return ((x <= map[0].length - 3) && ( y >= 3)) ? ((map[y][x] + map[y-1][x+1] + map[y-2][x+2] + map[y-3][x+3] === 'XMAS') ? 1 : 0) : 0; }
const downLeft = (map, x, y) => { return ((x >= 3) && (y < map.length - 3)) ? ((map[y][x] + map[y+1][x-1] + map[y+2][x-2] + map[y+3][x-3] === 'XMAS') ? 1 : 0) : 0; }
const downRight = (map, x, y) => { return ((x <= map[0].length - 3) && (y < map.length - 3)) ? ((map[y][x] + map[y+1][x+1] + map[y+2][x+2] + map[y+3][x+3] === 'XMAS') ? 1 : 0) : 0; }

function part1(input) {
    let count = 0;
    for (let y = 0; y < input.length; y++) {
        let row = input[y];
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 'X') {
                count += left(row, x) + right(row, x) + up(input, x, y) + down(input, x, y) +
                upLeft(input, x, y) + upRight(input, x, y) + downLeft(input, x, y) + downRight(input, x, y);;
            }
        }
    }
    return count;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));