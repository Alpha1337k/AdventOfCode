import * as fs from 'fs';
import { exit } from 'process';


function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var items: any[] = [];
	
	for (let i = 0; i < datastr.length; i++) {
		items.push([
			JSON.parse(datastr[i]),
			JSON.parse(datastr[i + 1]),
		]);
		i += 2;
	}

	var total = 0;
	for (let i = 0; i < items.length; i++) {
		const e = items[i];
		if (!compareList(e[0], e[1])) {
		} else {
			total += i + 1;
		}
	}

	console.log(total);
}

function compareList(l1: any[], l2: any[]) {
	let i = 0;
	for (; i < l1.length; i++) {
		const e = l1[i];
		if (l2[i] == undefined) {
			return false;
		}
		if (typeof l1[i] == 'number' && typeof l2[i] == 'number')
		{
			if (l1[i] > l2[i])
				return false;
			else if (l1[i] < l2[i])
				return true;
		}
		if (typeof l1[i] == 'object' && typeof l2[i] == 'object')
		{
			let rv = compareList(l1[i], l2[i])
			if (rv == false)
				return false;
			else if (rv == true)
				return true;
		}
		if (typeof l1[i] == 'number' && typeof l2[i] == 'object')
		{
			l1[i] = [l1[i]];
			let rv = compareList(l1[i], l2[i])
			if (rv == false)
				return false;
			else if (rv == true)
				return true;			
		}
		if (typeof l1[i] == 'object' && typeof l2[i] == 'number')
		{
			l2[i] = [l2[i]];
			let rv = compareList(l1[i], l2[i])
			if (rv == false)
				return false;
			else if (rv == true)
				return true;			
		}
	}
	return true;
}

function compareListV2(l1: any[], l2: any[]): number {
	let i = 0;
	for (; i < l1.length; i++) {
		const e = l1[i];
		if (l2[i] == undefined) {
			return -1;
		}
		if (typeof l1[i] == 'number' && typeof l2[i] == 'number')
		{
			if (l1[i] > l2[i])
				return -1;
			else if (l1[i] < l2[i])
				return 1;
		}
		if (typeof l1[i] == 'object' && typeof l2[i] == 'object')
		{
			let rv = compareListV2(l1[i], l2[i])
			if (rv != 0)
				return rv;
		}
		if (typeof l1[i] == 'number' && typeof l2[i] == 'object')
		{
			l1[i] = [l1[i]];
			let rv = compareListV2(l1[i], l2[i])
			if (rv != 0)
				return rv;			
		}
		if (typeof l1[i] == 'object' && typeof l2[i] == 'number')
		{
			l2[i] = [l2[i]];
			let rv = compareListV2(l1[i], l2[i])
			if (rv != 0)
				return rv;			
		}
	}
	if (l1[i] == undefined && l2[i] != undefined)
		return 1;
	return 0;
}

function ex02() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var items: any[] = [];
	
	for (let i = 0; i < datastr.length; i++) {
		items.push([
			JSON.parse(datastr[i]),
			JSON.parse(datastr[i + 1]),
		]);
		i += 2;
	}

	var res = [];
	var allItems: any[] = [
		[[2]],
		[[6]],
	]; 
	for (let i = 0; i < items.length; i++) {
		const e = items[i];
		allItems.push(...e);
	}

	allItems = allItems.sort((a, b) => {
		const val = compareListV2(JSON.parse(JSON.stringify(b)), JSON.parse(JSON.stringify(a)))
		return val;
	});


	console.log(allItems.findIndex(x => JSON.stringify(x) == JSON.stringify([[2]])) + 1,
		allItems.findIndex(x => JSON.stringify(x) == JSON.stringify([[6]])) + 1,
	);
}



ex02(); 