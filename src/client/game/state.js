import Player from '../objects/player.js';
import Camera from '../objects/camera.js';
import World from '../objects/world.js';
import Portal from '../objects/portal.js';

export default function State(obj) {
	return Object.assign({
		world: new World({ 
			player: new Player({ x: 200, y: 200}), 
			portal: new Portal({ 
				x: 0, 
				y: 0, 
				width: 50, 
				height: 50, 
				type: 'normal'
			}),
			obstacles: [],
			spawners: [],
			coins: [],
			text: [],
		}),
		camera: new Camera({ x: 200, y: 200 }),
		coinsCollected: 0,
		coins: 0,
		tick: 0,
		timer: { minutes: 0, seconds: 0 },
		startTime: window.performance.now(),
		time: window.performance.now(),
		events: Object.create(null),
		won: false,
		dead: false,
		canUpdate: true,
		enteringNextLevel: false,
	}, obj);
}