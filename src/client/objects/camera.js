
export default class Camera {
	constructor (data) {
		this.x = data.x;
		this.y = data.y;
		this.speed = data.speed ?? 2.5;
		this.xv = 0;
		this.yv = 0;
		this.friction = data.friction ?? 0.4;
	}
	update (player, delta) {
	//   this.xv += (window.mouse.x - this.x) * 0.05 * delta * this.speed;
    //   this.yv += (window.mouse.y - this.y) * 0.05 * delta * this.speed;
    //   this.xv += (player.x - this.x) * 0.95 * delta * this.speed * 5;
    //   this.yv += (player.y - this.y) * 0.95 * delta * this.speed * 5;
    //   this.xv *= Math.pow(this.friction, delta * 60);
    //   this.yv *= Math.pow(this.friction, delta * 60);
    //   this.x += this.xv;
    //   this.y += this.yv;
		this.x = player.x;
		this.y = player.y;
	}
}