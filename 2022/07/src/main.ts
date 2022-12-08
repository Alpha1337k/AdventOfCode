import * as fs from 'fs';

function checkDir(map:number[][], startX: number, startY: number, startD: number, dir: number[]) {
	const pos = [startY, startX];
	pos[0] += dir[0];
	pos[1] += dir[1];
	while (pos[0] >= 0 && pos[0] < map.length && pos[1] >= 0 && pos[1] < map[0].length ) {
		if (startD <= map[pos[0]][pos[1]])
			return false;
		pos[0] += dir[0];
		pos[1] += dir[1];
	}
	return true;
}

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var map: number[][] = [];
	for (let i = 0; i < datastr.length; i++) {
		map.push([]);		
	}

	for (let y = 0; y < datastr.length; y++) {
		const e = datastr[y];
		for (let x = 0; x < e.length; x++) {
			const ele = e[x];
			map[y].push(parseInt(ele));
		}
	}

	var total = 0;
	for (let y = 0; y < map.length; y++) {
		const e = map[y];
		for (let x = 0; x < e.length; x++) {
			const xx = e[x];
			// t b r l
			var res = [0, 0, 0, 0];
			if (checkDir(map, x, y, map[y][x], [-1, 0]))
				res[0] = 1;
			else if (checkDir(map, x, y, map[y][x], [1, 0]))
				res[1] = 1;
			else if (checkDir(map, x, y, map[y][x], [0, 1]))
				res[2] = 1;
			else if (checkDir(map, x, y, map[y][x], [0, -1]))
				res[3] = 1;
			total += res.reduce((p, x) => x + p, 0);
		}
	}

	console.log(map, total);


}

function checkDirLen(map:number[][], startX: number, startY: number, startD: number, dir: number[]) {
	const pos = [startY, startX];
	var rv = 1;
	pos[0] += dir[0];
	pos[1] += dir[1];
	while (pos[0] >= 0 && pos[0] < map.length && pos[1] >= 0 && pos[1] < map[0].length ) {
		if (startD <= map[pos[0]][pos[1]])
			return rv;
		pos[0] += dir[0];
		pos[1] += dir[1];
		rv++;
	}
	return rv - 1;
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var map: number[][] = [];
	for (let i = 0; i < datastr.length; i++) {
		map.push([]);		
	}

	for (let y = 0; y < datastr.length; y++) {
		const e = datastr[y];
		for (let x = 0; x < e.length; x++) {
			const ele = e[x];
			map[y].push(parseInt(ele));
		}
	}

	var results = [];
	for (let y = 0; y < map.length; y++) {
		const e = map[y];
		for (let x = 0; x < e.length; x++) {
			const xx = e[x];
			// t b r l
			var res = [0, 0, 0, 0];
			res[0] = checkDirLen(map, x, y, map[y][x], [-1, 0]);
			res[1] = checkDirLen(map, x, y, map[y][x], [1, 0]);
			res[2] = checkDirLen(map, x, y, map[y][x], [0, 1]);
			res[3] = checkDirLen(map, x, y, map[y][x], [0, -1]);
			results.push(res.reduce((p, x) => x * p, 1));
		}
	}

	results = results.sort((a, b) => b - a);

	console.log(map, results);


}

ex02();