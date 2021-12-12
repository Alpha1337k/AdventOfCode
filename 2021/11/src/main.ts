import * as fs from 'fs';

var results: string[] = [];

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var links = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		links.push(e.split("-"));
	}


	createRoute(links, "start", "", []);

	let res = 0;
	for (let i = 0; i < results.length; i++) {
		const e = results[i].split(',');
		let c = 0;
		for (let x = 0; x < e.length; x++) {
			const element = e[x]
		}
		if (c <= 1)
			res++;
	}
	console.log(results.length);
}

function findLinks(lins: string[][], node: string) {
	var rv = [];

	for (let i = 0; i < lins.length; i++) {
		const e = lins[i];
		if (e[0] == '' || e[1] == '')
			continue;
		if (e[0] == node || e[1] == node)
			rv.push(e);
	}

	return rv;
}
function updateLinks(lins: string[][], node: string) {

	for (let i = 0; i < lins.length; i++) {
		const e = lins[i];
		if (lins[i][0] == node)
			lins[i][0] = '';
		if (lins[i][1] == node)
			lins[i][1] = '';
	}
}

function createRoute(links: string[][], pos: string, total:string, passed: string[][], smallCaveChosen: boolean =false) {
	
	total += ',' + pos;
	if (pos == "end")
	{
		// console.log(total.substring(1));
		results.push(total.substring(1));
		return;
	}

	// console.log("not really", total);

	const newroutes = findLinks(copyarr(links), pos);
	const newCaves = copyarr(passed);

	let oldsmallCave = smallCaveChosen;
	let oldpos = pos;

	if (pos != "start" && pos != "end" && pos.charCodeAt(0) >= 97)
	{
		const found = passed.find((x)=> x[0] == pos);
		if (found)
		{

			found[1] = "2";
			smallCaveChosen = true;
		}
		else
			passed.push([pos, "1"]);
		// console.log("Passed",passed);
	}
	

	// console.log(newroutes);
	for (let i = 0; i < newroutes.length; i++) {
		const element = newroutes[i];

		const found = newCaves.find((x)=> x[0] == pos);
		if ((found && found[1] == "2") || (found && found[1] == "1" && oldsmallCave))
			continue;
		if ((element[0] == "start" || element[1] == "start") && pos != "start")
			continue;
		if (element[0] == oldpos)
			createRoute(copyarr(links), element[1], total, copyarr(passed), smallCaveChosen);
		else
			createRoute(copyarr(links), element[0], total, copyarr(passed), smallCaveChosen);
	}


}

function ex01(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var links = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		links.push(e.split("-"));
	}


	createRoute(links, "start", "", []);

	let res = 0;
	for (let i = 0; i < results.length; i++) {
		const e = results[i].split(',');
		let c = 0;
		for (let x = 0; x < e.length; x++) {
			const element = e[x]
		}
		if (c <= 1)
			res++;
	}
	console.log(results.length);
}


function copyarr(array:string[][]) {
	var rv = [];

	for (let i = 0; i < array.length; i++) {
		const e = array[i];
		let topush = [];
		topush.push(e[0]);
		topush.push(e[1]);
		rv.push(topush);
	}
	return rv;
}

ex01("input.txt");