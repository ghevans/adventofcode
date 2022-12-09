const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let map = input.split('\n').map(row => row.split('').map(Number));
    let vMap = new Array(map.length).fill('T').map(() => new Array(map[0].length).fill('T'));

    let countOfVisible = map.length*4 - 4;
    for(let y = 1; y < map.length-1; y++) {
        for (let x = 1; x < map[0].length-1; x++) {
            let visibleH = checkRow(map[y], x);
            let visibleV = checkRow(map.map(row => { return row[x]}), y);

            countOfVisible += (visibleH || visibleV) ? 1 : 0;
            vMap[y][x] = (visibleH || visibleV) ? `T` : `-`;
        }
    }
    
    return countOfVisible;
}

const checkRow = function(row, x) {
    let left = row.slice(0,x);
    let right = row.slice(x+1);

    let vLeft = left.every(h => row[x] > h);
    let vRight = right.every(h => row[x] > h);

    return vLeft || vRight;
}

function print(map) {
    let pretty = '';
    for(let y = 0; y < map.length; y++) {
        let row = '';
        for (let x = 0; x < map[0].length; x++) {
            row += map[y][x] + ' ';
        }
        pretty += row + '\n';
    }
    console.log(pretty)
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));