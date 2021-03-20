export default class Obstacle {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
		this.width = data.width;
		this.height = data.height;
		this.type = data.type;
		this.color = '#020c1c';
	}
	update(state, delta) {}
}