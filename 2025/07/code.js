const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

function part1(input) {
    let grid = input.split('\n').map(r => r.split(''));
    let height = grid.length, width = grid[0].length;
    // helper.print(grid);

    let start = findStart(grid);

    let beams = [start], visited = new Set(), splitters = new Set();
    visited.add(`${start.y},${start.x}`);

    while(beams.length > 0) {
        let curBeam = beams.shift();

        // skip out of bounds beams
        if (curBeam.x < 0 || curBeam.x >= width || curBeam.y < 0 || curBeam.y >= height) {
            continue;
        }

        if (grid[curBeam.y][curBeam.x] === '^') {
            // console.log(`hit splitter at ${curBeam.y},${curBeam.x}`)
            // hit a splitter, so split L and R
            let nextL = { y: curBeam.y, x: curBeam.x-1};
            let nextR = { y: curBeam.y, x: curBeam.x+1};

            if (!visited.has(`${nextL.y}, ${nextL.x}`)) {
                visited.add(`${nextL.y}, ${nextL.x}`);
                beams.push(nextL);
            }
            if (!visited.has(`${nextR.y}, ${nextR.x}`)) {
                visited.add(`${nextR.y}, ${nextR.x}`);
                beams.push(nextR);
            }

            splitters.add(`${curBeam.y}, ${curBeam.x}`)
        } else {
            let next = { y: curBeam.y+1, x: curBeam.x} // move straight down
            
            if (!visited.has(`${next.y}, ${next.x}`)) {
                visited.add(`${next.y}, ${next.x}`);
                beams.push(next);
            }
        }
    }

    return splitters.size;
}

function countTimelines(y, x, grid, memory) {
    let result = 0;

    // if we "leave the grid, that beam is over
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return 1;
    }

    // if we have already calculated this location, return the value
    if (memory.has(`${y},${x}`)) {
        return memory.get(`${y},${x}`)
    }

    // new location, process as normal
    if (grid[y][x] === '^') {
        result = countTimelines(y, x-1, grid, memory) + countTimelines(y, x+1, grid, memory);
    } else {
        result = countTimelines(y + 1, x, grid, memory);
    }
    
    memory.set(`${y},${x}`, result);
    return result;
}

function part2(input) {
    let grid = input.split('\n').map(r => r.split(''));

    let memory = new Map();
    let start = findStart(grid);

    return countTimelines(start.y, start.x, grid, memory);
}

function findStart(grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'S') {
                return { y, x };
            }
        }
    }
}
console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));