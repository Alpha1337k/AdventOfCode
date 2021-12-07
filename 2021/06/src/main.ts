import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var unparsedc = datastr[0].split(',');
	var crabs = [];

	for (let index = 0; index < unparsedc.length; index++) {
		const element = unparsedc[index];
		crabs.push(parseInt(element));
	}
	crabs.sort((a, b) => { return a - b;});
	var middle = 0;
	for (let i = 0; i < crabs.length; i++) {
		const e = crabs[i];
		middle += e;
	}

	
	var best = {p: 0, fuel: 10000000000}
	for (let pos = 0; pos < crabs[crabs.length - 1]; pos++) {
		var fuelcount = 0;
		for (let i = 0; i < crabs.length; i++) {
			const e = crabs[i];
			fuelcount += Math.abs(e - pos);
		}
		if (fuelcount < best.fuel)
			best = {p: pos, fuel: fuelcount};
	}
	console.log(best);
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var unparsedc = datastr[0].split(',');
	var crabs = [];

	for (let index = 0; index < unparsedc.length; index++) {
		const element = unparsedc[index];
		crabs.push(parseInt(element));
	}
	crabs.sort((a, b) => { return a - b;});
	var middle = 0;
	for (let i = 0; i < crabs.length; i++) {
		const e = crabs[i];
		middle += e;
	}
	
	var best = {p: 0, fuel: 10000000000}
	for (let pos = 0; pos < crabs[crabs.length - 1]; pos++) {
		var fuelcount = 0;
		for (let i = 0; i < crabs.length; i++) {
			const e = crabs[i];
			var steps = Math.abs(e - pos);
			for (let x = 0; x < steps; x++) {
				fuelcount += x + 1;
			}
		}
		if (fuelcount < best.fuel)
			best = {p: pos, fuel: fuelcount};
	}
	console.log(best);

}

// ex00("test.txt");
ex01("input.txt");