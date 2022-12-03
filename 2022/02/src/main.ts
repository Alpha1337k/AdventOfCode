import * as fs from 'fs';

function getShared(s1: string, s2: string) {
	for (let i = 0; i < s1.length; i++) {
		const e = s1[i];
		if (s2.indexOf(e) != -1)
			return e;
	}
}

function getShared2(s1: string, s2: string, s3: string) {
	for (let i = 0; i < s1.length; i++) {
		const e = s1[i];
		if (s2.indexOf(e) != -1 && s3.indexOf(e) != -1)
			return e;
	}
}

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var shared = [];
	var total = 0;

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		const data = [
			e.substring(0, e.length / 2),
			e.substring(e.length / 2),
		]

		shared.push(getShared(data[0], data[1]));
	}

	for (let i = 0; i < shared.length; i++) {
		const e = shared[i];

		if (!e)
			continue;
		
			if (e?.charCodeAt(0) > 97)
			total += e?.charCodeAt(0) - 96;
			else
			total += e?.charCodeAt(0) - 65 + 27;
		}
	console.log(total);
}


function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var shared = [];
	var total = 0;

	for (let i = 0; i < datastr.length; i += 3) {
		const e = datastr[i];

		shared.push(getShared2(datastr[i + 0], datastr[i+1], datastr[i + 2]));
	}

	for (let i = 0; i < shared.length; i++) {
		const e = shared[i];

		if (!e)
			continue;
		
			if (e?.charCodeAt(0) > 97)
			total += e?.charCodeAt(0) - 96;
			else
			total += e?.charCodeAt(0) - 65 + 27;
		}
	console.log(total);
}

ex02();