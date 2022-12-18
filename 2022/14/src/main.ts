import * as fs from 'fs';
import { exit } from 'process';


function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var gridPoints = [];
	var limits = [Infinity, -Infinity];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ').filter(x => x.search('=') != -1).map(x => parseInt(x.split('=')[1]));

		const diff = Math.abs(e[0] - e[2]) + Math.abs(e[1] - e[3]);


		gridPoints.push([
			e,
			[e[0], e[1] - diff],
			[e[0], e[1] + diff],
			[e[0] - diff, e[1]],
			[e[0] + diff, e[1]],
		])

		if (e[0] - diff < limits[0])
			limits[0] = e[0] - diff;
		if (e[1] + diff > limits[1])
			limits[1] = e[1] + diff;

	}


	var total = 0;
	for (let i = limits[0] - 1; i < limits[1] + 1; i++) {
		let isEqual = false;
		for (let x = 0; x < gridPoints.length; x++) {
			const e = gridPoints[x];
			if (e[0][2] == i && e[0][3] == 2000000) {
				isEqual = true;
			}
		}
		if (isEqual)
			continue;
		if (pointIntersects([i, 2000000], gridPoints)) {
			total++;
		}
	}
	console.log(total);
}

function pointIntersects(point: number[], grid: number[][][]) {
	for (let x = 0; x < grid.length; x++) {
		const e = grid[x];
		if (e[0 + 1][1] <= point[1] && e[1 + 1][1] >= point[1]) {
			const diff = Math.abs(e[0][0] - e[0][2]) + Math.abs(e[0][1] - e[0][3]);

			const width = diff - Math.abs(e[0][1] - point[1]);


			if (e[0][0] - width <= point[0] && e[0][0] + width >= point[0])
				return true;
		}
	}

	return false;
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var gridPoints = [];
	var limits = [Infinity, -Infinity];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ').filter(x => x.search('=') != -1).map(x => parseInt(x.split('=')[1]));

		const diff = Math.abs(e[0] - e[2]) + Math.abs(e[1] - e[3]);

		gridPoints.push([
			e,
			[e[0], e[1] - diff],
			[e[0], e[1] + diff],
			[e[0] - diff, e[1]],
			[e[0] + diff, e[1]],
		])

		if (e[0] - diff < limits[0])
			limits[0] = e[0] - diff;
		if (e[1] + diff > limits[1])
			limits[1] = e[1] + diff;
	}


	var found = [];
	for (let y = 0; y <= 4000000; y++) {
		for (let x = 0; x <= 4000000; x++) {
			const rv = pointIntersects2([x, y], gridPoints);
			if (rv === false) {
				found.push([x, y]);
				break;
			} else {
				x = rv;
			}
		}

	}
	console.log(found.map(x => x[0] * 4000000 + x[1]));
}

function pointIntersects2(point: number[], grid: number[][][]) {
	for (let x = 0; x < grid.length; x++) {
		const e = grid[x];
		if (e[0 + 1][1] <= point[1] && e[1 + 1][1] >= point[1]) {
			const diff = Math.abs(e[0][0] - e[0][2]) + Math.abs(e[0][1] - e[0][3]);

			const width = diff - Math.abs(e[0][1] - point[1]);

			if (e[0][0] - width <= point[0] && e[0][0] + width >= point[0])
				return e[0][0] + width;
		}
	}

	return false;
}


ex02();
