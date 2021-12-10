const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let countOfEasy = 0;
    _.forEach(input, signal => {
        _.forEach(signal.patterns, pattern => {
            let set = signal.map.get(pattern.length);
            set.add(pattern);
            signal.map.set(pattern.length, set);
        })
        countOfEasy += _.filter(signal.output, out => out.length === 2 || out.length === 3 || out.length === 4 || out.length === 7).length;
    })
    return countOfEasy;
}


function part2(input) {
    let countOfHard = 0;
    _.forEach(input, signal => {
        let code = '';
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

        let decoded = {
            0: _.union(segments.top, segments.ur, segments.lr, segments.bot, segments.ll, segments.ul).join(''),
            1: signal.patterns[0].join(''),
            2: _.union(segments.top, segments.ur, segments.mid, segments.ll, segments.bot).join(''),
            3: _.union(segments.top, segments.ur, segments.mid, segments.lr, segments.bot).join(''),
            4: signal.patterns[2].join(''),
            5: _.union(segments.top, segments.ul, segments.mid, segments.lr, segments.bot).join(''),
            6: _.union(segments.top, segments.ul, segments.mid, segments.ll, segments.lr, segments.bot).join(''),
            7: signal.patterns[1].join(''),
            8: signal.patterns[9].join(''),
            9: _.union(segments.top, segments.ul, segments.ur, segments.mid, segments.lr, segments.bot).join('')
        }
        

        _.forEach(signal.output, output => {
            let ans = _.filter(decoded, num => { 
                return (num.length === output.length) && (new Set(num).size === new Set(num+output).size)
            });
            
            code += Object.keys(decoded).find(key => decoded[key] === ans[0]);
        })
        countOfHard += Number(code);
    })
    return countOfHard;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));