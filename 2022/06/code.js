const _ = require('lodash');
const {input, testInput} = require('./input');

function findMarker(buffer, size) {
    let pos = 0;
    let marker = buffer.slice(pos,size);

    while (hasShared(marker)) {
        pos++;
        marker = buffer.slice(pos,size+pos);
    }
    
    return pos+size;
}

function hasShared(marker) {
    return new Set(marker).size !== marker.length;
}

console.log("Part 1 - " + findMarker(input, 4));
console.log("Part 2 - " + findMarker(input, 14));