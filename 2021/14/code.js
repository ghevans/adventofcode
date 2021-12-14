const _ = require('lodash');
const {input, template, testInput, testTemplate} = require('./input');

function part1(template, rules, loops) {
    let poly = template;
    for (let i = 0; i < loops; i++) {
        let newPoly = '';

        for(j = 1; j < poly.length; j++) {
            let pair = poly.slice(j-1, j+1);
            let insert = rules.get(pair);
            newPoly += `${pair[0]}${insert}`;
        }
        newPoly += poly[poly.length-1];

        poly = newPoly;
    }
    
    let occurrences = getOccurrences(poly);
    return Math.max(...occurrences.values()) - Math.min(...occurrences.values());
}

function getOccurrences(poly) {
    let out = new Map();
    while (poly.length > 0) {
        let nextPoly = '';
        let char = poly[0];
        let count = 0;
        for (let i = 0; i < poly.length; i++) {
            if (poly[i] === char) {
                count++;
            } else {
                nextPoly += poly[i];
            }
        }
        out.set(char, count);
        poly = nextPoly;
    }
    return out;
}

function part2(template, rules, loops) {
    let polyMap = buildPolyMap(template);
    let countMap = new Map();

    for (let i = 0; i < loops; i++) {
        let nextPolyMap = new Map();
        let lastAdded = '';
        countMap.clear();

        polyMap.forEach((value, key) => {
            // Always adding two pairs, left and right 
            let left = key[0] + rules.get(key);
            let right = rules.get(key) + key[1];

            nextPolyMap.set(left, (nextPolyMap.get(left) ?? 0) + value);
            nextPolyMap.set(right, (nextPolyMap.get(right) ?? 0) + value);

            countMap.set(key[0], (countMap.get(key[0]) ?? 0) + value);
            countMap.set(rules.get(key), (countMap.get(rules.get(key)) ?? 0) + value);

            lastAdded = key[1];
        });

        polyMap = nextPolyMap;
    }
    
    return Math.max(...countMap.values()) - Math.min(...countMap.values());
}

function buildPolyMap(template) {
    let out = new Map();
    for(j = 1; j < template.length; j++) {
        let pair = template.slice(j-1, j+1);
        out.set(pair, (out.get(pair) ?? 0) + 1);
    }
    return out;
}

console.log("Part 1 - " + part1(template, input, 10));
console.log("Part 2 - " + part2(template, input, 40)); // <-- this gives the wrong answer (too high by 1) correct => 2967977072188