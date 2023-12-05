const _ = require('lodash');
const {input, testInput} = require('./input');

const steps = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location'
]

function part1(input) {
    let locations = [];

    for (seed of input.seeds) {
        let current = seed;
        let mapping = {};
        for (step of steps) {
            let lines = input[step];
            let valid = false;
            for (part of lines) {
                let next = 0;
                if ((current <= part.source + part.range) && current >= part.source) {
                    valid = true;
                    next = part.dest + (current - part.source);
                }

                if(valid) { 
                    current = next;
                    break; 
                }
            }
            mapping[step] = current;
        }
        locations.push({
            seed: seed,
            loc: current,
            steps: mapping
        });
    }
    // console.log(locations)

    return _.minBy(locations, 'loc').loc;
}

function part2(input) {
    let minSeed = Infinity;
    let currentMin = Infinity;

    for(let i = 0; i < input.seeds.length; i+=2) {
        let chunk = input.seeds.slice(i, i+2);
        console.log(`starting chunk from ${chunk[0]} to ${chunk[0]+chunk[1]-1}`)
        for(let seedNum = chunk[0]; seedNum < chunk[0] + chunk[1]; seedNum++) {
            let current = seedNum;

            for (step of steps) {
                let lines = input[step];
                let valid = false;
                for (part of lines) {
                    let next = 0;
                    if ((current <= part.source + part.range) && current >= part.source) {
                        valid = true;
                        next = part.dest + (current - part.source);
                    }
    
                    if(valid) { 
                        current = next;
                        break; 
                    }
                }
            }

            if(current < currentMin) {
                console.log(`working on seed ${seedNum} updating currentMin from ${currentMin} to ${current}`)
                minSeed = seedNum;
                currentMin = current;
            }
        }
        console.log(`minimum for this range was ${minSeed} with location ${currentMin}`)
    }
    
    // console.log(locations)
    return currentMin;
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));