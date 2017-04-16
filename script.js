
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
