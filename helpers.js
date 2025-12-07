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

const getAdjacentByWeight = function(map, y, x, hueristic) {
    let adj = {};
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined && hueristic(map, y, x, hueristic)) {
            adj[`${y+dy[i]},${x+dx[i]}`] = Number(next)
        }
    }
    return adj;
}

const getAdjacentLocs = function(map, y, x, yLoops, xLoops, infiniteMap) {
    let adj = [];
    let dy = [0,-1,0,1] // l,u,r,d
    let dx = [-1,0,1,0] // l,u,r,d
    for(let i = 0; i < 4; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined) {
            adj.push([y+dy[i], x+dx[i], yLoops, xLoops]);
        } else if (infiniteMap) {
            switch (i) {
                case 0: // left
                adj.push([y, map[0].length-1, yLoops, xLoops-1]);
                break;
                case 1: // up
                adj.push([map.length-1, x, yLoops-1, xLoops]);
                break;
                case 2: // right
                adj.push([y, 0, yLoops, xLoops+1]);
                break;
                case 3: // down
                adj.push([0, x, yLoops+1, xLoops]);
                break;
            }
        }
    }
    return adj;
}

const getAllNeighbors = function(map, y, x) {
    let adj = [];
    let dy = [0,-1,0,1,-1,-1,1,1] // l,u,r,d,ul,ur,dl,dr
    let dx = [-1,0,1,0,-1,1,-1,1] // l,u,r,d,ul,ur,dl,dr
    for(let i = 0; i < 8; i++) {
        let next = map[y+dy[i]]?.[x+dx[i]];
        if(next !== undefined) {
            adj.push(next);
        }
    }
    return adj;
}

module.exports = {print, rotate90, rotate180, rotate270, getAdjacentByWeight, getAdjacentLocs, getAllNeighbors};