import * as fs from 'fs';

var changes = 0;

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var currentnumber = parse(datastr[0]);

	for (let i = 1; i < datastr.length; i++) {
		const e = datastr[i];
		let data: any[] = [];
		data.push('[');
		data.push(...currentnumber);
		data.push(...parse(e));
		data.push(']');
		console.log(data.join(" "));
		do {
			changes = 0;
			iterateExplode(data);
			if (changes == 0)
				iterateSplit(data);
			console.log(data.join(" "));
		} while (changes);
		currentnumber = data;
		console.log("");
	}
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	for (let i = 0; i < datastr.length; i++) {
		for (let x = 0; x < datastr.length; x++) {
			if (x == i)
				continue;
			let data: any[] = [];
			data.push('[');
			data.push(...parse(datastr[i]));
			data.push(...parse(datastr[x]));
			data.push(']');
			console.log(data.join(" "));
			do {
				changes = 0;
				iterateExplode(data);
				if (changes == 0)
					iterateSplit(data);
			} while (changes);
			console.log(data.join(" "));
			var mag = calcMag(data);
			console.log(i, x, mag);
			if (mag > largest)
				largest = mag;	
		}
	}
	console.log(largest);
}

var largest = 0;

function calcMag(data:any[]): number {
	var rval = [];
	var depth = 1;
	for (let i = 1; i < data.length && depth > 0; i++) {
		const e = data[i];
		if (e === '[')
		{
			if (depth == 1)
			{
				const tmp = calcMag(data.slice(i));
				rval.push(tmp);
			}
			depth++;
		}
		else if (e === ']')
		{
			depth--;
		}
		else if (depth == 1 && typeof(e) == 'number' && typeof (data[i + 1]) == 'number')
		{
			return 3 * e + data[i + 1] * 2;
			i++;
		}
		else if (depth == 1 && typeof(e) == 'number')
		{
			rval.push(e);
		}
	}
	return rval[0] * 3 + rval[1] * 2;
}

function parse(datastr:string) {
	var data = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		if (e == '[')
			data.push('[');
		else if (e == ']')
			data.push(']');
		else if (e >= '0' && e <= '9')
		{
			data.push(parseInt(datastr.substring(i)))
			while (datastr[i] >= '0' && datastr[i] <= '9') {
				i++;
			}
			i--;
		}
	}	
	return data;
}

function explode(data:any[], pos: number): any[] {
	for (let i = pos - 1; i >= 0; i--) {
		const element = data[i];
		if (typeof(element) == 'number')
		{
			data[i] += data[pos];
			break;
		}
	}

	for (let i = pos + 2; i < data.length; i++) {
		const e = data[i];
		if (typeof(e) == 'number')
		{
			data[i] += data[pos + 1];
			break;
		}
	}
	data.splice(pos, 3);
	data[pos - 1] = 0;

	return data;
}

function split(data: any[], pos: number) {
	var toadd = [];
	toadd.push('[');
	toadd.push(Math.floor(data[pos] / 2));
	toadd.push(Math.ceil(data[pos] / 2));
	toadd.push(']');

	data.splice(pos, 1, ...toadd);
}

function iterateExplode(data: any[]) {
	var depth = 0;
	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		if (e === '[')
			depth++;
		else if (e === ']')
			depth--;
		else if (depth > 4 && typeof(e) == 'number')
		{
			data = explode(data, i);
			changes = 1;
			break;
		}
	}
}

function iterateSplit(data: any[]) {
	var depth = 0;
	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		if (e === '[')
			depth++;
		else if (e === ']')
			depth--;
		else if (typeof(e) == 'number' && e >= 10)
		{
			split(data, i);
			changes = 1;
			break;
		}
	}
}

ex01("input.txt");