import * as fs from 'fs';

function ex00(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');
	var initstate = datastr[0].split(',');

	var fish = [];

	for (let i = 0; i < initstate.length; i++) {
		const e = initstate[i];
		fish.push(parseInt(e));
	}

	console.log(fish);
	for (let i = 0; i < 80; i++) {
		for (let x = 0; x < fish.length; x++) {
			if (fish[x] == 0)
			{
				fish.push(9);
				fish[x] = 6;
			}
			else
				fish[x]--;
		}
	}
	
	console.log(fish.length);
}

function ex01(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');
	var initstate = datastr[0].split(',');

	var days = Array(9).fill(0);
	
	
	for (let i = 0; i < initstate.length; i++) {
		const e = initstate[i];
		days[parseInt(e)]++;
	}


	var day = 256;
	for (let i = 0; i < day; i++) {
		var newarr = Array(9).fill(0);
		newarr[8] = days[0];
		newarr[7] = days[8];
		newarr[6] = days[7] + days[0];
		newarr[5] = days[6];
		newarr[4] = days[5];
		newarr[3] = days[4];
		newarr[2] = days[3];
		newarr[1] = days[2];
		newarr[0] = days[1];

		days = newarr;
	}
	var res = 0;
	for (let i = 0; i < days.length; i++) {
		res += days[i];
	}
	console.log(res);
}


// ex01("test.txt");
ex01("input.txt");
