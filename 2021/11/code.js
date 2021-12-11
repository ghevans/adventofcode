const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(grid, steps) {
    // print(grid, "before any steps");
    let totalFlashes = 0;
    for(let i = 0; i < steps; i++) {
        let flashed = {}; // hold position for everything that was flashed, only set to 0 at end
        let stack = [];
        grid = increaseEnergy(grid);
         
        stack.push(...findFlashes(grid));
        while(stack.length > 0) {
            let loc = stack.pop();
            if (!flashed[`${loc[0]},${loc[1]}`]) {
                totalFlashes++;
                flashed[`${loc[0]},${loc[1]}`] = true;
                let neighbors = getAdjacent(grid, loc[0], loc[1], flashed);
                for(neighbor of neighbors) {
                    let y = neighbor[0], x = neighbor[1];
                    grid[y][x] = grid[y][x] + 1;
                    if (grid[y][x] > 9 && flashed[`${y},${x}`] !== true) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        grid = resetGrid(grid);
        // print(grid, i+1);
    }
    return totalFlashes;
}

function resetGrid(grid) {
    let newGrid = [...Array(grid.length)].map(x=>Array(grid[0].length));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            newGrid[y][x] = (grid[y][x] > 9) ? 0 : grid[y][x];
        }
    }
    return newGrid;
}

function findFlashes(grid) {
    let flashes = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] > 9) {
                flashes.push([y,x]);
            }
        }
    }
    return flashes;
}

function getAdjacent(grid, y, x, flashed) {
    let adj = [];
    let dy = [0,-1,0,1,-1,1,-1,1] // l,u,r,d,dul,ddl,dur,ddr
    let dx = [-1,0,1,0,-1,-1,1,1] // l,u,r,d,dul,ddl,dur,ddr
    for(let i = 0; i < 8; i++) {
        let next = grid[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined) {
            adj.push([y+dy[i], x+dx[i]])
        }
    }
    return adj;
}

function increaseEnergy(grid) {
    let newGrid = [...Array(grid.length)].map(x=>Array(grid[0].length));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            newGrid[y][x] = grid[y][x] + 1;
        }
    }
    return newGrid;
}

function print(grid, step) {
    let output = `After step ${step}\n`;
    for (let y = 0; y < grid.length; y++) {
        let row = "";
        for (let x = 0; x < grid[0].length; x++) {
            row += `${grid[y][x]} `;
        }
        output += `${row}\n`;
    }
    console.log(output)
}

function part2(grid) {
    // print(grid, "before any steps");
    let totalFlashes = 0;
    let i = 0;
    while (true) {
        let flashed = {}; // hold position for everything that was flashed, only set to 0 at end
        let stack = [];
        grid = increaseEnergy(grid);
         
        stack.push(...findFlashes(grid));
        while(stack.length > 0) {
            let loc = stack.pop();
            if (!flashed[`${loc[0]},${loc[1]}`]) {
                totalFlashes++;
                flashed[`${loc[0]},${loc[1]}`] = true;
                let neighbors = getAdjacent(grid, loc[0], loc[1], flashed);
                for(neighbor of neighbors) {
                    let y = neighbor[0], x = neighbor[1];
                    grid[y][x] = grid[y][x] + 1;
                    if (grid[y][x] > 9 && flashed[`${y},${x}`] !== true) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        grid = resetGrid(grid);
        // print(grid, i+1);
        i++;
        if (synchronized(grid)) {
            return i;
        }
    }
}

function synchronized(grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if(grid[y][x] !== 0) {
                return false;
            }
        }
    }
    return true;
}

console.log("Part 1 - " + part1(input, 100));
console.log("Part 2 - " + part2(input));