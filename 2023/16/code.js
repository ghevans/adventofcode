const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

class Beam {
    constructor(y, x, dir) {
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
}

const leavingGrid = (beam, grid) => {
    switch (beam.dir) {
        case 'u':
            return (beam.y-1 < 0);
        case 'd':
            return (beam.y+1 >= grid.length);
        case 'l':
            return (beam.x-1 < 0);
        case 'r':
            return (beam.x+1 >= grid[0].length);
    }
}

const nextLoc = (beam) => {
    switch (beam.dir) {
        case 'u':
            return {y: beam.y-1, x: beam.x};
        case 'd':
            return {y: beam.y+1, x: beam.x};
        case 'l':
            return {y: beam.y, x: beam.x-1};
        case 'r':
            return {y: beam.y, x: beam.x+1};
    }
}

const determinePower  = (grid, startingBeam) => {
    let activeBeams = [startingBeam];
    let visited = {};
    let visitedGrid = Array.from(Array(grid.length), () => new Array(grid[0].length).fill('.'))

    while (activeBeams.length > 0) {
        let nextBeams = [];
        for (beam of activeBeams) {
            if (!visited[`${beam.y},${beam.x},${beam.dir}`]) {
                if (visitedGrid[beam.y]?.[beam.x]) {
                    visitedGrid[beam.y][beam.x] = '#';
                    visited[`${beam.y},${beam.x},${beam.dir}`] = `${beam.y},${beam.x}`;
                }
                if (!leavingGrid(beam, grid)) {
                    const next = nextLoc(beam);
                    switch(grid[next.y][next.x]) {
                        case '|':
                            if (['l','r'].includes(beam.dir)) {
                                nextBeams.push(new Beam(next.y, next.x, 'u'));
                                nextBeams.push(new Beam(next.y, next.x, 'd'));
                            } else {
                                nextBeams.push(new Beam(next.y, next.x, beam.dir));
                            }
                            break;
                        case '-':
                            if (['u','d'].includes(beam.dir)) {
                                nextBeams.push(new Beam(next.y, next.x, 'l'));
                                nextBeams.push(new Beam(next.y, next.x, 'r'));
                            } else {
                                nextBeams.push(new Beam(next.y, next.x, beam.dir));
                            }
                            break;
                        case '\\':
                            switch(beam.dir) {
                                case 'u':
                                    nextBeams.push(new Beam(next.y, next.x, 'l'));
                                    break;
                                case 'd':
                                    nextBeams.push(new Beam(next.y, next.x, 'r'));
                                    break;
                                case 'l':
                                    nextBeams.push(new Beam(next.y, next.x, 'u'));
                                    break;
                                case 'r':
                                    nextBeams.push(new Beam(next.y, next.x, 'd'));
                                    break;
                            }
                            break;
                        case '\/':
                            switch(beam.dir) {
                                case 'u':
                                    nextBeams.push(new Beam(next.y, next.x, 'r'));
                                    break;
                                case 'd':
                                    nextBeams.push(new Beam(next.y, next.x, 'l'));
                                    break;
                                case 'l':
                                    nextBeams.push(new Beam(next.y, next.x, 'd'));
                                    break;
                                case 'r':
                                    nextBeams.push(new Beam(next.y, next.x, 'u'));
                                    break;
                            }
                            break;
                        case '.':
                            nextBeams.push(new Beam(next.y, next.x, beam.dir));
                            break;
                    }
                }
            }
        }
        activeBeams = nextBeams;
    }
    // console.log(helper.print(visitedGrid))
    return visitedGrid.flatMap(row => row.filter(c => c === '#')).length;
}

function part1(grid) {
    return determinePower(grid, new Beam(0,-1,'r'))
}

function part2(grid) {
    let maxPower = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (x === 0) {
                maxPower = Math.max(maxPower, determinePower([...grid], new Beam(y, -1, 'r')))
            }
            if (x === grid[0].length - 1) {
                maxPower = Math.max(maxPower, determinePower([...grid], new Beam(y, x+1, 'l')))
            }
            if (y === 0) {
                maxPower = Math.max(maxPower, determinePower([...grid], new Beam(-1, x, 'd')))
            }
            if (y === grid.length - 1) {
                maxPower = Math.max(maxPower, determinePower([...grid], new Beam(y+1, x, 'u')))
            }
        }
    }

    return maxPower;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));