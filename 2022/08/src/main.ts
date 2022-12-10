import * as fs from 'fs';
import { exit } from 'process';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var posH = [0, 0];
	var posT = [0, 0];

	var visited = new Set<string>();

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');
	
		var dir = [0, 0];
		switch (e[0]) {
			case 'R':
				dir = [0, 1];
				break;
			case 'L':
				dir = [0, -1];
				break;
			case 'U':
				dir = [-1, 0];
				break;
			case 'D':
				dir = [1, 0];
				break;
		
			default:
				break;
		}
		var c = parseInt(e[1]);
		for (let n = 0; n < c; n++) {
			posH[0] += dir[0];
			posH[1] += dir[1];			
		
			if (Math.abs(posH[0] - posT[0]) > 1 || Math.abs(posH[1] - posT[1]) > 1) {
				var tailDirs = [
					posH[0] - posT[0],
					posH[1] - posT[1],
				]

				if (tailDirs[0] > 0)
					tailDirs[0] = 1;
				else if (tailDirs[0] < 0)
					tailDirs[0] = -1;
				if (tailDirs[1] > 0)
					tailDirs[1] = 1;
				else if (tailDirs[1] < 0)
					tailDirs[1] = -1;
				posT[0] += tailDirs[0];
				posT[1] += tailDirs[1];

				visited.add(`${posT[0]},${posT[1]}`);
			}
		}
	}
	console.log([...visited].length);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var knots = new Array(10);
	for (let i = 0; i < knots.length; i++) {
		knots[i] = [0, 0];
	}


	var visited = new Set<string>();

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');
	
		var dir = [0, 0];
		switch (e[0]) {
			case 'R':
				dir = [0, 1];
				break;
			case 'L':
				dir = [0, -1];
				break;
			case 'U':
				dir = [-1, 0];
				break;
			case 'D':
				dir = [1, 0];
				break;
		
			default:
				break;
		}
		var c = parseInt(e[1]);
		for (let n = 0; n < c; n++) {
			knots[0][0] += dir[0];
			knots[0][1] += dir[1];			
		
			for (let x = 1; x < knots.length; x++) {
				if (Math.abs(knots[x - 1][0] - knots[x][0]) > 1 || Math.abs(knots[x - 1][1] - knots[x][1]) > 1) {
					var tailDirs = [
						knots[x - 1][0] - knots[x][0],
						knots[x - 1][1] - knots[x][1],
					]
	
					if (tailDirs[0] > 0)
						tailDirs[0] = 1;
					else if (tailDirs[0] < 0)
						tailDirs[0] = -1;
					if (tailDirs[1] > 0)
						tailDirs[1] = 1;
					else if (tailDirs[1] < 0)
						tailDirs[1] = -1;
					console.log("adding to knots", x, tailDirs)
					knots[x][0] += tailDirs[0];
					knots[x][1] += tailDirs[1];
	
					// visited.add(`${knots[x][0]},${knots[x][1]}`);
				}
			}
			visited.add(`${knots[9][0]},${knots[9][1]}`);
		}
	}
	console.log([...visited].length);
}


ex02(); 