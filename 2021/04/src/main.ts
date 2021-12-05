import * as fs from 'fs';


function ex00(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var grid: number[][] = [];
	
	var lines = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var na = e.split(" -> ");
		var p1 = na[0].split(',');

		var p2 = na[1].split(',');
	
		lines.push([p1, p2]);
	}

	for (let i = 0; i < 1000; i++) {
		grid.push(new Array(1000).fill(0));
	}

	// console.log(lines);

	for (let i = 0; i < lines.length; i++) {
		const e = lines[i];

		var startX = parseInt(e[0][0]), startY = parseInt(e[0][1]), endX = parseInt(e[1][0]), endY = parseInt(e[1][1]);

		// console.log("-----");
		if (startY != endY && startX != endX)
			continue;

		while (!(startX == endX && startY == endY))
		{
			// console.log(startY, startX, endY, endX);
			grid[startY][startX] += 1;
			if (startX < endX)
				startX++;
			else if (startX > endX)
				startX--;
			if (startY < endY)
				startY++;
			else if (startY > endY)
				startY--;
		}
		// while (!(startX == endX && startY == endY));
		grid[startY][startX] += 1;
	}

	var count = 0;
	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		for (let x = 0; x < e.length; x++) {
			const z = e[x];
			if (z >= 2)
				count++;
		}
	}

	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		console.log(e.join(''));
	}
	console.log(count);

}

function ex01(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var grid: number[][] = [];
	
	var lines = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var na = e.split(" -> ");
		var p1 = na[0].split(',');

		var p2 = na[1].split(',');
	
		lines.push([p1, p2]);
	}

	for (let i = 0; i < 1000; i++) {
		grid.push(new Array(1000).fill(0));
	}

	// console.log(lines);

	for (let i = 0; i < lines.length; i++) {
		const e = lines[i];

		var startX = parseInt(e[0][0]), startY = parseInt(e[0][1]), endX = parseInt(e[1][0]), endY = parseInt(e[1][1]);

		// console.log("-----");
		// if (startY != endY && startX != endX)
		// 	continue;

		while (!(startX == endX && startY == endY))
		{
			// console.log(startY, startX, endY, endX);
			grid[startY][startX] += 1;
			// if (startX == endX || startY == endY)
			{
				if (startX < endX)
					startX++;
				else if (startX > endX)
					startX--;
				if (startY < endY)
					startY++;
				else if (startY > endY)
					startY--;
			}


		}
		// while (!(startX == endX && startY == endY));
		grid[startY][startX] += 1;
	}

	var count = 0;
	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		for (let x = 0; x < e.length; x++) {
			const z = e[x];
			if (z >= 2)
				count++;
		}
	}

	for (let i = 0; i < grid.length; i++) {
		const e = grid[i];
		console.log(e.join(''));
	}
	console.log(count);

}


ex01("input.txt");