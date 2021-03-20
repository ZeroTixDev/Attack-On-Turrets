import constants from '../constants.js';
import round from '../util/round.js';

const textures = {
	coin: loadImage('assets/images/coin.svg')
}

const render = constants.render;

function loadImage(src) {
	const image = new Image();
	image.src = src;
	return image;
}

export default function Render(state, { ctx, canvas }) {
    const scale = getScale();
    ctx.globalAlpha = 1;
    ctx.fillStyle = render.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const worldX = round((state.world.x + canvas.width / 2 / scale - round(state.camera.x)) * scale);
    const worldY = round((state.world.y + canvas.height / 2 / scale - round(state.camera.y)) * scale);

    ctx.fillStyle = render.world;
    ctx.fillRect(worldX, worldY, round(state.world.width * scale), round(state.world.height * scale));

    const portalX = round((state.world.portal.x - round(state.camera.x)) * scale + canvas.width / 2);
    const portalY = round((state.world.portal.y - round(state.camera.y)) * scale + canvas.height / 2);
    ctx.fillStyle = state.coinsCollected === state.coins ? render.portalReady: render.portalDown;
    ctx.fillRect(portalX, portalY, round(state.world.portal.width * scale), round(state.world.portal.height * scale))

    

    for (let i = 0; i < state.world.obstacles.length; i++) {
        const obstacle = state.world.obstacles[i];
		ctx.fillStyle = obstacle.color;
        const obstacleX = round((round(obstacle.x) - round(state.camera.x)) * scale + canvas.width / 2);
        const obstacleY = round((round(obstacle.y) - round(state.camera.y)) * scale + canvas.height / 2);
        ctx.fillRect(obstacleX - 2 * scale, obstacleY - 2 * scale, round(obstacle.width * scale) + 2 * scale, round(obstacle.height * scale) + 2 * scale);
    }

	ctx.globalAlpha = 1;
	for (let i = 0; i < state.world.bullets.length; i++) {
		const bullet = state.world.bullets[i];
		const bulletX = round((round(bullet.x) - round(state.camera.x)) * scale + canvas.width / 2);
        const bulletY = round((round(bullet.y) - round(state.camera.y)) * scale + canvas.height / 2);
		
		ctx.fillStyle = bullet.color;
		ctx.globalAlpha = bullet.alpha;
		ctx.beginPath();
		ctx.arc(bulletX, bulletY, round(bullet.radius * scale), 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;

	ctx.globalAlpha = 1;
	for (let i = 0; i < state.world.enemy.length; i++) {
		const enemy = state.world.enemy[i];
		const enemyX = round((round(enemy.x) - round(state.camera.x)) * scale + canvas.width / 2);
        const enemyY = round((round(enemy.y) - round(state.camera.y)) * scale + canvas.height / 2);


		ctx.fillStyle = enemy.color;
		ctx.globalAlpha = enemy.alpha;
		ctx.beginPath();
		ctx.arc(enemyX, enemyY, round(enemy.lerpRadius * scale), 0, Math.PI * 2);
		ctx.fill();

		if (enemy.redDamageAlpha > 0) {
			ctx.fillStyle = `rgba(185, 34, 0, ${enemy.redDamageAlpha / 255}`;
			ctx.beginPath();
			ctx.moveTo(enemyX, enemyY);
			ctx.arc(enemyX, enemyY, round(enemy.lerpRadius * scale), 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.strokeStyle = render.health;
		ctx.lineWidth = 6 * scale * (enemy.lerpRadius / 30);
		ctx.beginPath();
		ctx.arc(enemyX, 
			enemyY, 
			round(enemy.lerpRadius * scale * 0.7), 
			0,
			Math.PI * 2 * (Math.max(0, enemy.lerpHealth) / enemy.maxHealth)
		);
		ctx.stroke();

		// ctx.beginPath();
		// ctx.arc(enemyX, enemyY, round(enemy.range * scale), 0, Math.PI * 2);
		// ctx.stroke()
	}
	ctx.globalAlpha = 1;

	ctx.strokeStyle = 'rgba(8, 13, 69, 0.2)';
	ctx.lineWidth = round(15 * scale);
	for (let i = 0; i < state.world.spawners.length; i++) {
		const spawner = state.world.spawners[i];
		if (!spawner.show) continue;
		const spawnerX = round((round(spawner.data.x) - round(state.camera.x)) * scale + canvas.width / 2);
        const spawnerY = round((round(spawner.data.y) - round(state.camera.y)) * scale + canvas.height / 2);

		ctx.strokeRect(spawnerX, spawnerY, round(spawner.data.width * scale), round(spawner.data.height * scale));
	}

	// ctx.strokeStyle = 'black';
	ctx.fillStyle = 'white';
	ctx.font = ` ${35 * scale}px Russo One, Verdana, Arial, Helvetica, sans-serif`;
	ctx.textBaseline = 'middle';
	for (let i = 0; i < state.world?.text.length ?? 0; i++) {
		const text = state.world.text[i];
		const textX = round((round(text.x) - round(state.camera.x)) * scale + canvas.width / 2);
        const textY = round((round(text.y) - round(state.camera.y)) * scale + canvas.height / 2);
        ctx.fillText(text.data, textX, textY);
        // ctx.strokeText(text.data, textX, textY);
	}

	for (let i = 0; i < state.world.coins.length; i++) {
		const { x, y, radius } = state.world.coins[i];
		const rad = round(radius * scale);
		const coinX = round((round(x) - round(state.camera.x)) * scale + canvas.width / 2);
        const coinY = round((round(y) - round(state.camera.y)) * scale + canvas.height / 2);
		ctx.drawImage(textures.coin, coinX - rad, coinY - rad, rad * 2, rad * 2);
	}


	drawPlayer(state, scale, canvas, ctx);
}

function getScale() {
    return Math.max(window.innerHeight, window.innerWidth * (9 / 16)) / constants.zoom;
}

function drawPlayer(state, scale, canvas, ctx) {
	const playerX = round((round(state.world.player.x) - round(state.camera.x)) * scale + canvas.width / 2);
    const playerY = round((round(state.world.player.y) - round(state.camera.y)) * scale + canvas.height / 2);

    ctx.fillStyle = render.player;
    ctx.beginPath();
    ctx.arc(playerX, playerY, round(state.world.player.lerpRadius * scale), 0, Math.PI * 2);
    ctx.fill();

	if (state.world.player.redDamageAlpha > 0) {
		ctx.fillStyle = `rgba(185, 34, 0, ${state.world.player.redDamageAlpha / 255}`;
        ctx.beginPath();
        ctx.moveTo(playerX, playerY);
        ctx.arc(playerX, playerY, round(state.world.player.lerpRadius * scale), 0, Math.PI * 2);
        ctx.fill();
	}

	ctx.strokeStyle = render.health;
	ctx.lineWidth = 6 * scale * (state.world.player.lerpRadius / 30);
	ctx.beginPath();
	ctx.arc(playerX, 
		playerY, 
		round(state.world.player.lerpRadius * scale * 0.7), 
		0,
		Math.PI * 2 * (Math.max(0, state.world.player.lerpHealth) / state.world.player.maxHealth)
	);
	ctx.stroke();

	

    // ctx.save();
    // ctx.translate(playerX, playerY);
    // ctx.rotate(state.world.player.angle - Math.PI / 2);
    // ctx.scale(scale * 0.2 * (state.world.player.radius / 30), scale * 0.2 * (state.world.player.radius / 30));
    // ctx.beginPath();
    // ctx.strokeStyle = render.indicator;
    // ctx.lineWidth = round(10 * scale);
    // ctx.moveTo(-40, 10);
    // ctx.lineTo(-40, 10);
    // ctx.lineTo(0, 50);
    // ctx.lineTo(40, 10);
    // ctx.stroke();
    // ctx.restore();

}