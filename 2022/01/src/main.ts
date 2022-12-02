import * as fs from 'fs';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	var score = 0;
	for (let i = 0; i < datastr.length; i++) {
		let d = datastr[i].split(" ");
		
		d[1] = String.fromCharCode(d[1].charCodeAt(0) - 23);

		if (d[1] == "A") {
			score += 1;
			if (d[0] == "A")
				score += 3;
			if (d[0] == "C")
				score += 6;
		}
		if (d[1] == "B") {
			score += 2;
			if (d[0] == "B")
				score += 3;
			if (d[0] == "A")
				score += 6;
		}
		if (d[1] == "C") {
			score += 3;
			if (d[0] == "C")
				score += 3;
			if (d[0] == "B")
				score += 6;
		}
		

		console.log(d);

	}

	console.log(score);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	var score = 0;
	for (let i = 0; i < datastr.length; i++) {
		let d = datastr[i].split(" ");
		
		d[1] = String.fromCharCode(d[1].charCodeAt(0) - 23);

		if (d[0] == "A") {
			if (d[1] == "A")
				score += 3;
			if (d[1] == "B")
				score += 1 + 3;
			if (d[1] == "C")
				score += 8;

		}
		if (d[0] == "B") {	
			if (d[1] == "A")
				score += 1;
			if (d[1] == "B")
				score += 2 + 3;
			if (d[1] == "C")
				score += 9;
		}
		if (d[0] == "C") {	
			if (d[1] == "A")
				score += 2;
			if (d[1] == "B")
				score += 3 + 3;
			if (d[1] == "C")
				score += 7;
		}
	}

	console.log(score);
}

ex02()