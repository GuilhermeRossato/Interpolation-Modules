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
		let getIndexFor = function(x) {
			let index, len = pts.length;
			for (index = 0; index < len; index++) {
				if (x < pts[index][0]) {
					break;
				}
			}
			return index;
		}
		let quadratic = function(index, x) {
			let x_2 = x * x
			  , x0_2 = pts[index][0] * pts[index][0]
			  , x1_2 = pts[1+index][0] * pts[1+index][0]
			  , x2_2 = pts[2+index][0] * pts[2+index][0];
			return (x_2*pts[1+index][0]*pts[index][1]-x*x1_2*pts[index][1]-x_2*pts[2+index][0]*pts[index][1]+x1_2*pts[2+index][0]*pts[index][1]+x*x2_2*pts[index][1]-pts[1+index][0]*x2_2*pts[index][1]-x_2*pts[index][0]*pts[1+index][1]+x*x0_2*pts[1+index][1]+x_2*pts[2+index][0]*pts[1+index][1]-x0_2*pts[2+index][0]*pts[1+index][1]-x*x2_2*pts[1+index][1]+pts[index][0]*x2_2*pts[1+index][1]+x_2*pts[index][0]*pts[2+index][1]-x*x0_2*pts[2+index][1]-x_2*pts[1+index][0]*pts[2+index][1]+x0_2*pts[1+index][0]*pts[2+index][1]+x*x1_2*pts[2+index][1]-pts[index][0]*x1_2*pts[2+index][1])/(x0_2*pts[1+index][0]-pts[index][0]*pts[1+index][0]*pts[1+index][0]-x0_2*pts[2+index][0]+x1_2*pts[2+index][0]+pts[index][0]*x2_2-pts[1+index][0]*x2_2);
		}
		let cubic = function(index, x) {
			let x_2 = x * x
			  , x_3 = x_2 * x
			  ,	x0_2 = pts[index][0] * pts[index][0]
			  , x0_3 = x0_2 * pts[index][0]
			  ,	x1_2 = pts[1+index][0] * pts[1+index][0]
			  , x1_3 = x1_2 * pts[1+index][0]
			  ,	x2_2 = pts[2+index][0] * pts[2+index][0]
			  , x2_3 = x2_2 * pts[2+index][0];
			return (x_3*x1_2*pts[2+index][0]*pts[index][1]-x_2*x1_3*pts[2+index][0]*pts[index][1]-x_3*pts[1+index][0]*x2_2*pts[index][1]+x*x1_3*x2_2*pts[index][1]+x_2*pts[1+index][0]*x2_3*pts[index][1]-x*x1_2*x2_3*pts[index][1]-x_3*x1_2*pts[3+index][0]*pts[index][1]+x_2*x1_3*pts[3+index][0]*pts[index][1]+x_3*x2_2*pts[3+index][0]*pts[index][1]-x1_3*x2_2*pts[3+index][0]*pts[index][1]-x_2*x2_3*pts[3+index][0]*pts[index][1]+x1_2*x2_3*pts[3+index][0]*pts[index][1]+x_3*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x*x1_3*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]+x1_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]+x*x2_3*pts[3+index][0]*pts[3+index][0]*pts[index][1]-pts[1+index][0]*x2_3*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x_2*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]+x*x1_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]+x_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x1_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]+pts[1+index][0]*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[index][1]-x_3*x0_2*pts[2+index][0]*pts[1+index][1]+x_2*x0_3*pts[2+index][0]*pts[1+index][1]+x_3*pts[index][0]*x2_2*pts[1+index][1]-x*x0_3*x2_2*pts[1+index][1]-x_2*pts[index][0]*x2_3*pts[1+index][1]+x*x0_2*x2_3*pts[1+index][1]+x_3*x0_2*pts[3+index][0]*pts[1+index][1]-x_2*x0_3*pts[3+index][0]*pts[1+index][1]-x_3*x2_2*pts[3+index][0]*pts[1+index][1]+x0_3*x2_2*pts[3+index][0]*pts[1+index][1]+x_2*x2_3*pts[3+index][0]*pts[1+index][1]-x0_2*x2_3*pts[3+index][0]*pts[1+index][1]-x_3*pts[index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x*x0_3*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]-x0_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]-x*x2_3*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+pts[index][0]*x2_3*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x_2*pts[index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]-x*x0_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]-x_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x0_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]-pts[index][0]*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[1+index][1]+x_3*x0_2*pts[1+index][0]*pts[2+index][1]-x_2*x0_3*pts[1+index][0]*pts[2+index][1]-x_3*pts[index][0]*x1_2*pts[2+index][1]+x*x0_3*x1_2*pts[2+index][1]+x_2*pts[index][0]*x1_3*pts[2+index][1]-x*x0_2*x1_3*pts[2+index][1]-x_3*x0_2*pts[3+index][0]*pts[2+index][1]+x_2*x0_3*pts[3+index][0]*pts[2+index][1]+x_3*x1_2*pts[3+index][0]*pts[2+index][1]-x0_3*x1_2*pts[3+index][0]*pts[2+index][1]-x_2*x1_3*pts[3+index][0]*pts[2+index][1]+x0_2*x1_3*pts[3+index][0]*pts[2+index][1]+x_3*pts[index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x*x0_3*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x_3*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]+x0_3*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]+x*x1_3*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-pts[index][0]*x1_3*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x_2*pts[index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]+x*x0_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]+x_2*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x0_2*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x*x1_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]+pts[index][0]*x1_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]*pts[2+index][1]-x_3*x0_2*pts[1+index][0]*pts[3+index][1]+x_2*x0_3*pts[1+index][0]*pts[3+index][1]+x_3*pts[index][0]*x1_2*pts[3+index][1]-x*x0_3*x1_2*pts[3+index][1]-x_2*pts[index][0]*x1_3*pts[3+index][1]+x*x0_2*x1_3*pts[3+index][1]+x_3*x0_2*pts[2+index][0]*pts[3+index][1]-x_2*x0_3*pts[2+index][0]*pts[3+index][1]-x_3*x1_2*pts[2+index][0]*pts[3+index][1]+x0_3*x1_2*pts[2+index][0]*pts[3+index][1]+x_2*x1_3*pts[2+index][0]*pts[3+index][1]-x0_2*x1_3*pts[2+index][0]*pts[3+index][1]-x_3*pts[index][0]*x2_2*pts[3+index][1]+x*x0_3*x2_2*pts[3+index][1]+x_3*pts[1+index][0]*x2_2*pts[3+index][1]-x0_3*pts[1+index][0]*x2_2*pts[3+index][1]-x*x1_3*x2_2*pts[3+index][1]+pts[index][0]*x1_3*x2_2*pts[3+index][1]+x_2*pts[index][0]*x2_3*pts[3+index][1]-x*x0_2*x2_3*pts[3+index][1]-x_2*pts[1+index][0]*x2_3*pts[3+index][1]+x0_2*pts[1+index][0]*x2_3*pts[3+index][1]+x*x1_2*x2_3*pts[3+index][1]-pts[index][0]*x1_2*x2_3*pts[3+index][1])/(x0_3*x1_2*pts[2+index][0]-x0_2*x1_3*pts[2+index][0]-x0_3*pts[1+index][0]*x2_2+pts[index][0]*x1_3*x2_2+x0_2*pts[1+index][0]*x2_3-pts[index][0]*x1_2*x2_3-x0_3*x1_2*pts[3+index][0]+x0_2*x1_3*pts[3+index][0]+x0_3*x2_2*pts[3+index][0]-x1_3*x2_2*pts[3+index][0]-x0_2*x2_3*pts[3+index][0]+x1_2*x2_3*pts[3+index][0]+x0_3*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]-pts[index][0]*x1_3*pts[3+index][0]*pts[3+index][0]-x0_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]+x1_3*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]+pts[index][0]*x2_3*pts[3+index][0]*pts[3+index][0]-pts[1+index][0]*x2_3*pts[3+index][0]*pts[3+index][0]-x0_2*pts[1+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]+pts[index][0]*x1_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]+x0_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]-x1_2*pts[2+index][0]*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]-pts[index][0]*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0]+pts[1+index][0]*x2_2*pts[3+index][0]*pts[3+index][0]*pts[3+index][0])
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
				if (pts.length < 2) {
					return pts[0][1];
				} else if (pts.length < 3) {
					return (x * pts[0][1] - pts[1][0] * pts[0][1] - x * pts[1][1] + pts[0][0] * pts[1][1]) / (pts[0][0] - pts[1][0]);
				} else if (pts.length < 4) {
					let index = 0;
					return quadratic(0, x);
				} else {
					let index = getIndexFor(x);
					if (index <= 1) {
						return quadratic(0, x);
					} else if (index >= pts.length-1) {
						return quadratic(pts.length-3, x);
					} else {
						return cubic(index-2, x);
					}
				}
			}
		}
	}
});