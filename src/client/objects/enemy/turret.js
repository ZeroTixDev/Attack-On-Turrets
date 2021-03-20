import constants from '../../constants.js';
import round from '../../util/round.js';
import lerp from '../../util/lerp.js';
import Bullet from '../bullet.js';

const enemy = constants.enemy;

const capitalizeFirstLetter = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export default class Turret {
    constructor(data) {
        this.inherit(enemy[capitalizeFirstLetter(data.type)]);
        this.x = Math.random() * (data.bound.w - this.radius) + data.bound.x + this.radius;
        this.y = Math.random() * (data.bound.h - this.radius * 2) + data.bound.y + this.radius;
        this.angle = Math.random() * Math.PI * 2;
		this.xv = this.yv = 0;
        // this.xv = Math.cos(this.angle) * this.speed;
        // this.yv = Math.sin(this.angle) * this.speed;
        this.maxHealth  = this.health; // health gets to 100 from inherit
		this.lerpHealth = this.lerpRadius = 0;
		this.stationary = true;
        this.bound = data.bound;
        // this.knockVel = { x: 0, y: 0 };
        this.currentReload = this.reload;
        this.id = Math.random();
        this.dying = false;
        this.alpha = 1;
		this.redDamageAlpha = 0;
    }
    inherit(obj) {
        let object;
        if (!obj || obj === undefined) {
            object = enemy['Default'];
            console.error('Couldnt load enemy type, fellback to default ¯\\_(ツ)_/¯');
        } else {
            object = Object.assign(enemy['Default'], obj);
			// console.log(object);
        }
        for (const key of Object.keys(obj)) {
            this[key] = obj[key];
        }
    }
	changeValues(delta) {
		const time = Math.min(delta * 20, 1);
		this.lerpHealth = lerp(this.lerpHealth, this.health, time < 1 ? time / 2: time);
		if (Math.abs(this.lerpRadius - this.radius) < 0.1) {
			this.lerpRadius = this.radius;
		} else {
			this.lerpRadius = lerp(this.lerpRadius, this.radius, time < 1 ? time / 4: time);
		}
		this.redDamageAlpha -= 255 * 2 * delta;
		if (this.health < this.maxHealth) {
			this.health = Math.min(this.health + (this.healthRegen) * delta, this.maxHealth);
		}
	}
	boundFromWorld(state) {
		if (this.x + this.radius >= this.bound.x + this.bound.w) {
            this.x = (this.bound.x + this.bound.w) * 2 - this.x - this.radius * 2;
        }
        else if (this.x - this.radius <= this.bound.x) {
            this.x = this.bound.x * 2 - this.x + this.radius * 2;
        }
        if (this.y + this.radius >= this.bound.y + this.bound.h) {
            this.y = (this.bound.y + this.bound.h) * 2 - this.y - this.radius * 2;
        }
        else if (this.y - this.radius <= this.bound.y) {
            this.y = this.bound.y * 2 - this.y + this.radius * 2;
        }


		for (let i = 0; i < state.world.obstacles.length; i++) {
			const obstacle = state.world.obstacles[i];
			const rectHalfSizeX = obstacle.width / 2
			const rectHalfSizeY = obstacle.height / 2
			const rectCenterX = obstacle.x + rectHalfSizeX;
			const rectCenterY = obstacle.y + rectHalfSizeY;
			const distX = Math.abs(this.x - rectCenterX);
			const distY = Math.abs(this.y - rectCenterY);
			if ((distX < rectHalfSizeX + this.radius) && (distY < rectHalfSizeY + this.radius)) {
				let relX;
				if (this.x > rectCenterX) {
					relX = this.x - this.radius - rectCenterX - rectHalfSizeX;
				}
				else {
					relX = - rectCenterX + rectHalfSizeX + this.x + this.radius;
				}
				let relY;
				if (this.y > rectCenterY) {
					relY = this.y - this.radius - rectCenterY - rectHalfSizeY;
				}
				else {
					relY = - rectCenterY + rectHalfSizeY + this.y + this.radius;
				}
				if (Math.abs(relX) < Math.abs(relY)) {
					if (relX < 0) {
						this.x = rectCenterX + rectHalfSizeX + this.radius;
					} else {
						this.x = rectCenterX - rectHalfSizeX - this.radius;
					}
				} else {
					if (relY > 0) {
						this.y = rectCenterY - rectHalfSizeY - this.radius;
					} else {
						this.y = rectCenterY + rectHalfSizeY + this.radius;
					}
				}
			}
		}
	}

    update(state, delta) {
		if (this.health <= 0) {
			this.dying = true;
		}
        if (!this.dying) {
            this.enemyEffect(state, delta);
        } else if (this.dying) {
			this.health = 0;
            this.deathEffect(delta);
        }
		this.boundFromWorld(state);
		this.changeValues(delta);
    }
    deathEffect(delta) {
        this.alpha -= delta * 5;
        this.radius += delta * 30;
        if (this.alpha < 0) {
           this.delete = true;
        }
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
                            radius: this.bulletRadius,
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
