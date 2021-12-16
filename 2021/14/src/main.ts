import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var grid: number[][] = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < e.length; x++) {
			const elem = e[x];
			topush.push(parseInt(elem));
		}
		grid.push(topush);
	}

	var manhattan = Math.abs(0 - (grid.length - 1))+ Math.abs(0 - (grid.length - 1));
	var checkedpos: number[][] = [];
	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		checkedpos.push(Array(grid.length).fill(0));
	}
	grid[0][0] = 10;
	checker(grid, checkedpos);
}

function getnext(checkedpos:number[][]) {
	var canidates = [];
	for (let i = 0; i < checkedpos.length; i++) {
		const e = checkedpos[i];
		for (let x = 0; x < e.length; x++) {
			const element = e[x];
			if ((element != 0  && x + i != 0) && (e[x + 1] == 0 || (i + 1 < checkedpos.length &&checkedpos[i + 1][x] == 0)))
				canidates.push([i, x]);
		}
	}
	if (!canidates.length)
		return undefined;
	canidates.sort((a, b) => {
		return checkedpos[a[0]][a[1]] - checkedpos[b[0]][b[1]];
	})
	return canidates[0];
}

function getneigbours(pos: number[], grid: number[][]) {
	var rv = [];
	if (pos[0] - 1 >= 0 && grid[pos[0] - 1][pos[1]] != 0)
		rv.push(grid[pos[0] - 1][pos[1]]);
	if (pos[0] + 1 < grid.length && grid[pos[0] + 1][pos[1]] != 0)
		rv.push(grid[pos[0] + 1][pos[1]]);
	if (pos[1] - 1 >= 0 && grid[pos[0]][pos[1] - 1] != 0)
		rv.push(grid[pos[0]][pos[1] - 1]);
	if (pos[1] + 1 < grid.length && grid[pos[0]][pos[1] + 1] != 0)
		rv.push(grid[pos[0]][pos[1] + 1]);
	rv.sort((a, b) => { return a -b });
	return rv[0];
}

function checker(grid:number[][], checkedpos: number[][]) {
	var pos : number[] | undefined = [0,0];

	checkedpos[0][0] = 1;
	while (pos != undefined)
	{
		if (checkedpos[pos[0]][pos[1] + 1] == 0)
		{
			var toadd =	getneigbours([pos[0], pos[1] + 1], checkedpos);
			checkedpos[pos[0]][pos[1] + 1] = grid[pos[0]][pos[1] + 1] + toadd;
		}
		if (pos[0] + 1 < grid.length && checkedpos[pos[0] + 1][pos[1]] == 0)
		{
			var toadd =	getneigbours([pos[0] + 1, pos[1]], checkedpos);

			checkedpos[pos[0] + 1][pos[1]] = grid[pos[0] + 1][pos[1]] + toadd;
		}
		pos = getnext(checkedpos);
	}
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var grid: number[][] = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < e.length; x++) {
			const elem = e[x];
			topush.push(parseInt(elem));
		}
		grid.push(topush);
	}

	var manhattan = Math.abs(0 - (grid.length - 1))+ Math.abs(0 - (grid.length - 1));
	var checkedpos: number[][] = [];
	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		checkedpos.push(Array(grid.length).fill(0));
	}
	grid[0][0] = 1;
	checker(grid, checkedpos);
	for (let i = 0; i < checkedpos.length; i++) {
		const e = checkedpos[i];
		console.log(e.join(","));
	}
}


function increase_map(grid:number [][]) {
	var oldwidth = grid.length * 5 - grid.length;
	for (let i = 0; i < oldwidth; i++) {
		const e = grid[i];
		var topush = [];
		for (let x = 0; x < grid[i].length; x++) {
			if (grid[i][x] + 1 == 10)
				topush.push(1);
			else
				topush.push(grid[i][x] + 1);
		}
		grid.push(topush);
	}

	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		for (let x = 0; x < oldwidth; x++) {
			if (grid[i][x] + 1 == 10)
				grid[i].push(1);
			else
				grid[i].push(grid[i][x] + 1);
		}
	}

	return grid;
}

ex01("big.txt");