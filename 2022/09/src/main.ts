import * as fs from 'fs';
import { exit } from 'process';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var register = 1;
	var lastCheck = -20;
	var cycles = 0;
	var totalSig = 0;

	const updateCycleData = () => {
		totalSig += register * cycles;
		lastCheck = cycles;
	}

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');
		if (e[0] == "noop") {
			cycles += 1;
			if (cycles - lastCheck >= 40)
				updateCycleData();
		}
		if (e[0] == "addx") {
			cycles++;
			if (cycles - lastCheck >= 40)
				updateCycleData();
			cycles++;
			if (cycles - lastCheck >= 40)
				updateCycleData();
			register += parseInt(e[1]);
		}

	}

	console.log(totalSig);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var register = 1;
	var lastCheck = -20;
	var lastCycles = 0;
	var cycles = 0;
	var totalSig = 0;

	var localizedCycles = 0;
	var str = "";
	const updateCycleData = () => {
		totalSig += register * cycles;
		lastCycles = cycles;
		lastCheck = cycles;

	}

	const incrementCycles = () => {
		if (Math.abs((localizedCycles) - register) < 2)
			str += "#";
		else
			str += ".";
		if (localizedCycles == 39) {
			str += "\n";
			// str += '#'.repeat(str.split("\n").length);
			localizedCycles = 0;
		} else {
			localizedCycles++;
		}
		cycles++;
	}

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');


		if (e[0] == "noop") {
			incrementCycles();
			if (cycles - lastCheck >= 40)
				updateCycleData();
		}
		if (e[0] == "addx") {
			incrementCycles();
			if (cycles - lastCheck >= 40)
				updateCycleData();
			incrementCycles();
			if (cycles - lastCheck >= 40)
				updateCycleData();
			register += parseInt(e[1]);
		}


		// console.log(e, cycles, register);

	}

	console.log(str);
}


ex02();
