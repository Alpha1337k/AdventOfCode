import * as fs from 'fs';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	let max = {
		i: 0,
		val: 0,
	}

	let val = 0;
	
	for (let i = 0; i < datastr.length - 1; i++) {
		if (datastr[i] != "") {
			val += parseInt(datastr[i]);
		} else {
			if (val > max.val)
				max = {
					i,
					val
				}
			val = 0;
		}
	}

	console.log(max);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	const res = [];

	let val = 0;
	
	for (let i = 0; i < datastr.length - 1; i++) {
		if (datastr[i] != "") {
			val += parseInt(datastr[i]);
		} else {

			res.push(val);
			val = 0;
		}
	}

	res.sort((a, b) => a - b);

	const total = res.slice(res.length - 3).reduce((old, x) => old + x, 0);

	console.log(total);
}

ex02()