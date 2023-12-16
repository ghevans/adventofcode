const rotate90 = (map) => { return map[0].map((val, index) => map.map(row => row[index]).reverse()); }
const rotate180 = (map) => { return rotate90(rotate90(map)); }
const rotate270 = (map) => { return rotate90(rotate90(rotate90(map))); }

const print = (map) => {
    let out = '';
    for(let y = 0; y < map.length; y++) {
        let row = `${y}:\t`;
        for(let x = 0; x < map[0].length; x++) {
            row += map[y][x];
        }
        out += row + '\n';
    }
    return out;
}

module.exports = {print, rotate90, rotate180, rotate270};