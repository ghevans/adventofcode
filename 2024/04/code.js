const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const left = (row, x) => { return (x < 3) ? false : row.slice(x-3, x+1).reverse().join('') === 'XMAS'; }
const right = (row, x) => { return (x + 3 > row.length) ? false : row.slice(x, x+4).join('') === 'XMAS'; }
const up = (map, x, y) => { return left(map.map(r => r[x]), y); }
const down = (map, x, y) => { return right(map.map(r => r[x]), y); }

const upLeft = (map, x, y) => { return ((x >= 3) && ( y >= 3)) ? map[y][x] + map[y-1][x-1] + map[y-2][x-2] + map[y-3][x-3] === 'XMAS' : false; }
const upRight = (map, x, y) => { return ((x <= map[0].length - 3) && ( y >= 3)) ? map[y][x] + map[y-1][x+1] + map[y-2][x+2] + map[y-3][x+3] === 'XMAS' : false; }
const downLeft = (map, x, y) => { return ((x >= 3) && (y < map.length - 3)) ? map[y][x] + map[y+1][x-1] + map[y+2][x-2] + map[y+3][x-3] === 'XMAS' : false; }
const downRight = (map, x, y) => { return ((x <= map[0].length - 3) && (y < map.length - 3)) ? map[y][x] + map[y+1][x+1] + map[y+2][x+2] + map[y+3][x+3] === 'XMAS' : false; }

function part1(input) {
    console.log(left(input[4],6));
    console.log(right(input[0],5));
    console.log(up(input, 9, 9));
    console.log(down(input, 9, 3));
    console.log(upLeft(input, 6, 5));
    console.log(upLeft(input, 9, 9));
    console.log(upRight(input, 0, 5))
    console.log(downLeft(input, 9, 3))
    console.log(downRight(input, 4, 0))
    return "tbd";
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));