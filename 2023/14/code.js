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

function part1(dish) {
    return calculateLoad(tilt(dish, 'N'));
}

function calculateLoad(dish) {
    let sum = 0;
    let totalRows = dish.length;
    for (let y = 0; y < dish.length; y++) {
        for (let x = 0; x < dish[0].length; x++) {
            if (dish[y][x] === 'O') {
                sum += totalRows - y;
            }
        }
    }
    return sum;
}

function doCycle(dish) {
    dish = tilt(dish, 'N')
    // console.log(`AFTER NORTH`)
    // print(dish)

    dish = tilt(dish, 'W')
    // console.log(`AFTER WEST`)
    // print(dish)

    dish = tilt(dish, 'S')
    // console.log(`AFTER SOUTH`)
    // print(dish)

    dish = tilt(dish, 'E')
    // console.log(`AFTER EAST`)
    // print(dish)

    return dish;
}

function tilt(dish, dir) {
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
            // newDish = rotate(newDish);
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

function part2(dish) {
    let seen = {};
    let period = 0;
    let shift = 0;
    for (let i = 1; i <= 1000000000; i++) {
        dish = doCycle(dish);

        let key = print(dish).split('\n').join('');
        if (seen[key]) {
            console.log(`found loop at ${seen[key].loop} and ${i} with load => ${seen[key].load} and ${calculateLoad(dish)}`)
            period = i - seen[key].loop;
            shift = seen[key].loop;
            console.log(period);
            break;
        } else {
            seen[key] = { loop: i, load: calculateLoad(dish) };
        }
    }

    console.log(`shift: ${shift} | period: ${period}`)
    console.log(`calc: ${(1000000000 - shift)}`)
    let index = (1000000000 - shift) % period;
    console.log(`index: ${index}`)
    console.log(Object.values(seen))
    console.log(Object.values(seen).filter(l => l.loop === shift+index)[0].load)
    return Object.values(seen).filter(l => l.loop === shift+index)[0].load;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));
console.log("Part 2 - " + part2(testInput));