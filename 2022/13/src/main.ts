import * as fs from 'fs';
import { exit } from 'process';


function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var rocks: {
		[key: string]: number
	} = {};
	var lastY = 0;

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(" -> ").map(x => x.split(',').map(z => parseInt(z)));
		for (let x = 1; x < e.length; x++) {
			const dir = [
				(!!(e[x][0] - e[x - 1][0])) as unknown as number * (e[x][0] - e[x - 1][0] < 0 ? -1 : 1), 
				(!!(e[x][1] - e[x - 1][1])) as unknown as number * (e[x][1] - e[x - 1][1] < 0 ? -1 : 1)];
			let pos = [e[x - 1][0], e[x-1][1]];
			while (pos[0] != e[x][0] || pos[1] != e[x][1]) {
				rocks[`${pos[0]},${pos[1]}`] = 1;
				if (pos[1] > lastY)
					lastY = pos[1];
				pos[0] += dir[0];
				pos[1] += dir[1];
			}
			rocks[`${pos[0]},${pos[1]}`] = 1;
		}
	}

	let fell = false;
	let ca = 0;
	while (!fell) {
		let sand = [500, 0];
		while (sand[1] <= lastY) {
			if (rocks[`${sand[0]},${sand[1] + 1}`] != undefined) {
				if (rocks[`${sand[0] - 1},${sand[1] + 1}`] == undefined) {
					sand[0]--;
					sand[1]++;
				}
				else if (rocks[`${sand[0] + 1},${sand[1] + 1}`] == undefined) {
					sand[0]++;
					sand[1]++;
				} else {
					rocks[`${sand[0]},${sand[1]}`] = 2;
					break;
				}
			} else {
				sand[1]++;
			}
		}
		if (sand[1] >= lastY) {
			break;
		}
		ca++;
	}

	console.log(lastY, rocks, ca);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var rocks: {
		[key: string]: number
	} = {};
	var lastY = 0;
	var xCoords = [Infinity, -Infinity];


	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(" -> ").map(x => x.split(',').map(z => parseInt(z)));
		for (let x = 1; x < e.length; x++) {
			const dir = [
				(!!(e[x][0] - e[x - 1][0])) as unknown as number * (e[x][0] - e[x - 1][0] < 0 ? -1 : 1), 
				(!!(e[x][1] - e[x - 1][1])) as unknown as number * (e[x][1] - e[x - 1][1] < 0 ? -1 : 1)];
			let pos = [e[x - 1][0], e[x-1][1]];
			while (pos[0] != e[x][0] || pos[1] != e[x][1]) {
				rocks[`${pos[0]},${pos[1]}`] = 1;
				if (pos[1] > lastY)
					lastY = pos[1];
				if (pos[0] < xCoords[0])
					xCoords[0] = pos[0];
				if (pos[0] > xCoords[1])
					xCoords[1] = pos[0];
				pos[0] += dir[0];
				pos[1] += dir[1];
			}
			rocks[`${pos[0]},${pos[1]}`] = 1;
		}
	}

	xCoords = [xCoords[0] - 2000, xCoords[1] + 2000];

	for (let x = xCoords[0]; x < xCoords[1]; x++) {
		rocks[`${x},${lastY + 2}`] = 1;
	}

	let fell = false;
	let ca = 0;
	while (rocks[`500,0`] == undefined) {
		let sand = [500, 0];
		while (sand[1] < lastY + 1) {
			if (rocks[`${sand[0]},${sand[1] + 1}`] != undefined) {
				if (rocks[`${sand[0] - 1},${sand[1] + 1}`] == undefined) {
					sand[0]--;
					sand[1]++;
				}
				else if (rocks[`${sand[0] + 1},${sand[1] + 1}`] == undefined) {
					sand[0]++;
					sand[1]++;
				} else {
					break;
				}
			} else {
				sand[1]++;
			}
		}
		rocks[`${sand[0]},${sand[1]}`] = 2;
		ca++;
	}

	console.log(lastY, ca);
}

ex02();
