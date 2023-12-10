const _ = require('lodash');
const {input, testInput, testInput2} = require('./input');

function buildLoop(input, dirs) {
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

    return allPaths;
}

function part1(input, dirs) {
    let loops = buildLoop(input, dirs);
    
    let minDists = {};
    loops[0].forEach((value, key) => {
        minDists[key] = Math.min(value, loops[1].get(key));
    });
    return _.max(Object.values(minDists));
}

function part2(input, dirs) {
    let loop = buildLoop(input, dirs)[0];
    
    let yLimits = {};
    for (let i = 0; i < input.length; i++) {
        yLimits[i] = {
            min: input[0].length,
            max: 0
        }
    }
    let xLimits = {};
    for (let i = 0; i < input[0].length; i++) {
        xLimits[i] = {
            min: input.length,
            max: 0
        }
    }
    loop.forEach((value, key) => {
        let [y, x] = key.split(',');
        yLimits[y].min = (yLimits[y].min > x) ? Number(x) : yLimits[y].min;
        yLimits[y].max = (yLimits[y].max < x) ? Number(x) : yLimits[y].max;
        
        xLimits[x].min = (xLimits[x].min > y) ? Number(y) : xLimits[x].min;
        xLimits[x].max = (xLimits[x].max < y) ? Number(y) : xLimits[x].max;
    })

    let print = '*' + Array.from(Array(input[0].length), () => '*').join('') + '*\n';
    let totalHoles = 0;
    for (let y = 0; y < input.length; y++) {
        let parts = input[y].split('');
        let newLine = `* `;
        for (let x = 0; x < input[0].length; x++) {
            if (!loop.has(`${y},${x}`)) {
                if ((x < yLimits[y].min || x > yLimits[y].max) ||
                    (y < xLimits[x].min || y > xLimits[x].max)) {
                        newLine += ' ';
                } 
                else {
                    newLine += '#';
                    totalHoles++;
                }
            } else {
                let char = '';
                switch(parts[x]) {
                    case '|':
                        char = '│';
                        break;
                    case '-': 
                        char = '─';
                        break;
                    case 'L':
                        char = '└';
                        break;
                    case 'J':
                    case 'S':
                        char = '┘';
                        break;
                    case '7':
                        char = '┐';
                        break;
                    case 'F':
                        char = '┌';
                        break;            
                }
                newLine += char;
            }
        }
        print += newLine + '*\n'
    }
    print += '*' + Array.from(Array(input[0].length), () => '*').join('') + '*\n';
    console.log(print);

    return totalHoles;
}

console.log("Part 1 - " + part1(input, ['u','l']));
console.log("Part 2 - " + part2(input, ['u','l']));
// console.log("Part 2 - " + part2(testInput2, ['d','r']));