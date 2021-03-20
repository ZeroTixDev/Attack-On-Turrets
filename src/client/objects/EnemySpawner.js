import Enemy from './enemy/basic.js';
import Turret from './enemy/turret.js';
import Aimbot from './enemy/aimbot.js';
import Rotating from './enemy/rotating.js';
import Fire from './enemy/fire.js';
import Bouncy from './enemy/bouncy.js';
import Shotgun from './enemy/shotgun.js';
import Idler from './enemy/idler.js';
import Boss from './enemy/boss.js';

export default class EnemySpawner {
	constructor(data) {
		this.data = data;
		this.show = this.data?.show !== undefined ? this.data.show: true;
	}
	spawn (world) {
		const param = {
			bound: {
				x: this.data.x,
				y: this.data.y,
				w: this.data.width,
				h: this.data.height,
			},
			type: this.data.type
		}
		for (let i = 0; i < this.data.count; i++) {
			if (this.data.type === 'basic') {
				world.enemy.push(new Enemy(param));
			} else if (this.data.type === 'turret') {
				world.enemy.push(new Turret(param))
			} else if (this.data.type === 'aimbot') {
				world.enemy.push(new Aimbot(param));
			} else if (this.data.type === 'rotating') {
				world.enemy.push(new Rotating(param));
			} else if (this.data.type === 'bouncy') {
				world.enemy.push(new Bouncy(param));
			} else if (this.data.type === 'fire') {
				world.enemy.push(new Fire(param));
			} else if (this.data.type === 'shotgun') {
				world.enemy.push(new Shotgun(param));
			} else if (this.data.type === 'idler') {
				world.enemy.push(new Idler(param));
			} else if (this.data.type === 'boss') {
				world.enemy.push(new Boss(param));
			}
		}
	}
}
/*
	{	
		x: number,
		y: number,
		width: number,
		height: number,
		count: number,
		speed: number,
		type: string,
		radius: number,
	}
*/