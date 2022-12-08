const _ = require('lodash');
const {input, testInput} = require('./input');

class Command {
    constructor(name, size, parent) {
        this.name = name,
        this.size = size,
        this.parent = parent,
        this.children = new Array();
    }

    addChild(child) {
        this.children.push(child);
    }
}

function part1(input) {
    let commands = input.split('\n');
    console.log(commands)

    let currentNode = new Command('/', 0, null);
    let tree = {};
    tree[currentNode.name] = currentNode;
    console.log(tree);

    commands.forEach(command => {
        let parts = command.split(' ');
        console.log(command);
        if (command === '$ cd /') {
            currentNode = tree['/'];
        } else if (command === '$ cd ..') {
            currentNode = tree[currentNode.parent];
        } else if (command.startsWith('$ cd')) {
            currentNode = tree[parts[2]];
        } else if (command === '$ ls') {
            // do nothing
        } else {
            let size = (parts[0] === 'dir') ? 0 : Number(parts[0]);
            tree[parts[1]] = new Command(parts[1], size, currentNode.name);
            currentNode.addChild(parts[1]);
        }
    });
    console.log(tree);
    return "tbd";
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(testInput));
// console.log("Part 2 - " + part2(input));