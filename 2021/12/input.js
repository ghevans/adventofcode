let input = new Map();

let inputS = `cz-end
cz-WR
TD-end
TD-cz
start-UM
end-pz
kb-UM
mj-UM
cz-kb
WR-start
WR-pz
kb-WR
TD-kb
mj-kb
TD-pz
UM-pz
kb-start
pz-mj
WX-cz
sp-WR
mj-WR`;

inputS.split('\n').forEach(connection => {
    let parts = connection.split('-');
    if (parts[1] !== 'start') {
        if (input.has(parts[0])) {
            let prev = input.get(parts[0])
            prev.push(parts[1]);
            input.set(parts[0], prev)
        } else {
            input.set(parts[0], [parts[1]])
        }
    }
    
    if (parts[0] !== 'start') {
        if (input.has(parts[1])) {
            let prev = input.get(parts[1])
            prev.push(parts[0])
            input.set(parts[1], prev)
        } else {
            input.set(parts[1], [parts[0]])
        }
    }
});

let testInput = new Map();

let test = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;


test.split('\n').forEach(connection => {
    let parts = connection.split('-');
    if (parts[1] !== 'start') {
        if (testInput.has(parts[0])) {
            let prev = testInput.get(parts[0])
            prev.push(parts[1]);
            testInput.set(parts[0], prev)
        } else {
            testInput.set(parts[0], [parts[1]])
        }
    }
    
    if (parts[0] !== 'start') {
        if (testInput.has(parts[1])) {
            let prev = testInput.get(parts[1])
            prev.push(parts[0])
            testInput.set(parts[1], prev)
        } else {
            testInput.set(parts[1], [parts[0]])
        }
    }
});

module.exports = {input, testInput};