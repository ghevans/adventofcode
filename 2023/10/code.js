const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let startLoc = {};
    let map = Array.from(Array(input.length), () => new Array(input[0].length))
    for (let y = 0; y < input.length; y++) {
        let parts = input[y].split('');
        for (let x = 0; x < input[0].length; x++) {
            map[y][x] = parts[x];
            if (parts[x] === 'S') {
                startLoc.y = y;
                startLoc.x = x;
            }
        }
    }

    // let dirs = ['r','d']; <-- test data directions
    let dirs = ['u','l'];
    let allPaths = Array.from(Array(dirs.length), () => new Map());
    for (let i = 0; i < dirs.length; i++) {
        let curDir = dirs[i]; // this just iterates through our possible starting loops
        let curLoc = startLoc;
        let curDist = 0;
        let visited = allPaths[i];

        while(!visited.has(`${curLoc.y},${curLoc.x}`)) {
            // add visited node
            visited.set(`${curLoc.y},${curLoc.x}`, curDist);
            curDist++;

            let nextSymbol, nextLoc;
            switch(curDir) {
                case 'l':
                    nextSymbol = map[curLoc.y]?.[curLoc.x-1] ?? '.';
                    nextLoc = {
                        y: curLoc.y,
                        x: curLoc.x-1
                    }
                    break;
                case 'r':
                    nextSymbol = map[curLoc.y]?.[curLoc.x+1] ?? '.';
                    nextLoc = {
                        y: curLoc.y,
                        x: curLoc.x+1
                    }
                    break;
                case 'u':
                    nextSymbol = map?.[curLoc.y-1][curLoc.x] ?? '.';
                    nextLoc = {
                        y: curLoc.y-1,
                        x: curLoc.x
                    }
                    break;
                case 'd':
                    nextSymbol = map?.[curLoc.y+1][curLoc.x] ?? '.';
                    nextLoc = {
                        y: curLoc.y+1,
                        x: curLoc.x
                    }
                    break;
            }

            let nextDir;
            switch(nextSymbol) {
                case '|':
                case '-': 
                    nextDir = curDir; // these pipes don't turn
                    break;
                case 'L':
                    nextDir = (curDir === 'd') ? 'r' : 'u';
                    break;
                case 'J':
                    nextDir = (curDir === 'd') ? 'l' : 'u';
                    break;
                case '7':
                    nextDir = (curDir === 'r') ? 'd' : 'l';
                    break;
                case 'F':
                    nextDir = (curDir === 'l') ? 'd' : 'r';
                    break;
                case 'S':
                    nextDir = false;
                    break;
            }

            curDir = nextDir;
            curLoc = nextLoc;
        }
    }

    let minDists = {};
    allPaths[0].forEach((value, key) => {
        minDists[key] = Math.min(value, allPaths[1].get(key));
    });
    return _.max(Object.values(minDists));
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(testInput));