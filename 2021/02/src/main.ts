import * as fs from 'fs';

function ex00(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var data = Array(datastr[0].length);

	for (let i = 0; i < data.length; i++) {
		data[i] = 0;
	}

	var rdata = Array(datastr[0].length);

	for (let i = 0; i < rdata.length; i++) {
		rdata[i] = 0;
	}

	for (let i = 0; i < datastr.length; i++) {
		for (let x = 0; x < datastr[i].length; x++) {
			const e = datastr[i][x];
			data[x] += parseInt(e);
		}
	}

	for (let i = 0; i < data.length; i++) {
		if (data[i] > datastr.length / 2)
		{
			data[i] = 1;
			rdata[i] = 0;
		}
		else
		{
			data[i] = 0;
			rdata[i] = 1;
		}
	}

	var newd = data.join('');
	var rewd = rdata.join('');

	console.log(newd, rewd);

}

function ex01(file: string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');
	var copyd = datastr;


	var ofiltered: string[] = [];
	var cfiltered: string[] = [];

	var count = 0;
	var len = datastr[0].length;

	for (let i = 0; i < len; i++) {
		if (datastr.length == 1)
			break;
		count = 0;
		for (let x = 0; x < datastr.length; x++) {
			const e = datastr[x][i];
			
			if (parseInt(e) > 0)
				count++;
		}

		for (let x = 0; x < datastr.length; x++) {
			const e = datastr[x][i];
			if ((count >= datastr.length / 2 && parseInt(e) > 0) || (count < datastr.length / 2 && parseInt(e) == 0))
				ofiltered.push(datastr[x]);
		}
		datastr = ofiltered;
		ofiltered = [];
	}

	var cres = datastr;

	datastr = copyd;

	for (let i = 0; i < len; i++) {
		if (datastr.length == 1)
			break;
		count = 0;
		for (let x = 0; x < datastr.length; x++) {
			const e = datastr[x][i];
			
			if (parseInt(e) > 0)
				count++;
		}

		for (let x = 0; x < datastr.length; x++) {
			const e = datastr[x][i];
			if ((count > datastr.length / 2 && parseInt(e) == 0) || (count < datastr.length / 2 && parseInt(e) == 1) || (count == datastr.length / 2 && parseInt(e) == 0))
				cfiltered.push(datastr[x]);
		}
		datastr = cfiltered;
		cfiltered = [];
	}

	console.log(cres, datastr);

}

ex00("input.txt");