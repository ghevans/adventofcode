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

const nextLoc = (beam, grid) => {
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

function part1(grid) {
    // console.log(helper.print(grid))
    let activeBeams = [new Beam(0,-1,'r')]
    let visited = {};
    let visitedGrid = Array.from(Array(grid.length), () => new Array(grid[0].length).fill('.'))

    let i = 0;
    while (activeBeams.length > 0) {
        let nextBeams = [];
        for (beam of activeBeams) {
            if (!visited[`${beam.y},${beam.x},${beam.dir}`]) {
                visitedGrid[beam.y][beam.x] = '#'
                visited[`${beam.y},${beam.x},${beam.dir}`] = `${beam.y},${beam.x}`;
                if (leavingGrid(beam, grid)) {
                    // console.log(`\tleaving grid for beam at ${beam.y},${beam.x}`)
                } else {
                    const next = nextLoc(beam, grid);
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

function part2(grid) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));