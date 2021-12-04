import * as fs from 'fs';

function checkhor(board: string[][], count: number, numbers: string[]) {
	var possible = false;
	for (let i = 0; i < board.length; i++) {

		possible = true;
		for (let x = 0; x < 5; x++)
		{
			let z = 0;
			for (; z < count; z++) {
				if (board[i][x] === numbers[z])
					break;
			}
			if (z == count)
			{
				possible = false;
				break;
			}
		}
		if (possible == true)
			return 1;
	}
	return 0;
}

function checkver(board: string[][], count: number, numbers: string[]) {
	var possible = false;
	for (let i = 0; i < 5; i++) {

		possible = true;
		for (let x = 0; x < board.length; x++)
		{
			let z = 0;
			for (; z < count; z++) {
				if (board[x][i] === numbers[z])
					break;
			}
			if (z == count)
			{
				possible = false;
				break;
			}
		}
		if (possible == true)
			return 1;
	}
	return 0;
}

function addboard(datastr: string[], i : number) {
	var topush = [];
	
	for (let x = 0; x < 5; x++) {
		if (datastr[i + x].startsWith(' '))
			datastr[i + x] = datastr[i + x].substring(1);
		topush.push(datastr[i + x].split(/\s+/));
	}
	return topush;
}

function calcboard(board:string[][], numbers: string[], count: number) {

	var ret = 0;
	for (let i = 0; i < 5; i++) {
		for (let x = 0; x < 5; x++) {
			const e = board[i][x];
			var exists = false;
			for (let z = 0; z < count; z++) {
				if (numbers[z] == e)
					exists = true;
			}
			if (exists == false)
				ret += parseInt(e);
			
		}
	}
	return ret;
}

function ex00(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var numbers = datastr[0].split(',');


	var boards = [];

	for (let i = 2; i < datastr.length; i += 6) {
		boards.push(addboard(datastr, i));
	}

	for (let i = 5; i < numbers.length; i++) {
		for (let x = 0; x < boards.length; x++) {
			const e = boards[x];
			let rv = checkhor(e, i, numbers) + checkver(e, i, numbers);
			if (rv != 0)
			{

				console.log("Done!", numbers[i - 1], calcboard(e, numbers, i));

				return;
			}	
		}
		
	}

	console.log(numbers);

	console.log(boards);
}

function ex01(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var numbers = datastr[0].split(',');


	var boards = [];

	for (let i = 2; i < datastr.length; i += 6) {
		boards.push(addboard(datastr, i));
	}

	for (let i = 5; i < numbers.length; i++) {
		for (let x = 0; x < boards.length; x++) {
			const e = boards[x];
			let rv = checkhor(e, i, numbers) + checkver(e, i, numbers);
			if (rv != 0)
			{

				console.log("Done!", numbers[i - 1], calcboard(e, numbers, i));

				boards.splice(x, 1);
			}	
		}
		
	}

	console.log(numbers);

	console.log(boards);
}

// ex00("test.txt");
// ex00("input.txt");

// ex01("test.txt");
// ex01("input.txt");
