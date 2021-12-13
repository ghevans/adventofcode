const _ = require('lodash');
const {input, inst, testInput, testInst} = require('./input');


function buildPaper(points) {
    let maxX = Math.max(..._.map(points, point => point[0]));
    let maxY = Math.max(..._.map(points, point => point[1]));
    let paper = [...Array(maxY+1)].map(x=>Array(maxX+1));

    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            paper[y][x] = '.';
        }
    }
    for (point of points) {
        paper[point[1]][point[0]] = '#'
    }
    
    return paper;    
}

function foldPaper(points, rules, count) {
    let pointSet = new Set();
    for (let i = 0; i < count; i++) {
        let rule = rules[i];
        let newPoints = [];

        let foldLine = Number(rule[1]);
        switch(rule[0]) {
            case 'y':
                for (point of points) {
                    if (point[1] > foldLine) {
                        newPoints.push([point[0],point[1]-(point[1]-foldLine)*2]);
                    } else {
                        newPoints.push(point);
                    }
                }
                break;
            case 'x':
                for (point of points) {
                    if (point[0] > foldLine) {
                        newPoints.push([point[0]-(point[0]-foldLine)*2,point[1]]);
                    } else {
                        newPoints.push(point);
                    }
                }
                break;
        }

        for (point of newPoints) {
            pointSet.add(`${point[0]},${point[1]}`);
        }
        points = newPoints;
    }

    if(count > 1) {
        print(buildPaper(points));
    }
    
    return pointSet.size;
}

function print(paper) {
    let output = "";
    for (let y = 0; y < paper.length; y++) {
        let row = "";
        for (let x = 0; x < paper[0].length; x++) {
            row += `${paper[y][x]} `;
        }
        output += `${row}\n`;
    }
    console.log(output)
}

console.log("Part 1 - " + foldPaper(input, inst, 1));
console.log("Part 2 - " + foldPaper(input, inst, inst.length));