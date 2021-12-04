const _ = require('lodash');
const {seq, cards, testSeq, testCards} = require('./input');

function part1(cards, seq) {
    let allWinners = new Set();
    for(let i = 0; i < seq.length; i++) {
        cards = evalCards(cards, seq[i]);
        let winner = checkWinners(cards, i, seq[i], allWinners);
        if (winner.size > 0) {
            return winner.values().next().value;
        }
    }
}

function evalCards(cards, num) {
    for (card of cards) {
        if(card.has(num)) {
            let val = card.get(num);
            val.seen = true;
            card.set(num, val);
        }
    }
    return cards;
}

function checkWinners(cards, round, curNumber, prevWinners) {
    let roundWinners = new Map();
    for (const [i, card] of cards.entries()) {
        let temp = [...Array(5)].map(x=>Array(5));
        let sumUnmarked = 0;
        for(const [num, details] of card) {
            temp[details.y][details.x] = (details.seen) ? 1 : 0;
            sumUnmarked += (!details.seen) ? num : 0;
        }  
        // row check
        for(let y = 0; y < 5; y++) {
            let row = 0;
            for (let x = 0; x < 5; x++) {
                row += temp[y][x];
            }
            if (row === 5 && !prevWinners.has(i)) {
                //printCards(cards, round);
                roundWinners.set(i, sumUnmarked*curNumber);
            }
        }

        // column check
        for(let x = 0; x < 5; x++) {
            let col = 0;
            for (let y = 0; y < 5; y++) {
                col += temp[y][x];
            }
            if (col === 5 && !prevWinners.has(i)) {
                //printCards(cards, round);
                roundWinners.set(i, sumUnmarked*curNumber);
            }
        }
    }
    return roundWinners;
}

function printCards(cards, round) {
    console.log(`After Round ${round+1}`)
    let temp = [...Array(5)].map(x=>Array(5));
    for (card of cards) {
        let c = "";      
        for(const [num, details] of card) {
            temp[details.y][details.x] = (details.seen) ? `[${num}]` : `${num}`;
        }  
        for(let y = 0; y < 5; y++) {
            let row = "\n";
            for (let x = 0; x < 5; x++) {
                row += temp[y][x].padEnd(5);
            }
            c += row;
        }
        console.log(c);
    }
    console.log(`============================`)
}

function part2(cards, seq) {
    let allWinners = new Set();
    let roundWinners = new Map();
    for(let i = 0; i < seq.length; i++) {
        cards = evalCards(cards, seq[i]);
        roundWinners = checkWinners(cards, i, seq[i], allWinners);
        if (roundWinners.size > 0) {
            for (key of roundWinners.keys()) {
                allWinners.add(key);
            }

            if (allWinners.size === cards.length) {
                return roundWinners.values().next().value;
            }
        }
    }
}

console.log("Part 1 - " + part1(cards, seq));
console.log("Part 2 - " + part2(cards, seq));