var f = (x)=>SmoothInterpolation.add(7,3).add(19,2).add(9,2).add(12,4).add(14,4.5).add(20, 0).at(x);

var grapher = new Grapher({
	f: f,
	rangeX: [7,14],
	rangeY: [1,5],
	width: 300,
	height: 300
})

function parseCalculatorNumber(str) {
	let newStr = "";
	let lastElement = "";
	for (let i = 0; i < str.length; i++) {
		if (str[i] === "(" || str[i] === ")" || str[i] === "+" || str[i] === "-" || str[i] === "/") {
			lastElement = "";
			newStr += str[i];
		} else {
			if (str[i] === "x" || str[i] === "y") {
				if (lastElement[0] === "x" || lastElement[0] === "y") {
					newStr += "*";
				}
				newStr += str[i];
				lastElement = str[i];
			} else if (str[i] === "^") {
				i = i + 1;
				let times = parseInt(str[i]);
				newStr += ("*" + lastElement).repeat(times - 1);
			} else if (str[i] >= "0" && str[i] <= "9") {
				newStr += str[i];
				if (lastElement === "") {
					newStr += "*"
				} else {
					lastElement += str[i];
				}
			}
		}
	}
	return newStr;
}