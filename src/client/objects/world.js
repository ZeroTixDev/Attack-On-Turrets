import constants from '../constants.js';
import ref from '../references.js';

const world = constants.world;

export default class World {
	constructor(data) {
		this.x = 0;
		this.y = 0;
		this.width = data.width ?? world.width;
		this.height = data.height ?? world.height;
		this.player = data.player;
		this.portal = data.portal;
		this.obstacles = [];
		this.spawners = data.spawners;
		this.coins = data.coins;
		this.bullets = [];
		this.enemy = [];
		this.text = data.text;
		this.activateSpawners();
	}
	activateSpawners(){
		this.spawners.forEach((spawner) => {
			spawner.spawn(this);
		});
	}
	update(state, delta) {
		this.player.update(state, delta);
		state.camera.update(this.player, delta);
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			const bullet = this.bullets[i];
			bullet.update(state, delta);
			if (bullet.delete) {
				this.bullets.splice(i, 1);
				continue;
			}
		}
		for (let i = this.enemy.length - 1; i >= 0; i--) {
			const enemy = this.enemy[i];
			enemy.update(state, delta);
			if (enemy.delete) {
				this.enemy.splice(i, 1);
				continue;
			}
		}
		for (let i = this.coins.length - 1; i >= 0; i--) {
			const coin = this.coins[i];
			coin.update(state, delta);
			if (coin.delete) {
				this.coins.splice(i, 1);
				state.coinsCollected++;
				ref.coinText.innerText = `${state.coinsCollected}/${state.coins}`;
				continue;
			}
		}
		for (let i = 0; i < this.obstacles.length; i++) {
			const obstacle = this.obstacles[i];
			obstacle.update(state, delta);
		}
	}
}