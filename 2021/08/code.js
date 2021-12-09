const _ = require('lodash');
const {input, testInput} = require('./input');

let somethign = {
    top: [0,2,3,5,6,7,8,9], // all but 1
    ul: [0,4,5,6,8,9],
    ur: [0,1,2,3,4,7,8,9], // all but 5,6
    mid: [2,3,4,5,6,8,9],
    ll: [0,2,6,8],
    lr: [0,1,3,4,5,6,7,8,9], // all but 2
    bot: [0,2,3,5,6,8,9]
}


function part1(input) {
    let countOfEasy = 0;
    _.forEach(input, signal => {
        _.forEach(signal.patterns, pattern => {
            let set = signal.map.get(pattern.length);
            set.add(pattern);
            signal.map.set(pattern.length, set);
        })
        console.log(signal);
        countOfEasy += _.filter(signal.output, out => out.length === 2 || out.length === 3 || out.length === 4 || out.length === 7).length;
    })
    return countOfEasy;
}


function part2(input) {
    let countOfEasy = 0;


    _.forEach(input, signal => {
        let segments = {
            top: `abcdefg`.split(''),
            ul: `abcdefg`.split(''),
            ur: `abcdefg`.split(''),
            mid: `abcdefg`.split(''),
            ll: `abcdefg`.split(''),
            lr: `abcdefg`.split(''),
            bot: `abcdefg`.split('') 
        }

        segments.ur = segments.lr = signal.patterns[0]; // one
        segments.top = _.xor(segments.ur, signal.patterns[1]); // seven => TOP
        segments.ul = segments.mid = _.xor(signal.patterns[2], segments.ur); // four
        segments.ll = segments.bot = _.xor(segments.ll, _.union(segments.ur,segments.top, segments.ul)); // the rest
        
        let eight = signal.patterns[9];
        console.log(`eight: ${eight}`)
        console.log(segments);

        let twoThreeFive = _.filter(signal.patterns, pattern => pattern.length === 5);
        let zeroSixNine = _.filter(signal.patterns, pattern => pattern.length === 6);

        // Determine bottom from using the nines
        let bottomNine = _.union(segments.top, segments.ul, segments.ur, segments.mid, segments.lr);
        segments.bot = _.map(zeroSixNine, pattern => _.xor(pattern, bottomNine)).filter(s => s.length === 1)[0];
        segments.ll = _.xor(segments.ll, segments.bot);        

        let middle = _.union(segments.top, segments.ur, segments.lr, segments.bot);
        segments.mid = _.map(twoThreeFive, pattern => _.xor(pattern, middle)).filter(s => s.length === 1)[0];
        segments.ul = _.xor(segments.ul, segments.mid);

        let upperTwo = _.union(segments.top, segments.mid, segments.ll, segments.bot);
        segments.ur = _.map(twoThreeFive, pattern => _.xor(pattern, upperTwo)).filter(s => s.length === 1)[0];
        segments.lr = _.xor(segments.lr, segments.ur);

        console.log(segments);


        
        countOfEasy += _.filter(signal.output, out => out.length === 2 || out.length === 3 || out.length === 4 || out.length === 7).length;
    })
    return countOfEasy;
}

// console.log("Part 1 - " + part1(testInput));
console.log("Part 2 - " + part2(testInput));