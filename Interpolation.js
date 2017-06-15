/*!
 * Interpolation
 * This module implements full interpolation of any polynomial function using the Lagrange Interpolating Polynomial Technique
 *
 * @name	Interpolation
 * @type	Javascript Module
 * @author	Guilherme Rossato
 * @year	2017
 * @licence	The Unlicense:  http://unlicense.org/  (no warranties, free to do use / edit / share / sell / claim)
 *
 * Usage Example
 *	Given the points (2,4), (3,6), (4,8), what is y for x=6? [Answer: y = 12]
 * 	Interpolation.add(2,4).add(3,6).add(4,8).at(6) // returns 12;
*/

Object.defineProperty(((typeof exports === "undefined")? window : exports), "Interpolation", {
	get: function() {
		let pts = [];
		let getIndexFor = function(x) {
			let index, len = pts.length;
			for (index = 0; index < len; index++) {
				if (x < pts[index][0]) {
					break;
				}
			}
			return index;
		}
		return {
			add: function(x, y) {
				let index = getIndexFor(x);
				if (index == 0)
					pts.unshift([x, y]);
				else if (index == pts.length)
					pts.push([x, y]);
				else
					pts.splice(index, 0, [x, y]);
				return this;
			},
			at: function(x) {
				let n = pts.length, acc = 0, ml, j, k;
				for (j = 0; j < pts.length; j++) {
					ml = pts[j][1];
					for (k = 0; k < n; k++) {
						if (k != j) {
							ml *= (x - pts[k][0])/(pts[j][0] - pts[k][0]);
						}
					}
					acc+=ml;
				}
				return acc;
			}
		}
	}
});