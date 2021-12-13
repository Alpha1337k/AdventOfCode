import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var coords = [];

	let i = 0;
	let maxy = 0;
	let maxx = 0;
	for (; i < datastr.length; i++) {
		if (datastr[i].length == 0)
			break;
		const e = datastr[i].split(',');
		coords.push([parseInt(e[0]), parseInt(e[1])]);
		if (parseInt(e[0]) > maxx)
			maxx = parseInt(e[0]);
		if (parseInt(e[1]) > maxy)
			maxy = parseInt(e[1]);
	}
	let grid = Array(maxy + 1);
	for (let z = 0; z < maxy + 1; z++) {
		grid[z] = Array(maxx + 1).fill(0);
	}
	console.log(maxx, maxy);
	
	for (let x = 0; x < coords.length; x++) {
		const e = coords[x];
		console.log(e);
		grid[e[1]][e[0]] = 1;
	}
	

	i++;
	for (; i < datastr.length; i++)
	{
		const e = datastr[i].split(' ')[2].split("=");

		if (e[0] == 'y')
		{
			foldVertial(grid, parseInt(e[1]));
			grid.slice(0, parseInt(e[1]));
		}
		else
		{
			foldHorizontal(grid, parseInt(e[1]));
		}
		// break; ex00
	}
	let res = 0;
	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		for (let x = 0; x < e.length; x++) {
			const aa = e[x];
			if (aa == 1)
				res++;
		}
	}

	console.log(grid.join('\n'));
	console.log(res);

}

function foldVertial(grid:number[][], idx: number) {

	let postoadd = idx - 1;
	for (let i = idx + 1; i < grid.length; i++) {
		const element = grid[i];
		for (let x = 0; x < element.length; x++) {
			const e = grid[i][x];
			if (e == 0)
				continue;
			grid[postoadd][x] = e;
			grid[i][x] = 0;
		}
		postoadd--;
	}
}

function foldHorizontal(grid:number[][], idx: number) {
	for (let i = 0; i < grid.length; i++) {
		let postoadd = idx - 1;
		const element = grid[i];
		for (let x = idx + 1; x < element.length; x++, postoadd--) {
			const e = grid[i][x];
			
			if (e == 0)
				continue;	
			grid[i][postoadd] = e;
			grid[i][x] = 0;
		}
	}
}

// ex00("test.txt");
ex00("input.txt");