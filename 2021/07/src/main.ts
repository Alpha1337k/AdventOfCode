import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var data = [];
	var signallen = [4, 2, 3, 7];

	for (let i = 0; i < datastr.length; i+= 1) {
		const e = datastr[i];
		var splitted = datastr[i].split(" | ");

		var signals = splitted[0].split(' ');
		var outputval = splitted[1].split(' ');
		
		data.push([signals, outputval]);
	}
	var count = 0;

	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		for (let x = 0; x < e[1].length; x++) {
			const elem = e[1][x];
			if (signallen.find((x) => x == elem.length))
			{
				count++;
			}
		}
	}

	console.log(data, count);
}

function cmp(a:number[], b: number[]) {
	for (let i = 0; i < a.length; i++) {
		if (a[i] != b[i])
			return false;
	}
	return true;
}

function getNumber(numbers:number[]) {
	if (cmp(numbers, [1,1,1,0,1,1,1]) == true)
		return 0;
	if (cmp(numbers, [0,0,1,0,0,1,0])== true)
		return 1;
	if (cmp(numbers, [1,0,1,1,1,0,1])== true)
		return 2;
	if (cmp(numbers, [1,0,1,1,0,1,1])== true)
		return 3;
	if (cmp(numbers, [0,1,1,1,0,1,0])== true)
		return 4;
	if (cmp(numbers, [1,1,0,1,0,1,1])== true)
		return 5;
	if (cmp(numbers, [1,1,0,1,1,1,1])== true)
		return 6;
	if (cmp(numbers, [1,0,1,0,0,1,0])== true)
		return 7;
	if (cmp(numbers, [1,1,1,1,1,1,1])== true)
		return 8;
	if (cmp(numbers, [1,1,1,1,0,1,1])== true)
		return 9;
	console.log("Err!", numbers);
	return -1;
}

function findMiddleOne(data: string[]) {

	var frequency = Array(7).fill(0);

	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		for (let x = 0; x < e.length; x++) {
			const elem = e[x];
			frequency[e.charCodeAt(x) - 97]++;
		}
	}
	var rv= [];
	
	for (let i = 0; i < frequency.length; i++) {
		const e = frequency[i];
		if (e == 7)
			rv.push(String.fromCharCode(i + 97));
	}

	return rv;
}

function findMiddle(data: string[]) {

	var frequency = Array(7).fill(0);

	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		if (e.length != 6)
			continue;
		for (let x = 0; x < e.length; x++) {
			const elem = e[x];
			frequency[e.charCodeAt(x) - 97]++;
		}
	}

	var rv = [];

	for (let i = 0; i < frequency.length; i++) {
		const e = frequency[i];
		if (e == 2)
			rv.push(String.fromCharCode(i + 97));

	}

	return rv;
}


function removeLetter(canidates: string[], execpt: number[], letter: string) {
	for (let i = 0; i < canidates.length; i++) {
		if (execpt.find(x => x === i))
			continue;
		for (let z = 0; z < letter.length; z++) {
			const elem = letter[z];
			
			canidates[i] = canidates[i].replace(elem, '');
		}
	}
}

function removeMatch(str1:string, str2:string) {
	var newstr = '';
	for (let i = 0; i < str1.length; i++) {
		const e = str1[i];
		if (str2.indexOf(e) == -1)
			newstr += e;
	}
	return newstr;
}

function getMatches(str1:string, str2:string) {
	var newstr = '';
	for (let i = 0; i < str1.length; i++) {
		const e = str1[i];
		if (str2.indexOf(e) != -1)
			newstr += e;
	}
	return newstr;
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var data = [];

	for (let i = 0; i < datastr.length; i+= 1) {
		const e = datastr[i];
		var splitted = datastr[i].split(" | ");

		var signals = splitted[0].split(' ');
		var outputval = splitted[1].split(' ');
		
		data.push([signals, outputval]);
	}
	var count = 0;

	for (let i = 0; i < data.length; i++) {
		var segments = Array(7).fill(-1);
		var canidates = ["abcdefg", "abcdefg", "abcdefg", "abcdefg", "abcdefg", "abcdefg", "abcdefg"];

		const e = data[i];
		e[0].sort((a, b) => {return a.length - b.length; });

		var findM = findMiddle(e[0]);

		canidates[3] = findM.join('');
		canidates[4] = findM.join('');
		canidates[2] = findM.join('');
		canidates[2] = getMatches(canidates[2],e[0][0]);
		canidates[5] = removeMatch(e[0][0], canidates[2]);
		removeLetter(canidates, [2, 5], e[0][0]);
		removeLetter(canidates, [0], removeMatch(e[0][1], e[0][0]));
		canidates[0] = removeMatch(e[0][1], e[0][0]);
		canidates[1] = removeMatch(e[0][2], e[0][0]);
		canidates[1] = removeMatch(canidates[1], canidates[3]);
		canidates[6] = removeMatch(canidates[6], canidates[3]);
		canidates[6] = removeMatch(canidates[6], canidates[1]);
		var mid = findMiddleOne(e[0]);
		canidates[3] = getMatches(canidates[4], mid.join(''));
		canidates[4] = removeMatch(canidates[4], canidates[3]);
		var code = 0;
		for (let a = 0; a < e[1].length; a++) {
			const elem = e[1][a];
			var createdNumber = Array(7).fill(0);
			for (let z = 0; z < elem.length; z++) {
				const c = elem[z];
				var idx = canidates.findIndex((x) => x == c);
				if (idx == -1)
					console.log("error:", c, elem);
				createdNumber[idx] = 1;
			}
			code = code * 10 + getNumber(createdNumber);
		}
		count += code;
	}
	console.log(count);
	return;
}

ex01("input.txt");