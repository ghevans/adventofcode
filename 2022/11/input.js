let input = {
    0: {
        items: [91,66],
        op: '*',
        opVal: 13,
        test: 19,
        ifTrue: 6,
        ifFalse: 2,
        inspected: 0
    },
    1: {
        items: [78,97,59],
        op: '+',
        opVal: 7,
        test: 5,
        ifTrue: 0,
        ifFalse: 3,
        inspected: 0
    },
    2: {
        items: [57, 59, 97, 84, 72, 83, 56, 76],
        op: '+',
        opVal: 6,
        test: 11,
        ifTrue: 5,
        ifFalse: 7,
        inspected: 0
    },
    3: {
        items: [81, 78, 70, 58, 84],
        op: '+',
        opVal: 5,
        test: 17,
        ifTrue: 6,
        ifFalse: 0,
        inspected: 0
    },
    4: {
        items: [60],
        op: '+',
        opVal: 8,
        test: 7,
        ifTrue: 1,
        ifFalse: 3,
        inspected: 0
    },
    5: {
        items: [57, 69, 63, 75, 62, 77, 72],
        op: '*',
        opVal: 5,
        test: 13,
        ifTrue: 7,
        ifFalse: 4,
        inspected: 0
    },
    6: {
        items: [73, 66, 86, 79, 98, 87],
        op: '*',
        opVal: -1,
        test: 3,
        ifTrue: 5,
        ifFalse: 2,
        inspected: 0
    },
    7: {
        items: [95, 89, 63, 67],
        op: '+',
        opVal: 2,
        test: 2,
        ifTrue: 1,
        ifFalse: 4,
        inspected: 0
    }
};

let testInput = {
    0: {
        items: [79,98],
        op: '*',
        opVal: 19,
        test: 23,
        ifTrue: 2,
        ifFalse: 3,
        inspected: 0
    },
    1: {
        items: [54,65,75,74],
        op: '+',
        opVal: 6,
        test: 19,
        ifTrue: 2,
        ifFalse: 0,
        inspected: 0
    },
    2: {
        items: [79,60,97],
        op: '*',
        opVal: -1,
        test: 13,
        ifTrue: 1,
        ifFalse: 3,
        inspected: 0
    },
    3: {
        items: [74],
        op: '+',
        opVal: 3,
        test: 17,
        ifTrue: 0,
        ifFalse: 1,
        inspected: 0
    }
};

module.exports = {input, testInput};