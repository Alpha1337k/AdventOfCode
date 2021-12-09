import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');
	var points = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < datastr[i].length; x++) {
			const elem = datastr[i][x];
			topush.push(parseInt(elem));
		}
		points.push(topush);
	}

	console.log(points);
	var lowpoints = [];

	for (let i = 0; i < points.length; i++) {
		const element = points[i];
		for (let x = 0; x < points[i].length; x++) {
			const elem = points[i][x];
			if (( x==0 || points[i][x - 1] > elem) && (x == points[i].length - 1 || points[i][x + 1] > elem)  && 
				(i == 0 || points[i - 1][x] > elem) && (i == points.length-1 || points[i + 1][x] > elem))
				lowpoints.push(elem)
		}
	}
	var result = 0;
	for (let i = 0; i < lowpoints.length; i++) {
		const e = lowpoints[i];
		result += 1 + e;
	}
	console.log(lowpoints, result);
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');
	var points = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		var topush = [];
		for (let x = 0; x < datastr[i].length; x++) {
			const elem = datastr[i][x];
			topush.push(parseInt(elem));
		}
		points.push(topush);
	}

	console.log(points);
	var lowpoints = [];

	for (let i = 0; i < points.length; i++) {
		const element = points[i];
		for (let x = 0; x < points[i].length; x++) {
			const elem = points[i][x];
			if (( x==0 || points[i][x - 1] > elem) && (x == points[i].length - 1 || points[i][x + 1] > elem)  && 
				(i == 0 || points[i - 1][x] > elem) && (i == points.length-1 || points[i + 1][x] > elem))
				lowpoints.push([i, x]);
		}
	}
	console.log(lowpoints);
	var results = [];

	for (let i = 0; i < lowpoints.length; i++) {
		const e = lowpoints[i];
		let sval = points[e[0]][e[1]];
		points[e[0]][e[1]] = -11;
		const res = calculateBasin(e, points, sval);
		results.push(res);
	}
	results.sort((a, b)=> {return b- a;});

	console.log(results[0]* results[1] * results[2]);
}

function calculateBasin(start: number[], points: number[][], sval: number): number {
	let rv = 1;

	// console.log("Sval: ", sval);
	if (sval == 9)
		return 0;
	if (start[0] - 1 >= 0 && points[start[0] - 1][start[1]] >= sval + 1)
	{
		let curval = points[start[0] - 1][start[1]];
		// console.log('top'+ curval);
		points[start[0] - 1][start[1]] = -11;
		rv += calculateBasin([start[0] - 1, start[1]], points, curval);
	}
	if (start[0] + 1 < points.length && points[start[0] + 1][start[1]] >= sval + 1)
	{
		let curval = points[start[0] + 1][start[1]];
		// console.log('down' + curval);
		points[start[0] + 1][start[1]] = -11;
		rv += calculateBasin([start[0] + 1, start[1]], points, curval);
	}
	if (start[1] - 1 >= 0 &&points[start[0]][start[1] - 1] >= sval + 1)
	{
		let curval = points[start[0]][start[1] - 1];
		points[start[0]][start[1] - 1] = -11;
		// console.log('left'+ curval);
		rv += calculateBasin([start[0], start[1] - 1], points, curval);
	}
	if (start[1] + 1 < points[start[0]].length &&points[start[0]][start[1] + 1] >= sval + 1)
	{
		let curval = points[start[0]][start[1] + 1];
		// console.log('right'+ curval);
		points[start[0]][start[1] + 1] = -11;
		rv += calculateBasin([start[0], start[1] + 1], points, curval);
	}
	// console.log("bb");

	return rv;
}

ex01("input.txt");