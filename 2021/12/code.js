const _ = require('lodash');
const {input, testInput} = require('./input');

let paths = [];
function followPath(caves, currentCave, path) {
    if (currentCave === 'end') {
        path += 'end';
        paths.push(path);
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
    console.log(paths);
    return paths.length;
}

function followPath2(caves, currentCave, path) {
    if (currentCave === 'end') {
        path += 'end';
        paths.push(path);
        return;
    }

    path += `${currentCave},`;
    for(cave of caves.get(currentCave)) {
        if (cave.toUpperCase() === cave || (path.split(',').indexOf(cave) === -1)) {
            followPath(caves, cave, path);
        }
    }
}

function part2(caves) {
    followPath(caves, 'start', '');
    console.log(paths);
    return paths.length;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));