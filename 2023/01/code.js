const _ = require('lodash');
const {input, testInput, testInput2} = require('./input');

const wordToNumber = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

function part1(calibrationDoc) {
    let numbers = calibrationDoc.split('\n')
                                .map(l => l.split('').filter(Number))
                                .map(a => Number(a[0] + a[a.length -1]));
    
    return numbers.reduce((a,b) => a+b, 0);
}

function part2(calibrationDoc) {
    let numbers = calibrationDoc.split('\n')
                                .map(l => search(l))
                                .map(a => Number(a[0] + a[a.length -1]));

    return numbers.reduce((a,b) => a+b, 0);
}

// console.log(search("one7twothreefour2fiveightwone72"))
function search(line) {
    let out = new Array([]);
    Object.keys(wordToNumber).forEach(word => {
        for (let i = 0; i < line.length - word.length + 1; i++) {
            if(line.substring(i, i + word.length) === word) {
                out[i] = wordToNumber[word];
            }
        }
    })
    Object.values(wordToNumber).forEach(num => {
        for (let i = 0; i < line.length; i++) {
            if(line[i] === num) {
                out[i] = num;
            }
        }
    })
    return out.filter(Number);
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));