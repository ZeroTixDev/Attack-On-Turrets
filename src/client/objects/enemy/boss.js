import Enemy from './basic.js';
import round from '../../util/round.js';
import Bullet from '../bullet.js';

export default class Aimbot extends Enemy {
	constructor(data) {
		super(data);
		this.timers = [{ name: 'dual', timer: 1 }, 
			{ name: 'triple', timer: 4 }, 
			{ name: 'double', timer: 3 },
			{ name: 'five', timer: 4 },
			{ name: 'seven', timer: 3 },
			{ name: 'spam', timer: 5 }
			];
		this.attackTimerIndex = Math.floor(Math.random() * this.timers.length);
		this.currentAttack = {...this.timers[this.attackTimerIndex]};
	}
	enemyEffect(state, delta) {
		this.currentReload -= delta;
		this.currentAttack.timer -= delta;
        if (this.currentReload <= 0) {
            const dist = { x: state.world.player.x - this.x, y: state.world.player.y - this.y };
            if (Math.abs(dist.x) < this.range + state.world.player.radius
                && Math.abs(dist.y) < this.range + state.world.player.radius) {
                const distance = dist.x * dist.x + dist.y * dist.y;
                if (distance < (this.range + state.world.player.radius) * (this.range + state.world.player.radius)) {
					this.angle = round(Math.atan2(state.world.player.y - this.y, state.world.player.x - this.x), 5);
					if (this.currentAttack.timer <= 0) {
						// do special attack !!!!!
						let angles = [this.angle];
						// actually i dont like using switch, i prefer ifs and ik these arent great but we dont have much time imo,refactor not necessarily important ig
						let doAngle = true; 
						let double = false;
						// these IFS are bad pratice, use switch. Hmm okay
						if (this.currentAttack.name === 'dual') {
							angles = [this.angle - 0.2, this.angle + 0.2];
						} else if (this.currentAttack.name === 'triple') {
							angles = [this.angle - 0.3, this.angle, this.angle + 0.3];
						} else if (this.currentAttack.name === 'double') {
							doAngle = false;
							double = true;
						} else if (this.currentAttack.name === 'five') {
							angles = [this.angle - 0.6, this.angle - 0.3, this.angle, this.angle + 0.3, this.angle + 0.6]
						}  else if (this.currentAttack.name === 'seven') {
							angles = [this.angle - 0.9, this.angle - 0.6, this.angle - 0.3, this.angle, this.angle + 0.3, this.angle + 0.6, this.angle + 0.9];
						} else if (this.currentAttack.name === 'spam') {
							doAngle  = false;
							for (let i = 0; i < 1; i+= 0.1) {
								state.world.bullets.push(
								new Bullet({
									x: this.x,
									y: this.y,
									angle: this.angle + rand(-i / 4, i / 4),
									radius: this.bulletRadius,
									speed: this.bulletSpeed,
									length: this.bulletLength,
									parentId: this.id,
									color: this.bulletColor,
									damage: this.damagePerShot,
									parentRadius: this.radius * i
								})
							);
							}
						}
						if (double) {
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
									parentRadius: this.radius * 0.2
								})
							);
						} else if (doAngle){
							for (const angle of angles) {
								state.world.bullets.push(
									new Bullet({
										x: this.x,
										y: this.y,
										angle: angle,
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
						}
						this.attackTimerIndex = Math.floor(Math.random() * this.timers.length);
						this.currentAttack = {...this.timers[this.attackTimerIndex]};
					} else {
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
            state.world.player.x = this.x + (this.radius + 0.05 + state.world.player.radius) * xv;
            state.world.player.y = this.y + (this.radius + 0.05 + state.world.player.radius) * yv;
						
        // const dist = { x: state.world.player.x - this.x, y: state.world.player.y - this.y };
        // const distance = dist.x * dist.x + dist.y * dist.y;
        // if (distance < (this.radius + state.world.player.radius) * (this.radius + state.world.player.radius)) {
        //     const magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y) || 1;
        //     const xv = dist.x / magnitude;
        //     const yv = dist.y / magnitude;
        //     state.world.player.knockVel.x += xv * this.knock * 30;
        //     state.world.player.knockVel.y += yv * this.knock * 30;
						/* 
						


			state.world.player.health -= this.damagePerCollision;
			state.world.player.redDamageAlpha = 255;
			this.health -= this.damagePerCollision;
			this.redDamageAlpha = 255;
            this.xv += -xv * this.knock * 30;
            this.yv += -yv * this.knock * 30;
			this.knockVel.x += -xv * this.knock * 30;
            this.knockVel.y += -yv * this.knock * 30;

						*/
        }
    }
}
function rand(min, max) {
  return Math.random() * (max - min + 1) + min;
}