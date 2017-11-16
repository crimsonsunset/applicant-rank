const input = document.getElementsByClassName('input')[0];
const output = document.getElementsByClassName('output')[0];
const weightInputArr = document.getElementsByTagName('input');

//set weight defaults
let weights = {
	technical_skill: 3,
	project_breadth: 2,
	passion_for_web: 1
};

rankInterns = (internArr) => {



	internArr.forEach((e, i) => {

		let scoreArr = [];
		Object.keys(e).forEach((e2, i2) => {
			if (e2 != 'name') {
				scoreArr.push(e[e2] * weights[e2]);
			}
		});

		internArr[i].score = scoreArr.reduce((total, num) => {
			return total + num
		});
		internArr[i].outputStr = `${internArr[i].name}: ${internArr[i].score}`

	});

	internArr.sort((a, b) => {
		const winner = b.score - a.score;
		return winner;
	});

	return internArr;

};

function validateJSON(e) {

	let {value: JSONstr} = this;
	try {
		JSONstr = JSON.parse(JSONstr);
	} catch (e) {
		input.classList.toggle('invalid');
		return false;
	}
	input.classList.toggle('valid');
	rankAndSort(JSONstr)
}


function rankAndSort(inArr) {
	let finalArr = rankInterns(inArr);
	output.innerHTML = '';
	finalArr.forEach((e, i) => {
		let newItem = document.createElement("li");
		newItem.appendChild(document.createTextNode(e.outputStr));
		output.appendChild(newItem);
	});
}


function changeWeight(e) {
	let {value, id} = this;
	weights[id] = value;
}

input.addEventListener('keyup', validateJSON);

// weightInputArr.forEach((e, i) => {
// 	e.addEventListener('change', changeWeight);
// });


for (let i = 0; i < weightInputArr.length; i++) {
	weightInputArr[i].addEventListener('change', changeWeight);
}
