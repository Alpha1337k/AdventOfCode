import * as fs from 'fs';
import { exit } from 'process';

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var path = "";
	var directoryTotals: {
		[key: string]: number
	} = {};


	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];

		const query = datastr[i].split(" ").slice(1);

		if (query[0] == "cd") 
		{
			if (query[1] == "/")
				path = "/";
			else if (query[1] == "..") {
				path = path.substring(0, path.length - 1)
				path = path.substring(0, path.lastIndexOf("/") + 1);
				if (path == '')
					path = '/'
			}
			else
				path += query[1] + '/';
		} else if (query[0] == "ls")
		{
			if (directoryTotals[path])
				continue;
			var total = 0;
			while (datastr[i + 1] && !datastr[i + 1].startsWith("$")) {
				const item = datastr[i + 1].split(" ");
				if (parseInt(item[0]))
					total += parseInt(item[0]);
				i++;
			}
			directoryTotals[path] = total
		} 

	}
	for (var key in directoryTotals)
	{
		var total = directoryTotals[key];
		var origin = key;
		key = key.substring(0, key.length - 1)
		key = key.substring(0, key.lastIndexOf("/") + 1);
		while (key != '') {
			directoryTotals[key] += total;

			key = key.substring(0, key.length - 1);
			key = key.substring(0, key.lastIndexOf("/") + 1);
		}
	}

	var res = 0;

	for (var key in directoryTotals)
	{
		if (directoryTotals[key] <= 100000)
			res += directoryTotals[key];
	}

	console.log(res);

}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var path = "";
	var directoryTotals: {
		[key: string]: number
	} = {};


	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i];

		const query = datastr[i].split(" ").slice(1);

		if (query[0] == "cd") 
		{
			if (query[1] == "/")
				path = "/";
			else if (query[1] == "..") {
				path = path.substring(0, path.length - 1)
				path = path.substring(0, path.lastIndexOf("/") + 1);
				if (path == '')
					path = '/'
			}
			else
				path += query[1] + '/';
		} else if (query[0] == "ls")
		{
			if (directoryTotals[path])
				continue;
			var total = 0;
			while (datastr[i + 1] && !datastr[i + 1].startsWith("$")) {
				const item = datastr[i + 1].split(" ");
				if (parseInt(item[0]))
					total += parseInt(item[0]);
				i++;
			}
			directoryTotals[path] = total
		} 

	}
	for (var key in directoryTotals)
	{
		var total = directoryTotals[key];
		var origin = key;
		key = key.substring(0, key.length - 1)
		key = key.substring(0, key.lastIndexOf("/") + 1);
		while (key != '') {
			directoryTotals[key] += total;

			key = key.substring(0, key.length - 1);
			key = key.substring(0, key.lastIndexOf("/") + 1);
		}
	}

	var res = 0;

	for (var key in directoryTotals)
	{
		if (directoryTotals[key] <= 100000)
			res += directoryTotals[key];
	}


	var entries = Object.entries(directoryTotals);
	const target = 30000000 - (70000000 - directoryTotals["/"]);

	entries = entries.filter(x => x[1] > target).sort((a, b) => a[1] - b[1]);

	console.table(entries);
}

ex02();