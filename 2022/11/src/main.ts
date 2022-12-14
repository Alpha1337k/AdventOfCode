import * as fs from 'fs';
import { exit } from 'process';

var values: number[][] = [];

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var map: number[][] = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		
		map.push(e.replace('S', '`').replace('E', '{').split('').map(x => x.charCodeAt(0) - 97));
		values.push(new Array(map[i].length).fill(Infinity));
	}

	var pos = [map.findIndex(x => x.find(z => z == -1)), map.find(x => x.find(z => z == -1))?.findIndex(z => z == -1)] as number[];
	var endPos = [map.findIndex(x => x.find(z => z == 26)), map.find(x => x.find(z => z == 26))?.findIndex(z => z == 26)] as number[];
	if (!pos)
		return;

	values[pos[0]][pos[1]] = 0;
	calculateValue(map, values, pos);

	console.log(endPos, values[endPos[0]][endPos[1]])

} 

function calculateValue(map: number[][], values: number[][], pos: number[]) {
	for (let y = -1; y < 2; y++) {
		for (let x = -1; x < 2; x++) {
			if ((y == 0 && x == 0) || (x != 0 && y != 0))
				continue;
			if (map[pos[0] + y] && map[pos[0] + y][pos[1] + x] != undefined && map[pos[0] + y][pos[1] + x] - map[pos[0]][pos[1]] < 2) {
				if (values[pos[0] + y][pos[1] + x] > values[pos[0]][pos[1]] + 1) {
					values[pos[0] + y][pos[1] + x] = values[pos[0]][pos[1]] + 1;
					calculateValue(map, values, [pos[0] + y, pos[1] + x]);
				}
			}
		}
	}
}

function calculateValueV2(map: number[][], values: number[][], pos: number[]) {
	for (let y = -1; y < 2; y++) {
		for (let x = -1; x < 2; x++) {
			if ((y == 0 && x == 0) || (x != 0 && y != 0))
				continue;
			if (map[pos[0] + y] && map[pos[0] + y][pos[1] + x] != undefined && map[pos[0] + y][pos[1] + x] - map[pos[0]][pos[1]] > -2) {
				if (values[pos[0] + y][pos[1] + x] > values[pos[0]][pos[1]] + 1) {
					values[pos[0] + y][pos[1] + x] = values[pos[0]][pos[1]] + 1;
					calculateValueV2(map, values, [pos[0] + y, pos[1] + x]);
				}
			}
		}
	}
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var map: number[][] = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		
		map.push(e.replace('S', '`').replace('E', '{').split('').map(x => x.charCodeAt(0) - 97));
		values.push(new Array(map[i].length).fill(Infinity));
	}

	var pos = [map.findIndex(x => x.find(z => z == 26)), map.find(x => x.find(z => z == 26))?.findIndex(z => z == 26)] as number[];
	if (!pos)
		return;

	values[pos[0]][pos[1]] = 0;
	calculateValueV2(map, values, pos);


	var shortest = Infinity;
	for (let y = 0; y < map.length; y++) {
		const e = map[y];
		for (let x = 0; x < e.length; x++) {
			if (e[x] == 0 && values[y][x] < shortest)
				shortest = values[y][x];
		}
	}
	console.log(shortest);
} 

ex01();