const _ = require('lodash');
const {input, testInput} = require('./input');

let h2b = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`.split('\n')
         .map(line => line.split(' = '))
         .reduce((map, item) => map.set(item[0], item[1]), new Map());

let b2h = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`.split('\n')
         .map(line => line.split(' = '))
         .reduce((map, item) => map.set(item[1], item[0]), new Map());

class Packet {
    constructor(version, type, value, subpackets) {
        this.version = version;
        this.type = type;
        this.value = value;
        this.subpackets = [...subpackets];
    }
}         

function part1(hex) {
    let packets = [];
    let transmission = hexToBin(hex).split('');

    while (transmission.length > 0) {
        let packet = parsePacket(transmission);
        packets.push(packet);
        console.log(packet);
    }
            
    return "tbd";
}


function parsePacket(transmission) {
    console.log(`parsePacket: ${transmission.join('')}`)
    let version = parseInt(transmission.splice(0,3).join(''), 2);
    let type = parseInt(transmission.splice(0,3).join(''), 2);
    console.log(`version: ${version} || type: ${type}`);

    let packet = new Packet(version, type, 0, []);
    if (type === 4) {
        packet.value = getLiteralPacket(transmission);;
    } else {
        let subpacket = getOperatorPacket(transmission);
        packet.subpackets.push(subpacket);
    }
    console.log(`Parsed Packet is:`)
    console.log(packet)
    return packet;
}

function parseSubPacket(transmission) {
    console.log(`parseSubPacket: ${transmission.join('')}`)
    let version = parseInt(transmission.splice(0,3).join(''), 2);
    let type = parseInt(transmission.splice(0,3).join(''), 2);
    console.log(`version: ${version} || type: ${type}`);

    let packet = new Packet(version, type, 0, []);
    if (type === 4) {
        packet.value = getLiteralPacket(transmission);;
    } else {
        let subpacket = getOperatorPacket(transmission);
        packet.subpackets.push(subpacket);
    }
    console.log(`Parsed Packet is:`)
    console.log(packet)
    return packet;
}

// check the bit after the operator type
            // if operType == 0
                // grab 15 bits
                // convert that to decimal
                // grab that number of additional bits which is the subpacket
            // else 
                // grab 11 bits
                // that is the number of subpackets contained in this packet
function getOperatorPacket(transmission) {
    console.log(`getOperPacket: ${transmission.join('')}`)
    // let bits = [];
    let operType = Number(transmission.splice(0,1)[0]);
    let packetLength = 7; // version, type, operType
    let i = 0;
    console.log(`operType: ${operType}`)
    while(transmission.length > 0) {
        if (operType === 0) {
            let sizeSubPacket = parseInt(transmission.splice(0,15).join(''), 2);
            packetLength += sizeSubPacket;
            console.log(`fullTransmission: ${transmission.join('')}`)
            let subPacketTransmission = transmission.splice(0, sizeSubPacket);
            console.log(`subPacket: ${subPacketTransmission.join('')}`)
            console.log(`extra: ${transmission.join('')}`)
            console.log(packetLength)
            while(packetLength % 4 !== 0) {
                transmission.splice(0,1);
                packetLength++;
            }
            console.log(`finish: ${transmission.join('')}`);

            // track total length used so far?
            // let subPacket = parsePacket(subPacketTransmission); ///<- good to here on the parsing
            // console.log(`packet coming back from parsePacket is:`)
            // console.log(subPacket);
            // console.log(transmission.join(''))
        } else {
            // oper
            let numSubPacket = parseInt(transmission.splice(0,11), 2);
            console.log('here2')
        }
    }
}

// while true, 
                //grab 5 and check first bit, if 0, set false and grab as many as needed to get entire packet divisible by 4 (including version+type (6))
            //  parseInt('011111100101',2) <== parsing only the non-flag bits of the data packets
function getLiteralPacket(transmission) {
    console.log(`getLitPacket: ${transmission.join('')}`)
    let packetLength = 6;
    let bits = [];
    while (true) {
        let group = transmission.splice(0,5);
        bits.push(...group.splice(1,5))
        packetLength += 5;
        if(group[0] === '0') {
            while(packetLength % 4 !== 0) {
                transmission.splice(0,1);
                packetLength++;
            }
            break;
        }
    }

    return parseInt(bits.join(''), 2);
}

function hexToBin(hex) {
    let out = '';
    for (char of hex) {
        out += h2b.get(char);
    }
    return out;
}

function part2(input) {
    return "tbd";
}

let oper0Packet = '38006F45291200';

console.log("Part 1 - " + part1(oper0Packet));
// console.log("Part 2 - " + part2(input));
