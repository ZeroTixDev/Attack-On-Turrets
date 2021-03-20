import Enemy from './basic.js';
import intercept from '../../util/intercept-equation.js';
import round from '../../util/round.js';
import Bullet from '../bullet.js';

export default class Rotating extends Enemy {
	constructor(data) {
		super(data);
		this.moveAngle = Math.floor(Math.random() * 360);
		this.xv = this.speed * Math.cos(this.moveAngle / Math.PI * 180);
		this.yv = this.speed * Math.sin(this.moveAngle / Math.PI * 180);
		this.bruh = Math.random() < 0.5 ? -1: 1;
	}
	move(state, delta) {
        this.x += this.knockVel.x * delta;
        this.y += this.knockVel.y * delta;

        this.knockVel.x *= Math.pow(this.knockFriction, delta * 60);
        this.knockVel.y *= Math.pow(this.knockFriction, delta * 60);

        this.x += this.xv * delta;
        this.y += this.yv * delta;

        if (this.x + this.radius >= this.bound.x + this.bound.w) {
            this.xv = -this.xv;
            this.x = (this.bound.x + this.bound.w) * 2 - this.x - this.radius * 2;
        }
        else if (this.x - this.radius <= this.bound.x) {
            this.xv = -this.xv;
            this.x = this.bound.x * 2 - this.x + this.radius * 2;
        }
        if (this.y + this.radius >= this.bound.y + this.bound.h) {
            this.yv = -this.yv;
            this.y = (this.bound.y + this.bound.h) * 2 - this.y - this.radius * 2;
        }
        else if (this.y - this.radius <= this.bound.y) {
            this.yv = -this.yv;
            this.y = this.bound.y * 2 - this.y + this.radius * 2;
        }
		this.xv = (this.speed * Math.cos(this.moveAngle/Math.PI*180));
		this.yv = (this.speed * Math.sin(this.moveAngle/Math.PI*180));
		this.moveAngle += 0.0002 * this.speed * this.bruh * delta;
    }
}	