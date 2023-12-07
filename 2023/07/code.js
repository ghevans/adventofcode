const _ = require('lodash');
const {input, testInput} = require('./input');

const rankMap = {
    '5oC' : 6,
    '4oC' : 5,
    'FH' : 4,
    '3oC' : 3,
    '2P' : 2,
    '1P' : 1,
    'HC' : 0
}

const cardRank = {
    'A' : 14,
    'K' : 13,
    'Q' : 12,
    'J' : 11,
    'T' : 10,
    '9' : 9,
    '8' : 8,
    '7' : 7,
    '6' : 6,
    '5' : 5,
    '4' : 4,
    '3' : 3,
    '2' : 2
}

const cardRankWithJokers = {
    'A' : 14,
    'K' : 13,
    'Q' : 12,
    'T' : 10,
    '9' : 9,
    '8' : 8,
    '7' : 7,
    '6' : 6,
    '5' : 5,
    '4' : 4,
    '3' : 3,
    '2' : 2,
    'J' : 1,
}

function part1(deck) {
    for (hand of deck) {
        hand['type'] = determineHand(hand.cards);
    }
    deck = sortDeck(deck, cardRank);

    let winnings = 0;
    for(let i = 0; i < deck.length; i++) {
        winnings += (deck[i].bid * (i+1));
    }
    return winnings;
}

function part2(deck) {
    for (hand of deck) {
        hand['type'] = determineHand(hand.cards);
    }
    deck = sortDeck(deck, cardRankWithJokers);
    console.log(deck);
    
    let winnings = 0;
    for(let i = 0; i < deck.length; i++) {
        // console.log(`${deck[i].cards} is rank ${i+1} winning ${deck[i].bid * (i+1)} `)
        winnings += (deck[i].bid * (i+1));
    }
    return winnings;
}

function sortDeck(deck, cardRank) {
    return deck.sort((hand1, hand2) => {
        if(rankMap[hand1.type] > rankMap[hand2.type]) {
            return 1;
        }
        if(rankMap[hand1.type] < rankMap[hand2.type]) {
            return -1;
        }
        if(rankMap[hand1.type] === rankMap[hand2.type]) {
            for(let i = 0; i < hand1.cards.length; i++) {
                if (cardRank[hand1.cards[i]] != cardRank[hand2.cards[i]]) {
                    return (cardRank[hand1.cards[i]] > cardRank[hand2.cards[i]]) ? 1 : -1;
                }
            }
        }
    })
}

function determineHand(cards) {
    let parts = cards.split('').reduce((a, char) => (a[char] = (a[char] || 0) + 1, a), {});
    let maxSet = _.max(Object.values(parts))
    switch(Object.entries(parts).length) {
        case 1: // 5 of a kind
            return '5oC';
        case 2: // either 4 of a kind  or full house
            return (maxSet === 4) ? '4oC' : 'FH';
        case 3: // 3 of a kind or 2 pair
            return (maxSet === 3) ? '3oC' : '2P';
        case 4: // 1 pair
            return '1P';
        case 5: // high card
            return 'HC';
    }
    return "unknown"
}

// console.log("Part 1 - " + part1(input));
console.log("Part 2 - " + part2(testInput));