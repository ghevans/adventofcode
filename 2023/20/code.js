const _ = require('lodash');
const {input, testInput} = require('./input');
const helper = require('../../helpers');

const convertToMap = (modules) => {
    let out = {};
    for (let i = 0; i < modules.length; i++) {
        Object.assign(out, modules[i]);
    }
    return out;
}

function part1(modules) {
    modules = convertToMap(modules);

    let start = modules.broadcaster;
    let signalQueue = [];
    let startingSignals = start.downstream.map(s => [s, 'low']);
    signalQueue.push(...startingSignals);
    console.log(signalQueue)
    while(signalQueue.length > 0) {
        let [moduleName, signalType] = signalQueue.shift();
        let curModule = modules[moduleName];

        console.log(`${moduleName}: ${curModule.type} with ${curModule.downstream} in curValue of ${curModule.curValue}`)
        switch(curModule.type) {
            case '%':
                if(signalType === 'low') { // only works for low pulses
                    curModule.curValue = (curModule.curValue === 'off') ? 'on' : 'off';
                    signalQueue.push(...curModule.downstream.map(s => [s, (curModule.curValue === 'on') ? 'high' : 'low']));  
                }
                break;
            case '&':
                let curInputMap = curModule.inputMap;
                
                break;
        }
        console.log(signalQueue)
    }
    return "tbd";
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(testInput));