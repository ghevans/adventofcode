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

function part1(input) {
    let [diskMap, groups] = buildDiskMap(input);

    return checkSum(swap(diskMap.flat()));
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
function part2(input) {
    // let [diskMap, diskString] = createDisk(input);

    console.log(`2333133121414131402`.split('').map(Number).reduce((a,b) => a+b))

    let disk = Array(input.map(Number).reduce((a,b) => a+b)).fill(-1);
    console.log(disk)
    let id = 0;
    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < input[i]; j++) {
                disk[i+j] = id;
            }
            id++;
        }
    }
    console.log(disk)

    // let s = swap2(diskMap, diskString)
    // let [diskMap, groups] = buildDiskMap(input);
    // let sortedMap = swap2(diskMap, groups);
    // console.log(s)
    // return checkSum(s.split(''));
}

const swap2 = (diskMap, diskString) => {
    
    for (let i = diskMap.length - 1; i >= 0; i--) {
        let groupToPlace = diskMap[i];
        let totalDigits = groupToPlace.file.length;
        console.log(groupToPlace)

        let searchTerm = Array(totalDigits).fill('.').join('');
        console.log(searchTerm)
        // let toInsert = Array(groupToPlace.b).fill(groupToPlace.v).join('');
        
        // // Find an open slot for the entire file (size is totalDigits long, searchTerm the '.' string of totalDigits length)
        let firstOpenLoc = diskString.indexOf(searchTerm);
        let currentLoc = groupToPlace.start;

        if ((firstOpenLoc > 0) && (firstOpenLoc < currentLoc)) {
            // console.log(`moving from ${currentLoc} to ${firstOpenLoc}`)
            // console.log(`\tmoving ${groupToPlace.file} from ${currentLoc} to ${firstOpenLoc}`);

            // console.log(`\t\tbMove:\t\t${firstOpenLoc - 10} | ${diskString.substring(firstOpenLoc - 10, firstOpenLoc + totalDigits + 10)} | ${firstOpenLoc + totalDigits + 10}`)
            // console.log(`\t\tbMove:\t\t${currentLoc - 10} | ${diskString.substring(currentLoc - 10, currentLoc + totalDigits + 10)} | ${currentLoc + totalDigits + 10}`)
            for (let j = 0; j < totalDigits ; j++) {
                let mArray = diskString.split('');
                mArray[firstOpenLoc+j] = groupToPlace.file[j];
                mArray[currentLoc+j] = '.';
                diskString = mArray.join('');
            }                
            // console.log(`\t\taMove:\t\t${currentLoc - 10} | ${diskString.substring(currentLoc - 10, currentLoc + totalDigits + 10)} | ${currentLoc + totalDigits + 10}`)
            // console.log(`\t\taMove:\t\t${firstOpenLoc - 10} | ${diskString.substring(firstOpenLoc - 10, firstOpenLoc + totalDigits + 10)} | ${firstOpenLoc + totalDigits + 10}`)
        }
    }

    return diskString;
}

const createDisk = (input) => {
    let diskMap = [], i = 0, curPos = 0;
    let diskString = [];
    while(input.length) {
        let block = Number(input.shift());
        let padding = Number(input.shift());
        padding = (isNaN(padding)) ? 0 : padding;

        let nextPos = curPos + (block*(""+i).length + padding);
        diskMap.push({
            file: Array(block).fill(i).join(''),
            start: curPos,
            end: nextPos - 1
        });

        diskString.push(Array(block).fill(i));
        diskString.push(Array(padding).fill('.'));
        curPos = nextPos;
        i++;
    }
    console.log(diskMap)
    console.log(diskString.flat().join(''))
    return [diskMap, diskString.flat().join('')];
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));