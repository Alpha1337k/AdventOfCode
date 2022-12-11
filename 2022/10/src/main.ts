import * as fs from 'fs';
import { exit } from 'process';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	let monkeys = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		if (e.startsWith("Monkey")) {
			let toPush = {
				startItems: datastr[i + 1].split(":")[1].split(",").map(x => parseInt(x)),
				operation: datastr[i + 2].split(":")[1].replace("new", "n"),
				test: datastr[i + 3].split(" ").map(x => parseInt(x)).at(-1),
				testTrue: datastr[i + 4].split(" ").map(x => parseInt(x)).at(-1),
				testFalse: datastr[i + 5].split(" ").map(x => parseInt(x)).at(-1),
				inspectCount: 0,
			};
			monkeys.push(toPush);
			i += 5;
		}
	}

	for (let r = 0; r < 20; r++) {
		
	for (let i = 0; i < monkeys.length; i++) {
		const e = monkeys[i];
		while (e.startItems.length) {
			
			var old = e.startItems.shift();
			if (old == undefined) return;
			console.log("Monkey inspects item " + old);
	
			var n = 0;
			eval(e.operation);
	
			console.log("Worry level is multiplied by " + e.operation + " to " + n);
	
			n = Math.floor(n / 3);
			console.log("monkey gets bored worry is now " + n);
	
			if (e.test && n % e.test == 0) {
				console.log("number is divisible, item gets send to " + e.testTrue);
				if (e.testTrue == undefined) return;
				monkeys[e.testTrue].startItems.push(n);
	
			} else {
				console.log("number is NOT divisible, item gets send to " + e.testFalse);
				if (e.testFalse == undefined) return;
				monkeys[e.testFalse].startItems.push(n);
			}
			e.inspectCount++;
			console.log("--")
		}
		console.log("----")
	}
}


	console.log(monkeys.map(x => x.startItems));
	console.log(monkeys.map(x => x.inspectCount));
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');


	let monkeys = [];

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		if (e.startsWith("Monkey")) {
			let toPush = {
				startItems: datastr[i + 1].split(":")[1].split(",").map((x) => {return {val: parseInt(x), origin: parseInt(x), route: [] as number[]}}),
				operation: datastr[i + 2].split(":")[1].replace("new", "n"),
				test: datastr[i + 3].split(" ").map(x => parseInt(x)).at(-1),
				testTrue: datastr[i + 4].split(" ").map(x => parseInt(x)).at(-1),
				testFalse: datastr[i + 5].split(" ").map(x => parseInt(x)).at(-1),
				inspectCount: 0,
			};
			monkeys.push(toPush);

			i += 5;
		}
	}

	const modulod = monkeys.reduce((prev, mon) => prev * (mon.test || 0), 1);

	for (let r = 0; r < 10000; r++) {
		
	for (let i = 0; i < monkeys.length; i++) {
		const e = monkeys[i];
		while (e.startItems.length) {
			
			let {val, route, origin} = e.startItems.shift() || {val: -1, route: [], origin: 1};
			if (val == -1) return;
	
			var n = 0;
			var old = val;
			eval(e.operation);
		
			val = n;


	
			if (e.test && n % e.test == 0) {
				if (e.testTrue == undefined) return;
				route.push(i);
				
				monkeys[e.testTrue].startItems.push({val: val % modulod, route, origin});
	
			} else {
				if (e.testFalse == undefined) return;
				route.push(i);

				monkeys[e.testFalse].startItems.push({val: val % modulod, route, origin});
			}
			e.inspectCount++;
		}
	}
}

	console.log(monkeys.map(x => x.inspectCount).sort((a, b) => a - b));
}

ex02();
