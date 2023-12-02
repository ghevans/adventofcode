const _ = require('lodash');
const {input, testInput} = require('./input');

function part1(input) {
    let sumOfValid = 0;
    
    input.forEach(game => {
        let valid = true;
        game.draws.map(draw => draw.map(set => {
            let maxVal = (set.color ==='red') ? 12 : (set.color === 'green') ? 13 : 14;
            if (set.num > maxVal) {
                valid = false;
            }
        }));
        
        // console.log(`Game: ${game.id} => ${valid}`);
        if (valid) { sumOfValid+= game.id; }
    })
    return sumOfValid;
}

function part2(input) {
    let sumPower = 0;
    
    input.forEach(game => {
        let minR = minG = minB = 0;
        game.draws.map(draw => draw.map(set => {
            switch(set.color) {
                case 'red':
                    if (set.num > minR ) {
                        minR = set.num;
                    }
                    break;
                case 'green':
                    if (set.num > minG ) {
                        minG = set.num;
                    }
                    break;
                case 'blue':
                    if (set.num > minB ) {
                        minB = set.num;
                    }
                    break;
            }
        }));

        // console.log(`Game: ${game.id} => power = ${minR * minG * minB}`);
        sumPower += (minR * minG * minB);
    })

    return sumPower;
}

console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(input));