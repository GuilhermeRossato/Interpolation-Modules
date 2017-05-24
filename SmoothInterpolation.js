/*!
* SmoothInterpolation
* This module implements a primitive smooth curved linear function of n points
*
* @author	Guilherme Rossato
* @year		2017
*
*/

/* Usage Example
* SmoothInterpolation.add(0,0).add(1,0.25).add(2,1).at(1.5)  === 0.625
* SmoothInterpolation.add(0,0).add(1,0.25).add(2,1).add(4,1).add(3,0).at(x); // Where x varies, preferably from 0 to 4
*/

Object.defineProperty(this, "SmoothInterpolation", {
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
		let ease = function(x) {
			return (x*x*x*(x*(x*6 - 15) + 10));
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
				let i = 0;
				for (i = 0; i < pts.length && (x >= i); i++);
				let prevElement, prevHeight, nextHeight;
				prevElement = (i>0)?pts[i-1]:pts[0];
				prevHeight = prevElement[1];
				nextHeight = (i<pts.length)?pts[i][1]:pts[pts.length-1][1];
				return (prevHeight + (nextHeight - prevHeight)*ease(x - prevElement[0]));
			}
		}
	}
});