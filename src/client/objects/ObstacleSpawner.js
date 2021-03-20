import Obstacle from './obstacle/default.js';
import Lava from './obstacle/lava.js';

export default class ObstacleSpawner {
	constructor(data) {
		this.data = data;
		this.show = false;
	}
	spawn (world) {
		if (!this.data.type) {
			this.data.type = 'default';
		}
		if (this.data.type === 'default') {
			world.obstacles.push(new Obstacle(this.data));
		} else if (this.data.type === 'lava') {
			world.obstacles.push(new Lava(this.data));
		}
	}
}
/*
	{	
		x: number,
		y: number,
		width: number,
		height: number,
		type: string,
	}
*/