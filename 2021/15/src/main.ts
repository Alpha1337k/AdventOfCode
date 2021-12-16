import * as fs from 'fs';

var versiontotal = 0;

function ex00(file:string) {
	var databuf = fs.readFileSync(file);
	var datastr = databuf.toString().split('\n');

	var decoded = decode(datastr[0]);

	var d = readPacket(decoded, 0);
	console.log(versiontotal, d);
}

function calculate(values:number[], id: number) {
	var rv = 0;
	if (id == 0)
	{
		for (let i = 0; i < values.length; i++) {
			const e = values[i];
			rv += e;
		}
	}
	else if (id == 1)
	{
		rv = values[0];
		for (let i = 1; i < values.length; i++) {
			const e = values[i];
			rv *= e;
		}		
	}
	else if (id == 2)
	{
		var min = 100000;
		for (let i = 0; i < values.length; i++) {
			const e = values[i];
			if (min > e)
				min = e;
		}
		rv = min;
	}
	else if (id == 3)
	{
		var max = -100000;
		for (let i = 0; i < values.length; i++) {
			const e = values[i];
			if (e > max)
				max = e;
		}
		rv = max;		
	}
	else if (id == 5)
	{
		rv = values[0] > values[1] ? 1 : 0;
	}
	else if (id == 6)
	{
		rv = values[0] < values[1] ? 1 : 0;
	}
	else if (id == 7)
	{
		rv = values[0] == values[1] ? 1 : 0;
	}

	return rv;
}

function readPacket(decoded: string, i: number) {
	var packetType = parseInt(decoded.substring(i, i + 3), 2);
	var id = parseInt(decoded.substring(i + 3, i + 6), 2);

	versiontotal += packetType;
	i += 6;

	if (id == 4)
	{
		var tmp = readliteral(decoded, i);
		i = tmp.i;
		return {i, result: parseInt(tmp.literal, 2)};
	}
	else if (id >= 0 && id < 100)
	{
		var bitstoread = decoded[i] == '1' ? 11 : 15;
		var values: number[] = [];

		if (bitstoread == 15)
		{
			var sublen = i + bitstoread + parseInt(decoded.substring(i + 1, i + 1 + bitstoread), 2);
			i += 1 + bitstoread;
	
			while (i < sublen + 1) {
				var tmpres = readPacket(decoded, i);
				i = tmpres.i;
				values.push(tmpres.result);

			}
		}
		else
		{
			var packetcount = parseInt(decoded.substring(i + 1, i + 1 + bitstoread), 2);
			i += 1 + bitstoread;

			var count = 0;
			while (count < packetcount) {
				var tmpres = readPacket(decoded, i);
				values.push(tmpres.result);
				i = tmpres.i;
				count++;
			}
		}
		var result = calculate(values, id);

		return {i, result};
	}
	else
	{
		return {i: -1, result: -1};
	}
}

function readliteral(decoded: string, i: number) {
	var literal = '';
	for (; i < decoded.length; i += 5) {
		
		literal += decoded.substring(i + 1, i + 5);
		if (decoded[i] == '0')
		{
			i += 5;
			break;
		}
	}

	return {literal, i};
}

function decode(data: string) {
	var datatable = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001","1010" ,"1011", "1100", "1101", "1110", "1111"];
	var rv = '';

	for (let i = 0; i < data.length; i++) {
		const e = data[i];
		rv += datatable[parseInt(e, 16)];
	}

	return rv;
}


ex00("input.txt");