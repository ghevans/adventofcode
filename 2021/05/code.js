const _ = require('lodash');
const {testInput, input} = require('./input');

function part1(input) {
    let locs = new Map();
    _.forEach(input, line => {
        if(line.startX !== line.endX && line.startY !== line.endY) {
            return;
        }

        let lineStartY = (line.startY < line.endY) ? line.startY : line.endY;
        let lineEndY = (line.startY < line.endY) ? line.endY : line.startY;
        let lineStartX = (line.startX < line.endX) ? line.startX : line.endX;
        let lineEndX = (line.startX < line.endX) ? line.endX : line.startX;

        for(let y = lineStartY; y <= lineEndY; y++) {
            for(let x = lineStartX; x <= lineEndX; x++) {
                if(locs.has(`${x},${y}`)) {
                    locs.set(`${x},${y}`, locs.get(`${x},${y}`) + 1);
                } else {
                    locs.set(`${x},${y}`, 1);
                }
            }
        }
    });

    let overlaps = 0;
    for(const [key, val] of locs) {
        overlaps += (val >= 2) ? 1 : 0;
    }
    return overlaps;
}

function part2(input) {
    let locs = new Map();
    _.forEach(input, line => {
        if(line.startX !== line.endX && line.startY !== line.endY) {
            if (line.startX < line.endX) {
                let xDiff = 1, yDiff = (line.startY < line.endY) ? 1 : -1;
                // if (line.startY < line.endY) {
                //     // diagonal left/down => y+1, x+1 (0,0) => (8,8)
                //     xDiff = 1, yDiff = 1;
                // } else {
                //     // diagonal left/up => y-1, x+1 (5,5) => (8,2)
                //     xDiff = 1, yDiff = -1;
                // }
                
                for(let y = line.startY,  x = line.startX; x <= line.endX; y+=yDiff, x+=xDiff) {
                    if(locs.has(`${x},${y}`)) {
                        locs.set(`${x},${y}`, locs.get(`${x},${y}`) + 1);
                    } else {
                        locs.set(`${x},${y}`, 1);
                    }
                }
            } else {
                let xDiff = -1, yDiff = (line.startY < line.endY) ? 1 : -1;
                // if (line.startY < line.endY) {
                //     // diagonal right/down => y+1, x-1 (8,0) => (0,8)
                //     xDiff = -1, yDiff = 1;
                // } else {
                //     // diagonal right/up => y-1, x-1 (6,4) => (2,0)
                //     xDiff = -1, yDiff = -1;
                // }
                
                for(let y = line.startY,  x = line.startX; x >= line.endX; y+=yDiff, x+=xDiff) {
                    if(locs.has(`${x},${y}`)) {
                        locs.set(`${x},${y}`, locs.get(`${x},${y}`) + 1);
                    } else {
                        locs.set(`${x},${y}`, 1);
                    }
                }
            }
        } else { // normal lines
            let lineStartY = (line.startY < line.endY) ? line.startY : line.endY;
            let lineEndY = (line.startY < line.endY) ? line.endY : line.startY;
            let lineStartX = (line.startX < line.endX) ? line.startX : line.endX;
            let lineEndX = (line.startX < line.endX) ? line.endX : line.startX;

            for(let y = lineStartY; y <= lineEndY; y++) {
                for(let x = lineStartX; x <= lineEndX; x++) {
                    if(locs.has(`${x},${y}`)) {
                        locs.set(`${x},${y}`, locs.get(`${x},${y}`) + 1);
                    } else {
                        locs.set(`${x},${y}`, 1);
                    }
                }
            }
        }
    });

    let overlaps = 0;
    for(const [key, val] of locs) {
        overlaps += (val >= 2) ? 1 : 0;
    }
    return overlaps;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));