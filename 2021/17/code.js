const _ = require('lodash');
const {input, testInput} = require('./input');

function runSim(target) {

    let bestOverall;
    let totalHits = 0;

    for (let y = -1000; y < 1000; y++) {
        for (let x = 0; x <= target.maxX; x++) {
            let probe = {
                initX: x,
                initY: y,
                x: 0,
                y: 0,
                vx: x,
                vy: y,
                maxHeight: 0
            };
        
            while(true) {
                probe = moveProbe(probe);
                if (outOfRange(probe, target)) {
                    // console.log(`out of bounds for: [${probe.x},${probe.y}] with vel [${probe.vx},${probe.vy}]`)
                    break;
                } else if (hitTarget(probe, target)) {
                    // console.log(`HIT TARGET for: [${probe.x},${probe.y}] with maxHeight ${probe.maxHeight}`)
                    bestOverall = (probe.maxHeight > (bestOverall?.maxHeight ?? 0)) ? probe : bestOverall;
                    totalHits++;
                    break;
                }
            }
        }
    }

    return { bestOverall, totalHits};
}

function moveProbe(probe) {
    return {
        initX: probe.initX,
        initY: probe.initY,
        x: probe.x + probe.vx,
        y: probe.y + probe.vy,
        vx: probe.vx + ((probe.vx > 0) ? -1 : (probe.vx < 0) ? 1 : 0),
        vy: probe.vy - 1,
        maxHeight: (probe.y > probe.maxHeight) ? probe.y : probe.maxHeight
    }
}

function outOfRange(probe, target) {
    return (probe.y < target.minY) || (probe.x > target.maxX); 
}

function hitTarget(probe, target) {
    return ((probe.x >= target.minX && probe.x <= target.maxX) && 
            (probe.y >= target.minY && probe.y <= target.maxY));
}

let {bestOverall, totalHits} = runSim(input);

console.log("Part 1 - " + bestOverall.maxHeight);
console.log("Part 2 - " + totalHits);