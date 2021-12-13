const _ = require('lodash');
const {input, testInput} = require('./input');

let paths = [];
function followPath(caves, currentCave, path) {
    if (currentCave === 'end') {
        paths.push(path+'end');
        return;
    }

    path += `${currentCave},`;
    for(cave of caves.get(currentCave)) {
        if (cave.toUpperCase() === cave || (path.split(',').indexOf(cave) === -1)) {
            followPath(caves, cave, path);
        }
    }
}

function part1(caves) {
    followPath(caves, 'start', '');
    // console.log(paths);
    return paths.length;
}

function followPath2(caves, currentCave, path) {
    if (currentCave === 'end') {
        paths.push(path+'end');
        return;
    }
    path += `${currentCave},`;

    let canDoubleBack = true;
    let smallCaves = path.split(',').filter(cave => cave.toLowerCase() === cave);
    for (cave of smallCaves) {
        if(path.split(',').filter(c => c === cave).length === 2) {
            canDoubleBack = false;
        }
    }

    for(cave of caves.get(currentCave)) {
        if (cave.toUpperCase() === cave || path.split(',').indexOf(cave) === -1) { // big or new cave
            followPath2(caves, cave, path);
        } else if (_.filter(path.split(','), c => c === cave).length < 2 && canDoubleBack) { // can go twice
            followPath2(caves, cave, path);
        }
    }
}

function part2(caves) {
    followPath2(caves, 'start', '');
    // console.log(paths);
    return paths.length;
}

console.log("Part 1 - " + part1(input));
paths = [];
console.log("Part 2 - " + part2(input));