import constants from '../../constants.js';
import round from '../../util/round.js';
import lerp from '../../util/lerp.js';
import Bullet from '../bullet.js';

const enemy = constants.enemy;

const capitalizeFirstLetter = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export default class Enemy {
    constructor(data) {
        this.inherit(enemy[capitalizeFirstLetter(data.type)]);
        this.x = Math.random() * (data.bound.w - this.radius) + data.bound.x + this.radius;
        this.y = Math.random() * (data.bound.h - this.radius * 2) + data.bound.y + this.radius;
        this.angle = Math.random() * Math.PI * 2;
        this.xv = Math.cos(this.angle) * this.speed;
        this.yv = Math.sin(this.angle) * this.speed;
        this.maxHealth  = this.health; // health gets to 100 from inherit
		this.lerpHealth = this.lerpRadius = 0;
        this.bound = data.bound;
        this.knockVel = { x: 0, y: 0 };
        this.currentReload = Math.random() * this.reload;
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

    update(state, delta) {
		if (this.health <= 0) {
			this.dying = true;
		}
        if (!this.dying) {
            this.move(state, delta);
            this.collisionOnEnemy(state);
            this.enemyEffect(state, delta);
        } else if (this.dying) {
			this.health = 0;
            this.deathEffect(delta);
        }
		this.changeValues(delta);
    }

    move(state, delta) {
        this.x += this.knockVel.x * delta;
        this.y += this.knockVel.y * delta;

        this.knockVel.x *= Math.pow(this.knockFriction, delta * 60);
        this.knockVel.y *= Math.pow(this.knockFriction, delta * 60);

        this.x += this.xv * delta;

        if (this.x + this.radius >= this.bound.x + this.bound.w) {
            this.xv = -this.xv;
            this.x = (this.bound.x + this.bound.w) * 2 - this.x - this.radius * 2;
        }
        else if (this.x - this.radius <= this.bound.x) {
            this.xv = -this.xv;
            this.x = this.bound.x * 2 - this.x + this.radius * 2;
        }
        this.y += this.yv * delta;
        if (this.y + this.radius >= this.bound.y + this.bound.h) {
            this.yv = -this.yv;
            this.y = (this.bound.y + this.bound.h) * 2 - this.y - this.radius * 2;
        }
        else if (this.y - this.radius <= this.bound.y) {
            this.yv = -this.yv;
            this.y = this.bound.y * 2 - this.y + this.radius * 2;
        }
    }
    collisionOnEnemy(state) {
        for (let i = 0; i < state.world.enemy.length; i++) {
            const other = state.world.enemy[i];
            if (other.id === this.id || other.dying) continue;
            if ((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y) < (this.radius + other.radius) * (this.radius + other.radius)) {
                const vCollision = { x: other.x - this.x, y: other.y - this.y };
                const distance = Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
                const vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
                const vRelativeVelocity = { x: this.xv - other.xv, y: this.yv - other.yv };
                const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                if (speed < 0) {
                    continue;
                }
				if (!other.stationary) {
					this.xv -= (speed * vCollisionNorm.x);
					this.yv -= (speed * vCollisionNorm.y);
					this.knockVel.x -= (speed * vCollisionNorm.x);
					this.knockVel.y -= (speed * vCollisionNorm.y);
					this.redDamageAlpha = 150;
					other.xv += (speed * vCollisionNorm.x);
					other.yv += (speed * vCollisionNorm.y);
					other.knockVel.x += (speed * vCollisionNorm.x);
					other.knockVel.y += (speed * vCollisionNorm.y);
					other.redDamageAlpha = 150;
				}
            }
        }
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
					// const target = intercept({ x: this.x, y: this.y }, 
					// 	{ x: state.world.player.x, 
					// 	y: state.world.player.y, 
					// 	vx: state.world.player.xv, 
					// 	vy: state.world.player.yv }, this.bulletSpeed);
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
