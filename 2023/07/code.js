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

function calculateWinngs(deck, jokersWild) {
    for (hand of deck) {
        hand['type'] = determineHand(hand.cards, jokersWild);
    }
    deck = (jokersWild) ? sortDeck(deck, cardRankWithJokers) : sortDeck(deck, cardRank);

    let winnings = 0;
    for(let i = 0; i < deck.length; i++) {
        winnings += (deck[i].bid * (i+1));
    }
    return winnings;
}

function sortDeck(deck, cardRank) {
    return deck.sort((hand1, hand2) => {
        if(rankMap[hand1.type] === rankMap[hand2.type]) {
            for(let i = 0; i < hand1.cards.length; i++) {
                if (cardRank[hand1.cards[i]] != cardRank[hand2.cards[i]]) {
                    return (cardRank[hand1.cards[i]] > cardRank[hand2.cards[i]]) ? 1 : -1;
                }
            }
        }
        return (rankMap[hand1.type] > rankMap[hand2.type]) ? 1 : -1;
    })
}

function determineHand(cards, jokersWild) {
    let parts = cards.split('').reduce((a, char) => (a[char] = (a[char] || 0) + 1, a), {});
    if (jokersWild && Object.keys(parts).includes('J')) {
        let numJokers = parts['J'];
        delete parts['J'];
        if (numJokers === 5) {
            parts['A'] = 5;
        } else {
            let bestUse = Object.keys(parts).reduce((a, b) => {
                if (parts[a] === parts[b]) {
                    return (cardRankWithJokers[a] > cardRankWithJokers[b]) ? a : b;
                }
                return parts[a] > parts[b] ? a : b;
            });
            parts[bestUse] += numJokers;
        }
    }
    
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
        default: // high card
            return 'HC';
    }
}

console.log("Part 1 - " + calculateWinngs(input, false));
console.log("Part 2 - " + calculateWinngs(input, true));