import Turret from './turret.js';
import round from '../../util/round.js';
import Bullet from '../bullet.js';

export default class Fire extends Turret {
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
                    state.world.bullets.push(
                        new Bullet({
                            x: this.x,
                            y: this.y,
                            angle: this.angle,
                            radius: Math.round(this.bulletRadius + this.bulletSizeRandomness * Math.random()),
                            speed: this.bulletSpeed,
                            length: this.bulletLength,
                            parentId: this.id,
                            color: this.bulletColor,
							damage: this.damagePerShot,
							parentRadius: this.radius * 0.8
                        })
                    );
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
            state.world.player.x = this.x + (this.radius + 0.05 + state.world.player.radius) * xv;
            state.world.player.y = this.y + (this.radius + 0.05 + state.world.player.radius) * yv;
        }
    }
}
