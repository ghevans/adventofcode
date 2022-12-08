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

function buildTree(commands) {
    let currentNode = new Command('/', 0, null);
    let tree = {};
    let dirs = ['/'];
    tree[currentNode.name] = currentNode;
    
    commands.forEach(command => {
        let parts = command.split(' ');
        if (command === '$ cd /') {
            currentNode = tree['/'];
        } else if (command === '$ cd ..') {
            currentNode = tree[currentNode.parent];
        } else if (command.startsWith('$ cd')) {
            currentNode = tree[currentNode.name+'.'+parts[2]];
        } else if (command === '$ ls') {
            // do nothing
        } else {
            let size = (parts[0] === 'dir') ? 0 : Number(parts[0]);
            let key = `${currentNode.name}.${parts[1]}`;

            if (size === 0) { dirs.push(key)}
            tree[key] = new Command(key, size, currentNode.name);
            currentNode.addChild(key);
        }    
    });

    return [tree, dirs];
}

function part1(input) {
    let [tree, dirs] = buildTree(input.split('\n'));

    let dirSize = dirs.map(dir => {
        return {
            dir: dir,
            size: getDirSize(tree, tree[dir], 0)
        }
    })
    .filter(dir => dir.size <= 100000)
    .reduce((a,b) => a + b.size, 0);

    return dirSize;
}

function getDirSize(tree, currentNode, currentSize) {
    if (currentNode.children.length === 0) {
        return currentSize + currentNode.size
    }

    for(child of currentNode.children) {
        currentSize = getDirSize(tree, tree[child], currentSize);
    }

    return currentSize;
}

function part2(input) {
    return "tbd";
}

console.log("Part 1 - " + part1(input));
// console.log("Part 2 - " + part2(input));