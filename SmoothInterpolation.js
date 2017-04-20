/*!
* SmoothInterpolation
* This module implements smooth linear, quadratic or cubic interpolation in function of points that the equation crosses
*
* @author: Guilherme Rossato
* @year: 2017
*
*/

/* Usage Example

*/

Object.defineProperty(this, "SmoothInterpolation", {
	get: function() {
		let pts = [];
		return {
			add: function(x, y) {
				let index;
				for (index = 0; index < pts.length && pts[index][0] > x; i++);
				if (index == 0)
					pts.unshift([x, y]);
				else if (index == pts.length)
					pts.push([x, y]);
				else
					pts.splice(index, 0, [x, y]);
				console.log(pts.join());
				return this;
			},
			at: function(x) {
				let distances = pts.map(pt => Math.abs(pt[0]-x));
				let distanceSum = distances.reduce((before,current) => before+current);
				distances = distances.map(value => value/distanceSum).map(value => value*value);
				return distances;
			}
		}
	}
});
