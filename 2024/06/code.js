const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const findGuard = (map) => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '^') {
                return { x: x, y: y, dir: '^'};
            }
        }
    }
}

function part1(map) {
    let loc = findGuard(map);

    let visited = new Set();
    let i = 0;
    while(true && i < 100) {
        if ((loc.x < 0 || loc.x >= map[0].length) || 
            (loc.y < 0 || loc.y >= map.length)) {
                break;
        }
        visited.add(`${loc.x},${loc.y}`);
        let nextLoc = _.clone(loc);
        switch(loc.dir) {
            case '^':
                nextLoc.y = nextLoc.y - 1;
                if (map?.[nextLoc.y]?.[nextLoc.x] !== '#') {
                    loc = nextLoc;
                } else {
                    loc.dir = '>';
                }
                break;
            case '>':
                nextLoc.x = nextLoc.x + 1;
                if (map?.[nextLoc.y]?.[nextLoc.x] !== '#') {
                    loc = nextLoc;
                } else {
                    loc.dir = 'v';
                }
                break;
            case 'v':
                nextLoc.y = nextLoc.y + 1;
                if (map?.[nextLoc.y]?.[nextLoc.x] !== '#') {
                    loc = nextLoc;
                } else {
                    loc.dir = '<';
                }
                break;
            case '<':
                nextLoc.x = nextLoc.x - 1;
                if (map?.[nextLoc.y]?.[nextLoc.x] !== '#') {
                    loc = nextLoc;
                } else {
                    loc.dir = '^';
                }
                break;
        }
    }
    return visited.size;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));