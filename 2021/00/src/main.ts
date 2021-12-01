import * as fs from 'fs';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');
	var countdown = 0;
	
	console.log("len:", datastr.length);
	for (let i = 0; i < datastr.length - 1; i++) {
		const e1 = datastr[i];
		const e2 = datastr[i + 1];
		
		if (parseInt(e1) < parseInt(e2) )
			countdown++;
	}
	console.log(countdown);
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');
	var countdown = 0;
	
	console.log("len:", datastr.length);
	for (let i = 0; i < datastr.length - 3; i++) {
		const e1 = parseInt(datastr[i]) + parseInt(datastr[i + 1]) + parseInt(datastr[i + 2]);
		const e2 = parseInt(datastr[i + 1]) + parseInt(datastr[i + 2]) + parseInt(datastr[i + 3]);
		
		if (e1 < e2 )
			countdown++;
	}
	console.log(countdown);
}

ex02()