const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let moves = getMoves(input);

    let hLoc = { x: 0, y: 0 };
    let tLoc = { x: 0, y: 0 };
    let lastH = { x: 0, y: 0 };

    let visited = new Set();
    for (move of moves) {
        for(let i = 0; i < move.dist; i++) {
            lastH = {
                x: hLoc.x,
                y: hLoc.y
            }
            switch(move.dir) {
                case 'R':
                    hLoc.x++;
                    break;
                case 'L':
                    hLoc.x--;
                    break;
                case 'U':
                    hLoc.y++;
                    break;
                case 'D':
                    hLoc.y--;
                    break;
            }
            
            if(shouldPull(hLoc, tLoc)) {
                tLoc = lastH;
            }
            
            visited.add(`${tLoc.x},${tLoc.y}`);
        }
    }
    
    return visited.size;
}

const print = function(hLoc, tLoc) {
    let xBound = (hLoc.x > tLoc.x) ? hLoc.x+1 : tLoc.x + 1;
    let yBound = (hLoc.y > tLoc.y) ? hLoc.y+1 : tLoc.y + 1;
    let pretty = '';
    for (let y = yBound; y >= 0; y--) {
        let row = '';
        for (let x = 0; x <= xBound; x++) {
            row += (hLoc.x === x && hLoc.y === y) ? 'H ' : (tLoc.x === x && tLoc.y === y) ? 'T ' : '. ' 
        }
        pretty += row + '\n'
    }
    console.log(pretty);
}

const shouldPull = function(hLoc, tLoc) {
    return (Math.abs(hLoc.x - tLoc.x) > 1) || (Math.abs(hLoc.y - tLoc.y) > 1)
}

const getMoves = function(input) {
    return input.split('\n').map(l => {
        let parts = l.split(' ')
        return { 
            dir: parts[0],
            dist: Number(parts[1])
        }
    });
}

function part2(input) {
    let moves = getMoves(input);
    // knot[0] is Head
    let knots = [[0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ]

    let visited = new Set();
    for (move of moves) {
        for(let i = 0; i < move.dist; i++) {
            moveHead(move, knots[0]);
            for (let k = 1; k < knots.length; k++) {
                
                if(shouldPullLong(knots[k], knots[k-1])) {
                    moveKnot(knots[k], knots[k-1])
                }
            }
            visited.add(`${knots[9]}`);
        }
    }
    
    return visited.size;
}

const shouldPullLong = function(tail, head) {
    return (Math.abs(head[0] - tail[0]) > 1) || (Math.abs(head[1] - tail[1]) > 1)
}

const moveHead = function(move, knot) {
    switch(move.dir) {
        case 'R':
            knot[0]++;
            break;
        case 'L':
            knot[0]--;
            break;
        case 'U':
            knot[1]++;
            break;
        case 'D':
            knot[1]--;
            break;
    }
}

const moveKnot = function(tail, head) {
    if (head[1] === tail[1]) { // same row
        tail[0] += (head[0] > tail[0]) ? 1 : -1;
    } else if (head[0] === tail[0]) { // same col
        tail[1] += (head[1] > tail[1]) ? 1 : -1;
    } else {
        // diagonal
        tail[0] += (head[0] > tail[0]) ? 1 : -1;
        tail[1] += (head[1] > tail[1]) ? 1 : -1;
    }
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));