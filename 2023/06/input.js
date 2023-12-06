let input = parse(`Time:        58     81     96     76
Distance:   434   1041   2219   1218`);

let testInput = parse(`Time:      7  15   30
Distance:  9  40  200`);

function parse(input) {
    let [time, dist] = input.split('\n');
    return {
        times: time.split(':')[1].split(' ').filter(n => parseInt(n)).map(Number),
        dists: dist.split(':')[1].split(' ').filter(n => parseInt(n)).map(Number)
    }
}

module.exports = {input, testInput};
