import * as fs from 'fs'



function ex00() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var posx = 0;
	var posy = 0;
	

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');
		if (e[0] == "forward")
		{
			posx += parseInt(e[1]);
		}
		if (e[0] == "down")
		{
			posy += parseInt(e[1]);

		}
		if (e[0] == "up")
		{
			posy -= parseInt(e[1]);
		}
	}
	console.log(posx * posy);
}

function ex01() {
	var databuf = fs.readFileSync("input.txt");
	var datastr = databuf.toString().split('\n');

	var posx = 0;
	var posy = 0;
	var aim = 0;
	

	for (let i = 0; i < datastr.length; i++) {
		const e = datastr[i].split(' ');
		if (e[0] == "forward")
		{
			posx += parseInt(e[1]);
			if (aim)
				posy += parseInt(e[1]) * aim;
		}
		if (e[0] == "down")
		{
			// posy += parseInt(e[1]);
			aim += parseInt(e[1]);
		}
		if (e[0] == "up")
		{
			// posy -= parseInt(e[1]);
			aim -= parseInt(e[1]);
		}
	}
	console.log(posx * posy);
}
