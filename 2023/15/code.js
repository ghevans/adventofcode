const _ = require('lodash');
const {input, testInput} = require('./input');

const getHash = (part) => {
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

const buildInst = (part) => {
    let locOfSymbol = (part.indexOf('=') > -1) ? part.indexOf('=') : part.indexOf('-');
    return {
        label : part.slice(0, locOfSymbol).join(''),
        box : getHash(part),
        oper : (part.indexOf('=') > -1) ? '=' : '-',
        focalLength : (part.indexOf('=') > -1) ? Number(part[locOfSymbol+1]) : -1
    }
}

const findLabel = (label, box) => { return box.findIndex(b => b.label === label); }

const getPower = (boxes) => {
    boxes = boxes.map((box, index) => [index, box]).filter(([index, box]) => box.length > 0);
    let power = 0;
    for ([boxNum, boxList] of boxes) {
        for (let i = 0; i < boxList.length; i++) {
            power += (1+boxNum) * (i+1) * boxList[i].focalLength;
        }
    }
    return power;
}

function part1(sequence) {
    return sequence.map(part => getHash(part)).reduce((a,b) => a+b, 0);
}

function part2(sequence) {
    let boxes = Array.from(Array(256), () => new Array())
    const instructions = sequence.map(buildInst);

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
    
    return getPower(boxes);
}


console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));