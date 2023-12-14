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
    return out;
}

const doCycle = (dish) => { return tilt(tilt(tilt(tilt(dish, 'N'), 'W'), 'S'), 'E'); }

function calculateLoad(dish) {
    let sum = 0;
    for (let y = 0; y < dish.length; y++) {
        for (let x = 0; x < dish[0].length; x++) {
            if (dish[y][x] === 'O') {
                sum += dish.length - y;
            }
        }
    }
    return sum;
}


const tilt = (dish, dir) => {
    switch(dir) {
        case 'N':
            break;
        case 'E':
            dish = rotate(dish);
            break;
        case 'S':
            dish = rotate90(rotate90(dish));
            break;
        case 'W':
            dish = rotate90(dish);
            break;
    }

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

    switch(dir) {
        case 'N':
            break;
        case 'E':
            newDish = rotate90(newDish);
            break;
        case 'S':
            newDish = rotate90(rotate90(newDish));
            break;
        case 'W':
            newDish = rotate(newDish);
            break;
    }

    return newDish;
}

function part1(dish) {
    return calculateLoad(tilt(dish, 'N'));
}

function part2(dish) {
    let seen = {};
    let period = shift = 0;
    for (let i = 1; i <= 1000000000; i++) {
        dish = doCycle(dish);

        let key = print(dish).split('\n').join('');
        if (seen[key]) {
            period = i - seen[key].loop;
            shift = seen[key].loop;
            break;
        } else {
            seen[key] = { loop: i, load: calculateLoad(dish) };
        }
    }

    let index = (1000000000 - shift) % period;
    return Object.values(seen).filter(l => l.loop === shift+index)[0].load;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));