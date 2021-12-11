import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var parsedpoints = [];
	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < datastr[i].length; x++) {
			topush.push(parseInt(datastr[i][x]));
		}
		parsedpoints.push(topush);
	}

	for (let c = 0; c < 100; c++) {
		flashed = [];
		for(let y = 0; y < 10; y++)
		{
			for(let x = 0;x < 10; x++)
			{
				if (flashed.find((t) => t[0] == y && t[1] == x) != undefined)
					continue;
				parsedpoints[y][x]++;
				if (parsedpoints[y][x] > 9)
				{
					flashcount++;
					flashed.push([y, x]);
					increaseadjen(parsedpoints, x, y);
					parsedpoints[y][x] = 0;
				}
			}
		}
		clearoverlvl(parsedpoints);
	}
	console.log(flashcount);
}

var flashcount = 0;
var flashed: number[][] = [];

function clearoverlvl(parsedpoints:number[][]) {
	for (let i = 0; i < flashed.length; i++) {
		const e = flashed[i];
		parsedpoints[e[0]][e[1]] = 0;
	}
}

function increaseadjen(parsedpoints: number[][], x: number, y: number) {

	for (let i = 0; i < 3; i++) {
		for (let z = 0; z < 3; z++) {
			if (x - 1 + z < 10 && x - 1 + z >= 0 && y - 1 + i < 10 && y - 1 + i >= 0)
			{
				if (flashed.find((t) => t[0] == y - 1 + i && t[1] == x - 1 + z) != undefined)
					continue;
				parsedpoints[y - 1 + i][x - 1 + z]++
				if (parsedpoints[y - 1 + i][x - 1 + z] > 9)
				{
					flashcount++;
					flashed.push([y - 1 + i, x - 1 + z]);
					increaseadjen(parsedpoints, x - 1 + z, y - 1 + i );
					parsedpoints[y][x] = 0;
				}
			}
		}		
	
	}
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var parsedpoints = [];
	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < datastr[i].length; x++) {
			topush.push(parseInt(datastr[i][x]));
		}
		parsedpoints.push(topush);
	}

	for (let c = 0; c < 400; c++) {
		flashed = [];
		flashcount = 0;
		for(let y = 0; y < 10; y++)
		{
			for(let x = 0;x < 10; x++)
			{
				if (flashed.find((t) => t[0] == y && t[1] == x) != undefined)
					continue;
				parsedpoints[y][x]++;
				if (parsedpoints[y][x] > 9)
				{
					flashcount++;
					flashed.push([y, x]);
					increaseadjen(parsedpoints, x, y);
					parsedpoints[y][x] = 0;
				}
			}
		}
		if (flashcount == 100)
		{
			console.log(c + 1);
			return;
		}
		clearoverlvl(parsedpoints);
	}
}

// ex01("test.txt");
ex01("input.txt");