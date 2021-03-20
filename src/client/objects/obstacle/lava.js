export default class Obstacle {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
		this.width = data.width;
		this.height = data.height;
		this.type = data.type;
		this.max = 50;
		this.g = Math.random() * this.max;
		this.up = Math.random() < 0.5 ? true: false;
		this.color = `rgb(255, ${this.g}, 0)`;
	}
	update(state, delta) {
		if (this.up) {
			this.g += 200 * delta;
		} else {
			this.g -= 200 * delta;
		}

		if (this.g > this.max) {
			this.g = this.max;
			this.up = false;
		}
		if (this.g < 0) {
			this.g = 0;
			this.up = true;
		}

		this.color = `rgb(255, ${this.g}, 0)`;
	}
}