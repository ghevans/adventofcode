const _ = require('lodash');
const {input, testInput} = require('./input');

const getPairs = function(input) {
    return input.split('\n\n').map(pair => {
        let parts = pair.split('\n');
        return {
            p1: JSON.parse(parts[0]),//.slice(1,parts[0].length-1),
            p2: JSON.parse(parts[1])//.slice(1,parts[1].length-1)
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

function isList(part) {
    return Array.isArray(part);
}
function comparePackets(packet1, packet2) {
    let max = Math.max(packet1?.length, packet2?.length)
    for (let i = 0; i < max; i++) {
        let left = packet1[i];
        let right = packet2[i];
        console.log(`  - Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);

        if (isList(left) && isList(right)) {
            // list vs. list
            console.log(`list vs. list => ${left} vs. ${right}`)
            let max = Math.max(left?.length, right?.length);
            for (let j = 0; j < max; j++) {
                let retVal = comparePackets(left[j], right[j]);
                if(retVal !== undefined) {
                    return retVal;
                }
            }
        } else if (isList(left) && !isList(right)) {
            // list vs. num
            console.log(`list vs. num => ${left} vs. ${right}`)
        } else if (!isList(left) && isList(right)) {
            // num vs. list
            console.log(`num vs. list => ${left} vs. ${right}`)
        } else {
            if (left === undefined || right === undefined) {
                console.log(`ran out of one => ${left} vs. ${right}`)
                return (packet1.length < packet2.length);
            } else {
                // num vs. num
                console.log(`num vs. num => ${left} vs. ${right}`)
                if (left !== right) {
                    return (left < right);
                }
            }
        }

        // let left = (Array.isArray(packet1[i])) ? packet1[i] : [packet1[i]];
        // let right = (Array.isArray(packet2[i])) ? packet2[i] : [packet2[i]];
        // let retVal = doComparison(left, right);
        // if (retVal !== undefined) {
        //     if (retVal) {
        //         console.log(`    - Left side is smaller, so inputs are in the right order`)
        //         return true;
        //     } else if (!retVal) {
        //         console.log(`    - Right side is smaller, so inputs are NOT in the right order`)
        //         return false
        //     }
        // }
    }
    console.log(`    - These packets are identical`);
    return true;
}

function unpack(val) {

}

function doComparison(leftArray, rightArray) {        
    console.log(`  - Compare ${JSON.stringify(leftArray)} vs ${JSON.stringify(rightArray)}`);
    
    let leftNested = _.countBy(JSON.stringify(leftArray))['['] > 1;
    let rightNested = _.countBy(JSON.stringify(rightArray))['['] > 1;


    // figure out if we're at the right level to do the comparison HERE
    let max = Math.max(leftArray.length, rightArray.length)
    for(let i = 0; i < max; i++) {
        let leftNested = _.countBy(JSON.stringify(leftArray))['['] > 1;
        let rightNested = _.countBy(JSON.stringify(rightArray))['['] > 1;
        // console.log(`leftNested: ${leftNested}`)
        // console.log(`rightNested: ${rightNested}`)
        let left = leftArray?.[i];
        let right = rightArray?.[i];

        if (left?.length > 1 && right?.length === undefined) {
            return doComparison(left, rightArray)
        } else if(right?.length > 1 && left?.length === undefined) {
            return doComparison(leftArray, right);
        } else if (left?.length > 1 && right?.length > 1) {
            return doComparison(left, right);
        } else if (left === undefined && right !== undefined) {
            console.log(`  - Left side ran out of items, so inputs are in the right order`)
            return true;
        } else if (left !== undefined && right === undefined) {
            console.log(`  - Right side ran out of items, so inputs are NOT in the right order`)
            return false;
        } else {
            console.log(`    - Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);
            if (left !== right) {
                return (left < right) ? true : false;
            }
        }
    }
}

function part1(input) {
    let pairs = getPairs(input);
    let goodIndexes = []
    let badIndexes = [];
    let idx = 1;
    for (pair of pairs) {
        console.log(`== Pair ${idx} ==`)
        console.log(`- Compare ${JSON.stringify(pair.p1)} vs. ${JSON.stringify(pair.p2)}`)

        console.log(comparePackets(pair.p1, pair.p2))
        // if(comparePackets(pair.p1, pair.p2)) {
        //     goodIndexes.push(idx);
        // } else {
        //     badIndexes.push(idx);
        // }
        console.log()

        if (idx > 16) {
            return
        }
        idx++;
    }
    
    return goodIndexes.reduce((a,b) => a+b, 0);
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(input));