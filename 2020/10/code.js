const _ = require('lodash');
const input = require('./input');

function part1(input) {
    input.push(0)
    const sorted = input.sort((a,b) => a-b);
    sorted.push(sorted[sorted.length - 1] + 3)

    let singles = 0, doubles = 0, triples = 0;
    for (let i = 0, j = 1; j < sorted.length; i++, j++) {
        switch(sorted[j] - sorted[i]) {
            case 1:
                singles++;
                break;
            case 2:
                doubles++;
                break;
            case 3:
                triples++;
                break;
        }
    }
    // console.log(`singles: ${singles} | doubles: ${doubles} | triples: ${triples}`)

    return singles * triples;
}

function part2(input) {
    input.push(0);
    const sorted = input.sort((a,b) => a-b);
    sorted.push(sorted[sorted.length - 1] + 3);

    let pathsByIndex = Array(sorted.length).fill(0);
    pathsByIndex[0] = 1; // always 1 path starting from 0

    for (let i = 0; i < sorted.length; i++) {
        for (let j = 1; j <= 3; j++) {
            if (sorted[i-j] + 3 >= sorted[i]) {
                // console.log(`able to move from ${sorted[i]} => ${sorted[i-j]}`)
                // console.log(`adding ${pathsByIndex[i-j]} to ${pathsByIndex[i]}`)
                pathsByIndex[i] += pathsByIndex[i-j];
            }
        }
    }

    return pathsByIndex[sorted.length - 1];
}

// can't run back to back bc the array gets manipulated
// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));