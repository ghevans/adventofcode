const _ = require('lodash');
const {input, testInput} = require('./input');

const RED = 12, GREEN = 13, BLUE = 14;

function part1(input) {
    let sumOfValid = 0;
    
    input.forEach(game => {
        let valid = true;
        game.draws.forEach(draw => {
            draw.forEach(set => {
                switch(set.color) {
                    case 'red':
                        if (set.num > RED) {
                            valid = false;
                        }
                        break;
                    case 'green':
                        if (set.num > GREEN) {
                            valid = false;
                        }
                        break;
                    case 'blue':
                        if (set.num > BLUE) {
                            valid = false;
                        }
                        break;
                }
            })
        })
        
        console.log(`Game: ${game.id} => ${valid}`);
        if (valid) { sumOfValid+= game.id; }
    })
    return sumOfValid;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));