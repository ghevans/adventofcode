const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers')

const dirMap = {
    0: 'R',
    1: 'D',
    2: 'L',
    3: 'U'
}

const parseHex = (line) => {
    let val = line.color.substring(2,8);
    return {
        dir: dirMap[val[val.length-1]],
        dist: parseInt(val.substring(0,val.length-1), 16)
    }
}

const getInternalArea = (edges) => {
    let sumOfProducts = 0;
    let sumOfDifferences = 0;

    for (let i = 0; i < edges.length; i++) {
        let [y1, x1] = edges[i];
        let [y2, x2] = edges[(i + 1) % edges.length];
        sumOfProducts += x1 * y2;
        sumOfDifferences += y1 * x2;
    }

    return (0.5 * Math.abs(sumOfProducts - sumOfDifferences));
}


function part1(plan) {
    const path = new Map();
    path.set(`0,0`, {y: 0, x: 0});

    let curPos = { y: 0, x: 0 };
    for (move of plan) {
        let change = { y: 0, x: 0 };
        switch(move.dir) {
            case 'U':
                change = {y: -1, x: 0};
                break;
            case 'D':
                change = {y: 1, x: 0};
                break;
            case 'L':
                change = {y: 0, x: -1};
                break;
            case 'R':
                change = {y: 0, x: 1};
                break;
        }
        
        for (let i = 0; i < move.dist; i++) {
            curPos.y = curPos.y + change.y;
            curPos.x = curPos.x + change.x;

            path.set(`${curPos.y},${curPos.x}`, { y: curPos.y, x: curPos.x });
        }
    }

    let printedMap = format(buildMap(path, false), false);

    return countArea(printedMap);
}

function countLine(line) {
    let lineArea = 0;
    let crossings = 0;
    let prevChar = undefined;
    for (x = 0; x < line.length ; x++) {
        let char = line[x];
        lineArea += (char !== '.') ? 1 : 0;

        switch(char) {
            case '│':
                crossings++;
                break;
            case '┘':
                crossings += (prevChar === '└' || prevChar === '.' || prevChar === undefined) ? 1 : 0;
                break;
            case '└':
                crossings += (prevChar === '┘' || prevChar === '.' || prevChar === undefined) ? 1 : 0;
                break;
            case '┐':
                crossings += (prevChar === '┌' || prevChar === '.' || prevChar === undefined) ? 1 : 0;
                break;
            case '┌':
                crossings += (prevChar === '┐' || prevChar === '.' || prevChar === undefined) ? 1 : 0;
                break;
            case '─':
            case '.':
                // DO NOTHING
                break;
        }


        if (char !== '─') prevChar = char;
        if (char === '.') {
            lineArea += (crossings % 2 !== 0) ? 1 : 0;
        }
    }
    return lineArea;
}

function countArea(grid) {
    return grid.map(row => countLine(row)).reduce((a,b) => a+b, 0);
}

function format(map, print) {
    let out = ''
    for (y = 0; y < map.length; y++) {
        let row = '';
        for (x = 0; x < map[0].length; x++) {
            if (map[y][x] === '#') {
                let upN = (map[y-1]?.[x] !== undefined && map[y-1]?.[x] === '#') ? true : false;    
                let downN = (map[y+1]?.[x] !== undefined && map[y+1]?.[x] === '#') ? true : false;    
                let leftN = (map[y]?.[x-1] !== undefined && map[y]?.[x-1] === '#') ? true : false;    
                let rightN = (map[y]?.[x+1] !== undefined && map[y]?.[x+1] === '#') ? true : false;

                if (rightN && leftN) {
                    row += '─'
                } else if (upN && downN) {
                    row += '│'
                } else if (upN && leftN) {
                    row += '┘'
                } else if (upN && rightN) {
                    row += '└'
                } else if (downN && leftN) {
                    row += '┐'
                } else if (downN && rightN) {
                    row += '┌'
                }
            } else {
                row += '.'
            }
        }
        out += row + '\n';
    }
    out = out.substring(0,out.length-1)
    if(print) { console.log(out); }

    return out.split('\n').map(r => r.split(''));
}

function buildMap(map, print) {
    let vals = [...map.values()];    
    let out = "";
    for(y = _.minBy(vals, "y").y; y <= _.maxBy(vals, "y").y; y++) {
        let row = "";
        
        for (x = _.minBy(vals, "x").x; x <= _.maxBy(vals, "x").x; x++) {
            row += (map.has(`${y},${x}`)) ? '#' : '.';
        }
        out += row + '\n';
    }
    out = out.substring(0,out.length-1)

    if (print) { console.log(out) };

    return out.split('\n').map(r => r.split(''));
}

function part2(input) {
    let rules = input.map(parseHex);
    let edges = [[0, 0]];

    let curPos = edges[0];
    let perimeter = 0;
    for (move of rules) {
        switch(move.dir) {
            case 'U':
                change = {y: -1, x: 0};
                break;
            case 'D':
                change = {y: 1, x: 0};
                break;
            case 'L':
                change = {y: 0, x: -1};
                break;
            case 'R':
                change = {y: 0, x: 1};
                break;
        }

        curPos[0] = curPos[0] + (change.y*move.dist);
        curPos[1] = curPos[1] + (change.x*move.dist);

        edges.push([curPos[0], curPos[1]]);
        perimeter += move.dist;
    }

    return (getInternalArea(edges) + (perimeter/2) + 1);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));