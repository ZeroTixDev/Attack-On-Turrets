import Enemy from './basic.js';
import round from '../../util/round.js';
import Bullet from '../bullet.js';


export default class Bouncy extends Enemy {
	constructor(data) {
		super(data);
	}
	enemyEffect(state, delta) {
		// removed shooting

		// more bouncy code
        const dist = { x: state.world.player.x - this.x, y: state.world.player.y - this.y };
        const distance = dist.x * dist.x + dist.y * dist.y;
        if (distance < (this.radius + state.world.player.radius) * (this.radius + state.world.player.radius)) {
            const magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y) || 1;
            const xv = dist.x / magnitude;
            const yv = dist.y / magnitude;
            state.world.player.knockVel.x += xv * this.knock * 40; // diference is more bouncy
            state.world.player.knockVel.y += yv * this.knock * 40;
			state.world.player.health -= this.damagePerCollision;
			state.world.player.redDamageAlpha = 255;
			this.health -= this.damagePerCollision;
			this.redDamageAlpha = 255;
            this.xv += -xv * this.knock * 10;
            this.yv += -yv * this.knock * 10;
			this.knockVel.x += -xv * this.knock * 10;
            this.knockVel.y += -yv * this.knock * 10;
        }
    }
}