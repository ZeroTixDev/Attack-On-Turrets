import constants from '../constants.js';
import Gun from './guns/gun.js';
import lerp from '../util/lerp.js';

const player = constants.player;

export default class Player {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.radius = data.radius ?? player.radius;
        this.xv = 0;
        this.yv = 0;
        this.angle = 0;
        this.friction = data.friction ?? player.friction;
        this.healthRegen = player.healthRegen;
        this.accel = data.accel ?? player.accel;
        this.maxSpeed = data.maxSpeed ?? player.maxSpeed;
        this.maxHealth = this.health = player.health;
        this.lerpHealth = this.lerpRadius = 0;
        this.knockVel = { x: 0, y: 0 };
        this.redDamageAlpha = 0;
        this.id = Math.random();
        this.gun = Gun.create('Pistol');
    }
    accelerate(delta) {
        if (window.input.left) {
            this.xv -= this.accel * delta;
        }
        if (window.input.right) {
            this.xv += this.accel * delta;
        }
        if (window.input.up) {
            this.yv -= this.accel * delta;
        }
        if (window.input.down) {
            this.yv += this.accel * delta;
        }
    }
    restrictSpeed() {
        this.xv = Math.max(-this.maxSpeed, Math.min(this.xv, this.maxSpeed));
        this.yv = Math.max(-this.maxSpeed, Math.min(this.yv, this.maxSpeed));
    }
    applyFriction(delta) {
        this.xv *= Math.pow(this.friction, delta * 30);
        this.yv *= Math.pow(this.friction, delta * 30);
        this.knockVel.x *= Math.pow(this.friction, delta * 20);
        this.knockVel.y *= Math.pow(this.friction, delta * 20);
    }
    applyVelocity(delta) {
        this.x += this.xv * delta;
        this.y += this.yv * delta;
        this.x += this.knockVel.x * delta;
        this.y += this.knockVel.y * delta;
    }
    boundPlayerFromWorld(state) {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
        }
        if (this.x + this.radius > state.world.width) {
            this.x = state.world.width - this.radius;
        }
        if (this.y + this.radius > state.world.height) {
            this.y = state.world.height - this.radius;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
        }
    }
    boundPlayerFromObstacle(obstacle) {
        const rectHalfSizeX = obstacle.width / 2
        const rectHalfSizeY = obstacle.height / 2
        const rectCenterX = obstacle.x + rectHalfSizeX;
        const rectCenterY = obstacle.y + rectHalfSizeY;
        const distX = Math.abs(this.x - rectCenterX);
        const distY = Math.abs(this.y - rectCenterY);
        if ((distX < rectHalfSizeX + this.radius) && (distY < rectHalfSizeY + this.radius)) {
			if (obstacle.type === 'lava') {
				this.health = -this.maxHealth;
				this.redDamageAlpha = 500;
			}
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
                    this.xv = 0;
                } else {
                    this.x = rectCenterX - rectHalfSizeX - this.radius;
                    this.xv = 0;
                }
            } else {
                if (relY > 0) {
                    this.y = rectCenterY - rectHalfSizeY - this.radius;
                    this.yv = 0;
                } else {
                    this.y = rectCenterY + rectHalfSizeY + this.radius;
                    this.yv = 0;
                }
            }
        }
    }
    boundPlayer(state) {
        this.boundPlayerFromWorld(state);

        for (let i = 0; i < state.world.obstacles.length; i++) {
            this.boundPlayerFromObstacle(state.world.obstacles[i]);
        }

        this.boundPlayerFromWorld(state);
    }
    checkPlayerWon(state) {
        const portal = state.world.portal;
        if (this.x + this.radius > portal.x
            && this.x - this.radius < portal.x + portal.width
            && this.y + this.radius > portal.y
            && this.y - this.radius < portal.y + portal.height
            && !state.enteringNextLevel && state.coins === state.coinsCollected) {
            state.won = true;
        }
    }
    changeValues(delta) {
        const time = Math.min(delta * 20, 1);
        this.lerpHealth = lerp(this.lerpHealth, this.health, time < 1 ? time / 2 : time);
        this.redDamageAlpha -= 255 * 2 * delta;
        if (Math.abs(this.lerpRadius - this.radius) < 0.1) {
            this.lerpRadius = this.radius;
        } else {
            this.lerpRadius = lerp(this.lerpRadius, this.radius, time < 1 ? time / 4 : time);
        }
        if (this.health < this.maxHealth) {
            this.health = Math.min(this.health + (this.healthRegen) * delta, this.maxHealth);
        }
    }
    update(state, delta) {
        this.accelerate(delta);

        this.changeValues(delta);

        this.restrictSpeed();

        this.applyFriction(delta);

        this.applyVelocity(delta);

        this.boundPlayer(state);

        this.checkPlayerWon(state);

        this.angle = window.angle;

        this.gun.update(state, delta);
    }
}