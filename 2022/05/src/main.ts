import * as fs from 'fs';



function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		for (let i = 0; i < e.length; i++) {
			const idx = e[i];
			if (checkForDups(e.substring(i, i + 4))) {
				console.log(i + 4);
				break;
			}
		}
	}
}

function checkForDups(str:string) {
	for (let i = 0; i < str.length; i++) {
		const e = str[i];
		for (let x = i + 1; x < str.length; x++) {
			if (str[x] == e)
				return false;
			
		}
	}

	return true;
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];
		for (let i = 0; i < e.length; i++) {
			const idx = e[i];
			if (checkForDups(e.substring(i, i + 14))) {
				console.log(i + 14);
				break;
			}
		}
	}
}


ex02();