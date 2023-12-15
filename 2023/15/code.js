const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(sequence) {
    return sequence.map(part => getHash(part)).reduce((a,b) => a+b, 0);
}

function getHash(part) {
    let hash = 0;
    for (char of part) {
        if (['-', '='].includes(char)) {
            break;
        } else {
            hash += char.charCodeAt(0);
            hash *= 17
            hash = (hash % 256);
        }
    }
    return hash;
}


const findLabel = (label, box) => {
    for (let i = 0; i < box.length; i++) {
        if (box[i].label === label) {
            return i;
        }
    }
    return -1;
}

function part2(sequence) {
    let boxes = Array.from(Array(256), () => new Array())
    const instructions = sequence.map(part => {
        let locOfSymbol = (part.indexOf('=') > -1) ? part.indexOf('=') : part.indexOf('-');
        return {
            label : part.slice(0, locOfSymbol).join(''),
            box : getHash(part),
            oper : (part.indexOf('=') > -1) ? '=' : '-',
            focalLength : (part.indexOf('=') > -1) ? Number(part[locOfSymbol+1]) : -1
        }
    });

    for (inst of instructions) {
        let curBox = boxes[inst.box];
        // console.log(`operation ${inst.oper} on box ${inst.box} with label ${inst.label}`)
        switch(inst.oper) {
            case '=':
                if(curBox.length === 0) {
                    curBox.push(inst);
                } else {
                    let labelIndex = findLabel(inst.label, curBox);
                    if (labelIndex > -1) {
                        curBox.splice(labelIndex, 1, inst);
                    } else {
                        curBox.push(inst);
                    }
                }
                break;
            case '-':
                let labelIndex = findLabel(inst.label, curBox);
                if(labelIndex > -1) {
                    curBox.splice(labelIndex, 1);
                }
                break;
        }
    }
    boxes = boxes.map((box, index) => [index, box]).filter(([index, box]) => box.length > 0);
    let power = 0;
    for ([boxNum, boxList] of boxes) {
        for (let i = 0; i < boxList.length; i++) {
            power += (1+boxNum) * (i+1) * boxList[i].focalLength;
        }
    }
    
    return power;
}


console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));