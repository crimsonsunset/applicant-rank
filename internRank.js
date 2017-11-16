const input = document.getElementsByClassName('input')[0];
const output = document.getElementsByClassName('output')[0];

rankInterns = (internArr) => {

	const weights = {
		technical_skill_WEIGHT: 3,
		project_breadth_WEIGHT: 2,
		passion_for_web_WEIGHT: 1
	};

	internArr.forEach((e, i) => {

		let scoreArr = [];
		Object.keys(e).forEach((e2, i2) => {
			if (e2 != 'name') {
				scoreArr.push(e[e2] * weights[`${e2}_WEIGHT`]);
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

// let finalArr = rankInterns(interns);
//
// finalArr.sort((a, b) => {
// 	return a.score + b.score;
// });
//
// console.log('Final Scores Are: ');
// console.log(finalArr);


function validateJSON(e) {

	let {value: JSONstr} = this;

	// console.log('asda', JSONstr)
	try {
		JSONstr = JSON.parse(JSONstr);
	} catch (e) {
		input.classList.toggle('invalid');
		// console.log('asda false')
		return false;
	}
	input.classList.toggle('valid');
	rankAndSort(JSONstr)
}


function rankAndSort(inArr) {

	let finalArr = rankInterns(inArr);

	finalArr.forEach((e, i) => {
		let newItem = document.createElement("li");
		newItem.appendChild(document.createTextNode(e.outputStr));
		output.appendChild(newItem);
	});


	output.value = JSON.stringify(finalArr, null, 2)
}

input.addEventListener('keyup', validateJSON);