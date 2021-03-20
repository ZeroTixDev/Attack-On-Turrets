export default class Coin {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
		this.radius = data.radius;
		this.timer = 0;
	}
	update(state, delta) {
		this.timer += delta;
		this.y += Math.sin(this.timer * 30);
		this.x += Math.cos(this.timer * 30);
		const player = state.world.player;
		const dist = { x: this.x - player.x, y: this.y - player.y};
		if (dist.x * dist.x + dist.y * dist.y < (this.radius + player.radius) * (this.radius + player.radius)) {
			this.delete = true;
		}
	}
}