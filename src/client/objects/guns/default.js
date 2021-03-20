import constants from '../../constants.js';
import Bullet from '../bullet.js';
import ref from '../../references.js';

const guns = constants.guns;

export default class Gun {
	constructor(name) {
		this.name = name;
		this.stats = guns[name];
		this.inheritFromStats(this.stats);
		this.currentReload = 0;
		this.currentAmmo = this.ammo;
		// ref.gunName.innerText = name;
		this.setAmmoOnHtml();	
	}
	setAmmoOnHtml() {
		ref.gunAmmo.innerText = `${this.currentAmmo}/${this.ammo}`;
	}
	inheritFromStats(stats) {
		for (const stat of Object.keys(stats)) {
			this[stat] = stats[stat];
		}
	}
	shoot(state) {
		// maybe activate specials
		if (!window.mouse.down && !window.mouse.queueShoot) {
			return;
		}
		if (window.mouse.queueShoot) {	
			window.mouse.queueShoot = false;
		}
		this.currentAmmo--;
		state.world.bullets.push(
			new Bullet({
				x: state.world.player.x,
				y: state.world.player.y,
				angle: state.world.player.angle,
				radius: this.bulletRadius,
				speed: this.bulletSpeed,
				length: this.bulletLength,
				color: this.bulletColor,
				damage: this.damage,
				parentId: state.world.player.id,
				parentRadius: state.world.player.radius * 0.9,
			})
		);
		this.setAmmoOnHtml();
	}
	update(state, delta) {
		this.currentReload -= delta;
		
		if (this.currentReload <= 0) {
			if (this.currentAmmo > 0) {
				this.shoot(state);
			}
			this.currentReload = this.reload;
		}
	}
}