import * as fs from 'fs';

function parseSyntax(data:string) {
	var rv = '';

	var openChars = ['[', '(', '{', '<'];
	var closeChars = [']', ')', '}', '>'];
	var seenChars = [];

	for (let i = 0; i < data.length && rv.length == 0; i++) {
		const e = data[i];
		const val = openChars.findIndex((x) => x === e);
		if (val == -1)
		{
			const item = seenChars.pop();
			if (item != e)
				return e;
		}
		else
			seenChars.push(closeChars[val]);
	}


	return rv;
}

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var res = '';
	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		res += parseSyntax(e);
	}
	var rv = 0;
	for (let i = 0; i < res.length; i++) {
		const e = res[i];
		if (e == ')')
			rv += 3;
		if (e == '>')
			rv += 25137;
		
		if (e == '}')
			rv += 1197;

		if (e == ']')
			rv += 57;

	}
	console.log(rv);
}

function autoComplete(data: string) {
	var openChars = ['[', '(', '{', '<'];
	var closeChars = [']', ')', '}', '>'];
	var seenChars = [];

	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		const val = openChars.findIndex((x) => x === e);
		if (val == -1)
		{
			const item = seenChars.pop();

		}
		else
			seenChars.push(closeChars[val]);
	}
	var rv = 0;

	for (let i = seenChars.length - 1; i >= 0; i--) {
		const e = seenChars[i];
		rv *= 5;

		if (e == ')')
			rv += 1;
		if (e == ']')
			rv += 2;
		if (e == '}')
			rv += 3;
		if (e == '>')
			rv += 4;
	}
	console.log(seenChars, rv);

	return rv;
}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var res = [];
	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		if (parseSyntax(e) == '')
			res.push(autoComplete(e));
	}

	res.sort((a, b) => {return a-b;});


	console.log(res[Math.floor(res.length / 2)]);
}

ex01("input.txt");