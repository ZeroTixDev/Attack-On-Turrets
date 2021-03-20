import World from '../objects/world.js';
import Player from '../objects/player.js';
import Portal from '../objects/portal.js';
import Camera from '../objects/camera.js';
import Coin from '../objects/coin.js';
import EnemySpanwer from '../objects/EnemySpawner.js';
import ObstacleSpawner from '../objects/ObstacleSpawner.js';
import constants from '../constants.js';

export default function parse(level) {
	return fetch(`../levels/${level}.json`)
		.then(response => response.json())
		.then(obj => {
			return {
				world: new World({ 
					player: new Player(obj.player), 
					portal: new Portal(obj.portal),
					width: obj.world.width,
					height: obj.world.height,
					enemies: [],
					text: obj.text ?? [],
					coins: obj.coins?.map((obj) => new Coin(Object.assign(obj, { x: obj.x, y: obj.y, radius: constants.coin.radius }))) ?? [],
					spawners: [...obj.enemySpawn.map((data) => new EnemySpanwer(data)), 
						...obj.obstacles.map((data) => new ObstacleSpawner(data))],
				}),
				coins: obj.coins.length ?? 0,
				camera: new Camera({
					x: obj.player.x,
					y: obj.player.y
				}),
			}
		});
}	