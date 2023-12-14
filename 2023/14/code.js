const _ = require('lodash');
const {input, testInput} = require('./input');

const rotate90 = (universe) => { return universe[0].map((val, index) => universe.map(row => row[index]).reverse()); }
const rotate = (universe) => { return rotate90(rotate90(rotate90(universe))); }
const print = (universe) => {
    let out = '';
    for(let y = 0; y < universe.length; y++) {
        let row = '';
        for(let x = 0; x < universe[0].length; x++) {
            row += universe[y][x];
        }
        out += row + '\n';
    }
    console.log(out);
}

function part1(dish) {
    dish = tilt(dish, 'N');
    print(dish);

    let sum = 0;

    let totalRows = dish.length;
    console.log(totalRows)
    for (let y = 0; y < dish.length; y++) {
        for (let x = 0; x < dish[0].length; x++) {
            if (dish[y][x] === 'O') {
                sum += totalRows - y;
            }
        }
    }
    return sum;
}

function tilt(dish, dir) {
    let newDish = [];
    for (let x = 0; x < dish[0].length; x++) {
        let col = dish.map(r => r[x]);
        for (let y = 1; y < col.length; y++) {
            if (col[y] === 'O') {
                for (let i = y-1; i >= 0; i--) {
                    if (col[i] === '.') {
                        col[i] = 'O';
                        col[i+1] = '.';
                    } else {
                        break;
                    }
                }
            }
        }
        newDish.push(col.reverse());
    }
    newDish = rotate(newDish);
    return newDish;
}

function part2(dish) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));