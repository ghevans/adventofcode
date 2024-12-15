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

const walk = (map, guard) => {
    let loc = _.clone(guard);
    let looped = false;

    let visited = new Map();
    while(true) {
        if ((loc.x < 0 || loc.x >= map[0].length) || 
            (loc.y < 0 || loc.y >= map.length)) {
                break;
        }

        if (visited.has(`${loc.x},${loc.y},${loc.dir}`) && visited.get(`${loc.x},${loc.y},${loc.dir}`) === loc.dir) {
            looped = true;
            break;
        }

        visited.set(`${loc.x},${loc.y},${loc.dir}`, loc.dir);
        
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
    return [visited, looped];
}

function part1(map) {
    let guard = findGuard(map);
    return walk(map, guard)[0].size;
}

function part2(map) {
    let guard = findGuard(map);
    let loops = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '.') {
                map[y][x] = '#';
                [visited, looped] = walk(map, guard);
                loops += (looped) ? 1 : 0;
                map[y][x] = '.';
            }
        }
    }

    return loops;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));