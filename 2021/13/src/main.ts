import * as fs from 'fs';

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var template = datastr[0];

	var rules = [];

	for (let i = 2; i < datastr.length; i++) {
		const e = datastr[i].split(" -> ");
		rules.push([e[0],e[0][0] + e[1] + e[0][1]]);
	}

	console.log(rules);


	for (let i = 0; i < 3; i++) {
		var newtemplate = '';
		for (let x = 0; x < template.length - 1; x += 1) {
			const e = template[x] +template[x + 1];
			
			const rulesMatch = rules.find((z) => z[0] == e);
			if (rulesMatch)
			{
				if (x + 1 == template.length - 1)
					newtemplate += rulesMatch[1];
				else
					newtemplate += rulesMatch[1].substring(0, 2);
			}
			else
			{
				console.log("Error?")
				newtemplate += e;
			}
		}
		console.log(newtemplate);
		template = newtemplate;
	}

	var letters = Array(26).fill(0);
	for (let i = 0; i < template.length; i++) {
		const e = template[i];
		letters[e.charCodeAt(0) - 65]++;
	}

	var most = {char: '', count: 0};
	var least = {char: '', count: 100000};

	for (let i = 0; i < letters.length; i++) {
		const e = letters[i];
		if (e > most.count)
		{
			most.char = String.fromCharCode(i + 65);
			most.count = e;
		}
		if (e < least.count && e != 0)
		{
			least.char = String.fromCharCode(i + 65);
			least.count = e;
		}
	}
	console.log(most, least, most.count - least.count);
}

var rules: string[][] = [];


function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var template = datastr[0];


	for (let i = 2; i < datastr.length; i++) {
		const e = datastr[i].split(" -> ");
		rules.push([e[0],e[1]]);
	}

	console.log(rules);

	var letters = Array(26).fill(0);

	var values: any = new Object();
	for (let i = 0; i < template.length - 1; i++) {
		if (values[template[i] + template[i + 1]] == undefined)
			values[template[i] + template[i + 1]] = 1;
		else
			values[template[i] + template[i + 1]] += 1;
	}
	console.log(values);
	for (let i = 0; i < 40; i++) {
		var newmap: any = {};


		for (const key in values) {
			const rulesMatch = rules.find((z) => z[0] == key);
			if (rulesMatch)
			{
				const a = newmap[rulesMatch[0][0] + rulesMatch[1]];
				if (a == undefined)
					newmap[rulesMatch[0][0] + rulesMatch[1]] = values[key];
				else
					newmap[rulesMatch[0][0] + rulesMatch[1]] += values[key];

				const b = newmap[rulesMatch[1] + rulesMatch[0][1]];
				if (b == undefined)
					newmap[rulesMatch[1] + rulesMatch[0][1]] = values[key];
				else
					newmap[rulesMatch[1] + rulesMatch[0][1]] += values[key];
			}
			else
			{
				console.log("ERRRORORORO");
			}
		}
		values = newmap;

		console.log(newmap);
	}

	var most = {char: '', count: 0};
	var least = {char: '', count: 1000000000000};

	letters[template.charCodeAt(0) - 65] = 1;
	for (const key in values) {
		letters[key.charCodeAt(0) - 65]+= values[key];
	}
	letters[1]++;

	for (let i = 0; i < letters.length; i++) {
		const e = letters[i];
		if (e > most.count)
		{
			most.char = String.fromCharCode(i + 65);
			most.count = e;
		}
		if (e < least.count && e != 0)
		{
			least.char = String.fromCharCode(i + 65);
			least.count = e;
		}
	}
	console.log(most, least, most.count - least.count);
}

// ex00("input.txt");
ex01("input.txt");

// { char: 'K', count: 4151 } { char: 'H', count: 566 } 3585
// { char: 'K', count: 4151 } { char: 'H', count: 564 } 3587