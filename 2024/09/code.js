const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const buildDiskMap = (input) => {
    let diskMap = [], i = 0, curPos = 0;;
    let groups = [];
    while(input.length) {
        let block = Number(input.shift());
        let padding = Number(input.shift());
        padding = (isNaN(padding)) ? 0 : padding;
        groups.push({v: i, b: block, p: padding, start: curPos});
        diskMap.push(Array(block).fill(i));
        diskMap.push(Array(padding).fill('.'));
        curPos += (block*(""+i).length + padding);
        i++;
    }
    
    return [diskMap, groups];
}

const checkSum = (map) => {
    let sum = 0;
    for (let i = 0; i < map.length; i++) {
        sum += (map[i] !== '.') ? (i * map[i]) : 0;
    }
    return sum;
}

const swap = (map) => {
    let back = map.length - 1;
    for (let i = 0; i < map.length; i++) {
        if (map[i] === '.' && i < back) {
            map[i] = map[back];
            map[back] = '.';
            while(map[back] === '.') {
                back--;
            }
        }
    }
    return map;
}

const swap2 = (map, groups) => {
    map = map.flat().join('');
    console.log(map);
    for (let i = groups.length - 1; i >= 0; i--) {
        let groupToPlace = groups[i];
        let totalDigits = (""+groupToPlace.v).length * groupToPlace.b;


        let searchTerm = Array(totalDigits).fill('.').join('');
        let toInsert = Array(groupToPlace.b).fill(groupToPlace.v).join('');
        
        // Find an open slot for the entire file (size is totalDigits long, searchTerm the '.' string of totalDigits length)
        let firstOpenLoc = map.indexOf(searchTerm);
        let currentLoc = groupToPlace.start;


        if ((firstOpenLoc > 0) && (firstOpenLoc < currentLoc)) {
            // console.log(`moving from ${currentLoc} to ${firstOpenLoc}`)
            console.log(`\tmoving ${toInsert} from ${currentLoc} to ${firstOpenLoc}`);

            console.log(`\t\tbMove:\t\t${firstOpenLoc - 10} | ${map.substring(firstOpenLoc - 10, firstOpenLoc + totalDigits + 10)} | ${firstOpenLoc + totalDigits + 10}`)
            console.log(`\t\tbMove:\t\t${currentLoc - 10} | ${map.substring(currentLoc - 10, currentLoc + totalDigits + 10)} | ${currentLoc + totalDigits + 10}`)
            for (let j = 0; j < totalDigits ; j++) {
                let mArray = map.split('');
                mArray[firstOpenLoc+j] = toInsert[j];
                mArray[currentLoc+j] = '.';
                map = mArray.join('');
            }                
            console.log(`\t\taMove:\t\t${currentLoc - 10} | ${map.substring(currentLoc - 10, currentLoc + totalDigits + 10)} | ${currentLoc + totalDigits + 10}`)
            console.log(`\t\taMove:\t\t${firstOpenLoc - 10} | ${map.substring(firstOpenLoc - 10, firstOpenLoc + totalDigits + 10)} | ${firstOpenLoc + totalDigits + 10}`)
        }
    }

    console.log(map)
    return map
}

// 108672322133 <-- so consistent
// 108672322133
// 108672322133
// 113862081038
// 114689553433
// 105889297329 <-- only going lower
// 111813702055 <-- def too low
// 141915164103
// 120761124332 < -- too low
// 118201630628
// 118151801227 <-- too low
// 6216544403458 <-- original answer from p1
function part1(input) {
    let [diskMap, groups] = buildDiskMap(input);

    return checkSum(swap(diskMap.flat()));
}

function part2(input) {
    let [diskMap, groups] = buildDiskMap(input);
    let sortedMap = swap2(diskMap, groups);
    // console.log(sortedMap)
    return checkSum(sortedMap.split(''));
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));