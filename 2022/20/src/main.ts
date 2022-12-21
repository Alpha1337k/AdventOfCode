import * as fs from 'fs';
import { emitWarning, exit } from 'process';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');
	var monkeys: {
		[key: string]: { shout: number | string, shouted: boolean, res: number | undefined}
	} = {};

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(': ');

		monkeys[e[0]] = {
			shout: Number.isNaN(parseInt(e[1])) ? e[1] : parseInt(e[1]),
			shouted: false,
			res: undefined,
		}
	}

	let iter = 0;
	handleShout(monkeys);

	console.log(monkeys["root"]);
}

function handleShout(monkeys: {
	[key: string]: { shout: number | string, shouted: boolean, res: number | undefined}
}) {
	let keys = Object.keys(monkeys);
	let resetCount = 0;
	for (let i = 0; i < keys.length; i++) {
		const e = monkeys[keys[i]];
		if (e.shouted) continue;
		if (typeof e.shout == 'number') {
			e.shouted = true;
			e.res = e.shout as number;
			i = -1;
			resetCount++;
		} else if (typeof e.shout == 'string') {
			const targets = e.shout.split(" ");
			if (monkeys[targets[0]].shouted == true && monkeys[targets[2]].shouted == true) {
				e.shouted = true;
				let toEval = `e.res = monkeys["${targets[0]}"].res ${targets[1]} monkeys["${targets[2]}"].res`;
				eval(toEval);
				resetCount++;
				i = -1;
			}
		}
	}
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');
	var monkeys: {
		[key: string]: { shout: number | string, shouted: boolean, res: number | undefined, totalEval: string}
	} = {};

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(': ');

		monkeys[e[0]] = {
			shout: Number.isNaN(parseInt(e[1])) ? e[1] : parseInt(e[1]),
			shouted: false,
			res: undefined,
			totalEval: e[1],
		}
	}

	monkeys["humn"].totalEval = "%%";
	handleShoutV2(monkeys);


	let i = 0, depth = 0;
	for (; i < monkeys["root"].totalEval.length; i++) {
		const e = monkeys["root"].totalEval[i];
		if (e == "(") depth++;
		else if (e == ")") depth--;
		else if (e != ' ' && depth == 0) break;
	}
	const splitted: string[] = [
		monkeys["root"].totalEval.substring(0, i - 1),
		monkeys["root"].totalEval[i],
		monkeys["root"].totalEval.substring(i + 2),
	];
	const target = splitted[0].indexOf("%%") != -1 ? eval(splitted[2]) : eval(splitted[0]); 
	const editable= splitted[0].indexOf("%%") != -1 ? 0 : 2;

	let copy = splitted[editable];


	let res = 0;

	let newRes = 0;
	let iter = target / 2;
	let marker = Math.ceil(target * 10);

	i = 0;

	while (newRes != target && ++i != 5000) {
		let copy = splitted[editable];

		copy = copy.replace("%%", iter.toString());

		
		eval("newRes=" + copy);

		if (newRes == target) {
			break;
		}
		if (newRes > target) {
			iter += Math.abs(marker) || 1;
		} else {
			iter -= Math.abs(marker) || 1;
		}
		marker = Math.ceil(marker / 2) || 1;

	}
	console.log(target, newRes, iter);
	
}

function handleShoutV2(monkeys: {
	[key: string]: { shout: number | string, shouted: boolean, res: number | undefined, totalEval: string}
}) {
	let keys = Object.keys(monkeys);
	let resetCount = 0;
	for (let i = 0; i < keys.length; i++) {
		const e = monkeys[keys[i]];
		if (e.shouted) continue;
		if (typeof e.shout == 'number') {
			e.shouted = true;
			e.res = e.shout as number;
			i = -1;
			resetCount++;
		} else if (typeof e.shout == 'string') {
			const targets = e.shout.split(" ");
			if (monkeys[targets[0]].shouted == true && monkeys[targets[2]].shouted == true) {
				e.shouted = true;
				let toEval = `e.res = monkeys["${targets[0]}"].res ${targets[1]} monkeys["${targets[2]}"].res`;
				eval(toEval);
				e.totalEval = e.totalEval.replace(targets[0], `(${monkeys[targets[0]].totalEval})`).replace(targets[2], `(${monkeys[targets[2]].totalEval})`)

				resetCount++;
				i = -1;
			}
		}
	}
}


ex01();