import * as fs from 'fs';

function isNumeric(str: any) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	var stacks: string[][] = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
	];

	let i = 0;
	for (; i < datastr.length; i++) {
		const e = datastr[i];

		if (datastr[i + 1] == "")
			break;

		var z = 1;
		var zInd = 0;
		while (true) {
			if (!e[z])
				break;
			if (e[z] != ' ')
				stacks[zInd].unshift(e[z]);
			z += 4;
			zInd++;
		}
		
		console.log("DATA:", e);
	}

	console.log("STACKS", stacks);

	var instructions = [];
	for (i++; i < datastr.length; i++) {
		const e = datastr[i];
		instructions.push(e.split(" ").filter((x) => isNumeric(x)).map(x => parseInt(x)));
	}

	for (let i = 0; i < instructions.length; i++) {
		const e = instructions[i];
		const count = instructions[i][0];
		const from = instructions[i][1] - 1;
		const to = instructions[i][2] - 1;

		console.log(count, from, to);

		for (let x = 0; x < count; x++) {
			const item = stacks[from].pop();
			if (item)
				stacks[to].push(item);			
		}
		console.log(stacks);
	}

	var res = "";
	for (let i = 0; i < stacks.length; i++) {
		const e = stacks[i];
		if (e.at(-1))
			res += e.at(-1);	
	}
	console.log(res);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	var stacks: string[][] = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
	];

	let i = 0;
	for (; i < datastr.length; i++) {
		const e = datastr[i];

		if (datastr[i + 1] == "")
			break;

		var z = 1;
		var zInd = 0;
		while (true) {
			if (!e[z])
				break;
			if (e[z] != ' ')
				stacks[zInd].unshift(e[z]);
			z += 4;
			zInd++;
		}
		
	}


	i += 2;
	var instructions = [];
	for (; i < datastr.length; i++) {
		const e = datastr[i];
		instructions.push(e.split(" ").filter((x) => isNumeric(x)).map(x => parseInt(x)));
	}

	for (let i = 0; i < instructions.length; i++) {
		const e = instructions[i];
		const count = instructions[i][0];
		const from = instructions[i][1] - 1;
		const to = instructions[i][2] - 1;

		const item = stacks[from].slice(-count);
		stacks[from] = stacks[from].slice(0, stacks[from].length -count);

		if (item)
			stacks[to].push(...item);			
	}

	var res = "";
	for (let i = 0; i < stacks.length; i++) {
		const e = stacks[i];
		if (e.at(-1))
			res += e.at(-1);	
	}
	console.log(res);
}

ex02();