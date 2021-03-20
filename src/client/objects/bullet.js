export default class Bullet {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
		this.angle = data.angle;
		this.radius = data.radius;
		this.speed = data.speed;
		this.length = data.length;
		this.parentId = data.parentId;
		this.damage = data.damage;
		this.color = data.color;
		this.xv = Math.cos(this.angle) * this.speed;
		this.yv = Math.sin(this.angle) * this.speed;
		this.x += Math.cos(this.angle) * (data?.parentRadius ?? 0);
		this.y += Math.sin(this.angle) * (data?.parentRadius ?? 0);
		this.alpha = 1;
		this.deadTimer = 0;
		this.dying = false;
	}
	update(state, delta) {
		if (!this.dying) {
			this.move(state, delta);
			for (let i = 0; i < state.world.obstacles.length; i++) {
				if (this.collidesWithRect(state.world.obstacles[i])) {
					this.dying = true;
				}
			}
			this.collideWithObjects(state);
		}
		if (this.dying) {
			this.deathEffect(state, delta);
		}
	}
	deathEffect(state, delta) {
		this.alpha -= delta * 10;
		this.radius += delta * 20;
		if (this.alpha < 0) {
			this.delete = true;
		}
	}
	move(state, delta) {
		this.x += this.xv * delta;
		this.y += this.yv * delta;
		this.deadTimer += delta;
		if (this.deadTimer >= this.length - 1) {
			this.alpha -= delta;
		}
		if (this.x - this.radius < 0
		 || this.x + this.radius > state.world.width 
		 || this.y + this.radius > state.world.height 
		 || this.y - this.radius < 0) {
			 this.dying = true;
		}
		if (this.alpha <= 0) {
			this.delete = true;
		}
	}
	collideWithObjects(state) {
		for (let i = state.world.enemy.length - 1; i >= 0; i--) {
			const enemy = state.world.enemy[i];
			const dist = { x: enemy.x - this.x, y: enemy.y - this.y };
			const distance = dist.x * dist.x + dist.y * dist.y;
			if (distance < (enemy.radius + this.radius) * (enemy.radius + this.radius)
				&& enemy.id !== this.parentId && !this.dying) {
				this.dying = true;
				if (this.parentId === state.world.player.id) {
					const magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y) || 1;
					const xv = dist.x / magnitude;
					const yv = dist.y / magnitude;
					if (!enemy.stationary) {
						enemy.knockVel.x += xv * 600;
						enemy.knockVel.y += yv * 600;
					}
					enemy.health -= this.damage;
					enemy.redDamageAlpha = 255;
				}
			}
		}
		const player = {...state.world.player};
		const dist = { x: player.x - this.x, y: player.y - this.y };
		const distance = dist.x * dist.x + dist.y * dist.y;
		if (distance < (player.radius + this.radius) * (player.radius + this.radius)
			&& player.id !== this.parentId && !this.dying) {
			const magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y) || 1;
            const xv = dist.x / magnitude;
            const yv = dist.y / magnitude;
            state.world.player.knockVel.x += xv * 350;
            state.world.player.knockVel.y += yv * 350;
			state.world.player.redDamageAlpha = 255;
			state.world.player.health -= this.damage;
			this.dying = true;
		}
	}
	collidesWithRect(rect) {
		let closestX, closestY;
		if (this.x > rect.x + rect.width) {
			closestX = rect.x + rect.width;
		}
		else if (this.x < rect.x) {
			closestX = rect.x;
		}
		else {
			closestX = this.x;
		}
		if (this.y > rect.y + rect.height) {
			closestY = rect.y + rect.height;
		}
		else if (this.y < rect.y) {
			closestY = rect.y;
		}
		else {
			closestY = this.y;
		}
		if ((closestX - this.x) ** 2 + (closestY - this.y) ** 2 < this.radius * this.radius) {
			return true;
		}
		return false;
	}
}	