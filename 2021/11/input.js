let input = `6636827465
6774248431
4227386366
7447452613
6223122545
2814388766
6615551144
4836235836
5334783256
4128344843`.split('\n').map(line => line.split('').map(Number));

let testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n').map(line => line.split('').map(Number));

// testInput = `11111
// 19991
// 19191
// 19991
// 11111`.split('\n').map(line => line.split('').map(Number));

module.exports = {input, testInput};