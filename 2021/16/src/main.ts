import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var unparsed = datastr[0].split(" ");

	var area = [];

	area.push([parseInt(unparsed[0].split("..")[0]), parseInt(unparsed[1].split("..")[1])]);
	area.push([parseInt(unparsed[0].split("..")[1]), parseInt(unparsed[1].split("..")[0])]);
	var maxy = 0;

	var res = calculate(area, [6,9]);
	for (let i = 0; i < 300; i++) {
		for (let x = 0; x < 300; x++) {

			var res = calculate(area, [x, i]);
			if (res.hit && res.maxy > maxy)
				maxy = res.maxy;
		}		
	}
	console.log(maxy);
}

function calculate(area: number[][], velocity: number[]) {
	var pos = [0, 0];
	var maxy = 0;
	while (pos[0] <= area[1][0] && pos[1] >= area[1][1]) {
		if (pos[0] >= area[0][0] && pos[1] <= area[0][1])
		{
			return {hit: true, maxy};
		}
		pos[0] += velocity[0];
		pos[1] += velocity[1];
		if (pos[1] > maxy)
			maxy = pos[1];
		velocity[1]--;
		if (velocity[0] > 0)
			velocity[0]--;
	}
	if (pos[0] >= area[0][0] && pos[0] <= area[1][0] && pos[1] <= area[0][1] && pos[1] >= area[1][1])
		return {hit: true, maxy};
	return {hit: false, maxy};
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var unparsed = datastr[0].split(" ");

	var area = [];
	var matches: number[][] = [];

	area.push([parseInt(unparsed[0].split("..")[0]), parseInt(unparsed[1].split("..")[1])]);
	area.push([parseInt(unparsed[0].split("..")[1]), parseInt(unparsed[1].split("..")[0])]);
	var maxy = 0;

	var res = calculate(area, [6,9]);
	for (let i = -300; i < 300; i++) {
		for (let x = 0; x < 300; x++) {

			var res = calculate(area, [x, i]);
			if (res.hit && res.maxy > maxy)
				maxy = res.maxy;
			if (res.hit)
			{
				matches.push([x, i]);
			}
		}		
	}
	var uniq = [...new Set(matches)];

	console.log(maxy, uniq.length);
}

ex01("input.txt");