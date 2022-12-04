import * as fs from 'fs';


function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var pairs = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(",");

		var top = [

		]
		for (let i = 0; i < e.length; i++) {
			const e2 = e[i].split('-'); 
			top.push(e2.map(x => parseInt(x)));
		}
		pairs.push(top);
	}


	var total = 0;
	for (let i = 0; i < pairs.length; i++) {
		const e = pairs[i];
		if (e[0][0] <= e[1][0] && e[0][1] >= e[1][1] )
			total += 1;
		else if (e[1][0] <= e[0][0] && e[1][1] >= e[0][1] )
			total += 1;
	}
	console.log(total);

}


function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var pairs = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(",");

		var top = [

		]
		for (let i = 0; i < e.length; i++) {
			const e2 = e[i].split('-'); 
			top.push(e2.map(x => parseInt(x)));
		}
		pairs.push(top);
	}


	var total = 0;

	for (let i = 0; i < pairs.length; i++) {
		const e = pairs[i];
		if (e[0][0] >= e[1][0] && e[0][0] <= e[1][1] || e[0][1] >= e[1][0] && e[0][1] <= e[1][1])
			total++;
		else if (e[1][0] >= e[0][0] && e[1][0] <= e[0][1] || e[1][1] >= e[0][0] && e[1][1] <= e[0][1])
			total++;
	}
	console.log(total);

}

ex01();