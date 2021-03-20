const constants = {
	player: {
		radius: 40,
		friction: 0.75,
		accel: 450 * 30, // 450 * 30, testing is 450 * 50
		maxSpeed: 400, // 400, for testing for maps i use 4000
		healthRegen: 5, // 5
		health: 100,
	},
	world: {
		width: 2000,
		height: 2000,	
	},
	coin: {
		radius: 25,
	},
	controls: {
		KeyW: { movement: true, for: 'up' },
		KeyS: { movement: true, for: 'down' },
		KeyD: { movement: true, for: 'right' },
		KeyA: { movement: true, for: 'left' },
		ArrowUp: { movement: true, for: 'up' },
		ArrowDown: { movement: true, for: 'down' },
		ArrowRight: { movement: true, for: 'right' },
		ArrowLeft: { movement: true, for: 'left' },
		KeyP: { gui: true, for: 'pause', keylock: true },
		KeyL: { for: 'log state', keylock: true }
	},
	zoom: 1000,
	SIMULATION_RATE: 120,
	render: {
		background: '#020c1c',
		player: '#161c26',
		world: 'rgb(125, 125, 125)',
		portalDown: '#0d324f',
		portalReady: '#0262f2',
		indicator: 'white',
		health: 'white',
	},
	guns: {
		Pistol: {
			ammo: 200,
			reload: 0.35,
			bulletLength: 2,
			bulletRadius: 15,
			bulletSpeed: 600,
			bulletColor: '#ffffff',
			damage: 45, // 45
		},
	},
	enemy: {
		Default: {
			speed: 250,
			knock: 15,
			radius: 40,
			knockFriction: 0.8,
			health: 100,
			bulletRadius: 18,
			bulletSpeed: 500,
			bulletLength: 2.5,
			reload: 1.2,
			damagePerCollision: 2,
			damagePerShot: 10,
			range: 375,
			healthRegen: 3,
			bulletColor: '#183447',
			color: '#002869',
		},
		Basic: {
			speed: 150,
			knock: 15,
			radius: 40, 
			knockFriction: 0.8,
			damagePerCollision: 2,
			damagePerShot: 30,
			range: 375,
			healthRegen: 3,
			bulletColor: '#095894',
			health: 100,
			bulletRadius: 18,
			bulletSpeed: 500,
			bulletLength: 2.5,
			reload: 1,
			color: '#002869',
		},
		Aimbot: {
			speed: 100,
			knock: 15,
			radius: 30, 
			knockFriction: 0.8,
			damagePerCollision: 2,
			damagePerShot: 20,
			range: 425,
			healthRegen: 1.5,
			bulletColor: '#00f598',
			health: 50,
			bulletRadius: 12,
			bulletSpeed: 600,
			bulletLength: 3,
			reload: 1.4,
			color: '#00a868',
		},
		Turret: {
			speed: 0,
			knock: 0,
			radius: 50, 
			knockFriction: 0,
			damagePerCollision: 0,
			damagePerShot: 20,
			range: 375,
			healthRegen: 4,
			bulletColor: '#910707',
			color: '#330101',
			health: 100,
			bulletRadius: 18,
			bulletSpeed: 700,
			bulletLength: 3,
			reload: 0.8,
		},
		Rotating: {
			speed: 275,
			knock: 10,
			radius: 35, 
			knockFriction: 0.8,
			damagePerCollision: 5,
			damagePerShot: 25,
			range: 300,
			healthRegen: 2,
			bulletColor: '#ffee00',
			health: 100,
			bulletRadius: 15,
			bulletSpeed: 500,
			bulletLength: 2.5,
			reload: 1,
			color: '#e6c90e',
		},
		Bouncy: {
			speed: 205,
			knock: 50,
			radius: 45, 
			knockFriction: 0.8,
			damagePerCollision: 2,
			damagePerShot: 10,
			range: 300,
			healthRegen: 2,
			bulletColor: '#16c433',
			health: 100,
			bulletRadius: 15,
			bulletSpeed: 500,
			bulletLength: 2.5,
			reload: Infinity,
			color: '#00ff2b',
		},
		Shotgun: {
			speed: 200,
			knock: 15,
			radius: 50, 
			knockFriction: 0.8,
			damagePerCollision: 2,
			damagePerShot: 7,
			range: 375,
			healthRegen: 3,
			bulletColor: '#a84600',
			health: 100,
			bulletRadius: 20,
			bulletSpeed: 700,
			bulletLength: 1.1,
			reload: 0.6,
			color: '#733000',
		},
		Fire: {
			speed: 0,
			knock: 0,
			radius: 55, 
			knockFriction: 0,
			damagePerCollision: 0,
			damagePerShot: 5,
			range: 425,
			healthRegen: 10,
			bulletColor: '#c90025',
			color: '#d1001f',
			health: 500,
			bulletSizeRandomness: 9,
			bulletRadius: 13,
			bulletSpeed: 700,
			bulletLength: 1.3,
			reload: 0.05,
		},
		Idler: {
			speed: 0,
			knock: 0,
			radius: 40, 
			knockFriction: 0.8,
			damagePerCollision: 0,
			damagePerShot: 0,
			range: 0,
			healthRegen: 0,
			bulletColor: '#095894',
			health: 100,
			bulletRadius: 0,
			bulletSpeed: 0,
			bulletLength: 0,
			reload: 0,
			color: '#545454',
		},
		Boss: {
			speed: 0,
			knock: 10,
			radius: 450, 
			knockFriction: 0.7,
			damagePerCollision: 5,
			damagePerShot: 60,
			range: 5000,
			healthRegen: 25,
			bulletColor: '#1f1f1f',
			color: '#080808',
			health: 2500,
			bulletRadius: 125,
			bulletSpeed: 550,
			bulletLength: 3,
			reload: 1,
		},
	}
};

export default constants;