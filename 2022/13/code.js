const _ = require('lodash');
const {input, testInput} = require('./input');

const getPairs = function(input) {
    return input.split('\n\n').map(pair => {
        let parts = pair.split('\n');
        return {
            p1: parts[0],//.slice(1,parts[0].length-1),
            p2: parts[1]//.slice(1,parts[1].length-1)
        }
    });
}

const parsePacket = function(packet) {
    let parts = [];
    let cur = '';
    let depth = 0;
    for(let i = 0; i < packet.length; i++) {
        switch(packet[i]) {
            case '[':
                cur += packet[i];
                depth++;
                break;
            case ']':
                cur += packet[i];
                depth--;
                if (depth === 0) {
                    parts.push(cur);
                    cur = '';
                }
                break;
            case ',':
                if (depth === 0) {
                    if (cur !== '') {
                        parts.push(cur);
                    }
                    cur = '';
                } 
                else {
                    cur += packet[i];
                }
                break;
            default: // an int always gets added to cur
                cur += packet[i];
                break;
        }
    }
    if (cur != '') { parts.push(cur) };
    return parts;
}

const checkLists = function(p1, p2) {
    for (let i = 0; i < p1.length; i++) {
        let left = p1[i], right = p2[i];
        console.log(`  - Compare ${left} vs ${right}`) 
        if (left !== right) {
            if (left > right) {
                console.log(`    - Right side is smaller, so inputs are NOT in the right order`);
                return false;
            } else {
                console.log(`    - Left side is smaller, so inputs are in the right order`);
                return true;
            }
        }
    }
    return true;
}

const isNumber = function(val) {
    console.log(val)
    if (['[',']',','].includes(val)) {
        return false;
    } else {
        return true;
    }
}

function part1(input) {
    let pairs = getPairs(input);
    console.log(pairs)
    let goodIndexes = []
    let badIndexes = [];
    let idx = 1;
    for (pair of pairs) {
        console.log(pair);
        console.log(JSON.parse(pair.p1))
        console.log(JSON.parse(pair.p2))
        let p1Parts = parsePacket(pair.p1);
        let p2Parts = parsePacket(pair.p2);
        console.log(p1Parts)
        console.log(p2Parts)

        console.log(`== Pair ${idx} ==`)
        console.log(`- Compare [${p1Parts}] vs. [${p2Parts}]`)
        let max = Math.max(p1Parts.length, p2Parts.length)
        for(let i = 0; i < max; i++) {
            // let left = p1Parts[i];
            // console.log(`left: ${left}`);
            // right = p2Parts[i];
            // console.log(`right: ${right}`)
            // if (left[0] === '[') {
            //     left = left.slice(1, left.length -1).split(',')
            //     console.log(`updated left`)
            //     console.log(left)
            // }

            let left = (p1Parts[i]?.[0] === '[') ? p1Parts[i].slice(1,p1Parts[i].length-1) : p1Parts[i];
            let right = (p2Parts[i]?.[0] === '[') ? p2Parts[i].slice(1,p2Parts[i].length-1) : p2Parts[i];
            
            console.log(`  - Compare ${left} vs ${right}`) 
            console.log(isNumber(left))
            console.log(isNumber(right))
            // console.log(left)
            // console.log(right)
            // if (Number.isInteger(left) && Number.isInteger(right)) {
            //     console.log(`pure int comparision: ${left} vs. ${right}`)
            // } else {
            //     console.log(`mixed comparison: ${left} vs. ${right}`)
            // }
        }
        // console.log(checkLists(p1Parts, p2Parts))
        
        console.log()
        idx++;
    }
    return "tbd";
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(input));