import Enemy from './basic.js';
import round from '../../util/round.js';
import Bullet from '../bullet.js';


export default class Shotgun extends Enemy {
	constructor(data) {
		super(data);
	}
	enemyEffect(state, delta) {
		this.currentReload -= delta;
        if (this.currentReload <= 0) {
            const dist = { x: state.world.player.x - this.x, y: state.world.player.y - this.y };
            if (Math.abs(dist.x) < this.range + state.world.player.radius
                && Math.abs(dist.y) < this.range + state.world.player.radius) {
                const distance = dist.x * dist.x + dist.y * dist.y;
                if (distance < (this.range + state.world.player.radius) * (this.range + state.world.player.radius)) {
                    this.angle = round(Math.atan2(state.world.player.y - this.y, state.world.player.x - this.x), 5);
					const angles = [this.angle - 0.2, this.angle, this.angle + 0.2];
					for (const angle of angles) {
						state.world.bullets.push(
							new Bullet({
								x: this.x,
								y: this.y,
								angle,
								radius: this.bulletRadius,
								speed: this.bulletSpeed,
								length: this.bulletLength,
								parentId: this.id,
								color: this.bulletColor,
								damage: this.damagePerShot,
								parentRadius: this.radius * 0.8
							})
						);
					}
                    this.currentReload = this.reload;
                }
            }
        }
        const dist = { x: state.world.player.x - this.x, y: state.world.player.y - this.y };
        const distance = dist.x * dist.x + dist.y * dist.y;
        if (distance < (this.radius + state.world.player.radius) * (this.radius + state.world.player.radius)) {
            const magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y) || 1;
            const xv = dist.x / magnitude;
            const yv = dist.y / magnitude;
            state.world.player.knockVel.x += xv * this.knock * 30;
            state.world.player.knockVel.y += yv * this.knock * 30;
			state.world.player.health -= this.damagePerCollision;
			state.world.player.redDamageAlpha = 255;
			this.health -= this.damagePerCollision;
			this.redDamageAlpha = 255;
            this.xv += -xv * this.knock * 30;
            this.yv += -yv * this.knock * 30;
			this.knockVel.x += -xv * this.knock * 30;
            this.knockVel.y += -yv * this.knock * 30;
        }
    }
}