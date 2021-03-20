import ref from './references.js';
import Game from './game/game.js';
import resize from './util/resize.js';
import round from './util/round.js';
import global from './global.js';
import parse from './game/parser.js';
import constants from './constants.js';
import currentTick from './util/currentTick.js';

const ctx = ref.canvas.getContext('2d')
let state;
const maxLevels = 5;
let level = 0; // 0, changing it to testing/making levels
let inGame = false;
let onLevelEndScreen = false;
let dead = false;
let deaths = 0;
globalize(global);
const sounds = {
	dead: loadSound('assets/sounds/dead.mp3'),
	main: loadSound('assets/sounds/main.mp3')
}

sounds.main.loop = true;
sounds.main.volume = 0.7;


function loadSound(src) {
	const audio = new Audio();
	audio.src = src;
	return audio;
}

async function startGame() {

    Game.handleInputs();
    resize(ref.canvas);
	sounds.main.play();
    window.addEventListener('resize', resize);
	nextLevel();
    requestAnimationFrame(gameLoop);
}



function nextLevel() {
    getLevelState(level + 1)
        .then(data => {
            level++;
            state = Object.assign(Game.State(data), {});
			console.log('got the next level data');
			ref.levelText.innerText = `Level ${level}`
        })
		.catch((err) => {
			console.error('couldnt load the next level, maybe ur on the last level or probably an forgetten comma in the json >:C', err);
		});
}

function resetLevel() {
	getLevelState(level)
        .then(data => {
            state = Object.assign(Game.State(data), {});
			ref.levelText.innerText = `Level ${level}`
        })
		.catch((err) => {
			console.error('couldnt load the next level, maybe ur on the last level or probably an forgetten comma in the json >:C', err);
		});
}

async function getLevelState(level) {
	return await parse(level);
}

ref.playButton.addEventListener('mousedown', () => {
	if (!inGame) {
    	startGame();
		inGame = true;
	}
});

ref.nextLevelButton.addEventListener('mousedown', () => {
	if (!inGame) {
		nextLevel();
		inGame = true;
	}
})

ref.infoButton.addEventListener('mousedown', () => {
	ref.infoButton.classList.add('hidden');
	ref.infoDiv.classList.remove('hidden');
})

function gameLoop(time = 0) {
	requestAnimationFrame(gameLoop);
    if (state === null || state === undefined) {
		return;	
	}

	if (window.paused) {
		Game.Render(state, { canvas: ref.canvas, ctx });
		return;
	}


	let expectedTick = currentTick(state.startTime);
	if (expectedTick - state.tick > constants.SIMULATION_RATE / 3) {
		state.startTime += window.performance.now() - state.time;
		expectedTick = state.tick;
	}

	state.time = window.performance.now();

	if (state.won && !dead) {
		onLevelEndScreen = true;
		state.won = false;
		ref.levelEndDiv.classList.remove('hidden');
		state.enteringNextLevel = true;
		state.canUpdate = false;
		inGame = false;
		updateLevelEndScreen();
		deaths = 0;
		// nextLevel();
	}

	while (state.tick < expectedTick) {
		// if (state.events[state.tick]) {
		// 	for (const func of state.events[state.tick]) {
		// 		func();
		// 	}
		// 	delete state.events[state.tick];
		// }
		if (!state.enteringNextLevel) {
			state.timer.seconds += 1 / constants.SIMULATION_RATE;
		}
		if (state.canUpdate) {
		   Game.Update(state, { delta: dead ? 1 / constants.SIMULATION_RATE / 10 :1 / constants.SIMULATION_RATE });
		}
		state.tick++;
	}
	
    Game.Render(state, { canvas: ref.canvas, ctx });

	while (state.timer.seconds > 60) {
		state.timer.minutes++;
		state.timer.seconds -= 60;
	}

	if (state.timer.minutes > 0) {
		ref.time.innerText = `${round(state.timer.minutes)}m ${round(state.timer.seconds)}s`;
	} else {
		ref.time.innerText = `${round(state.timer.seconds, 1).toFixed(1)}s`;
	}

	if (state.world?.player?.health && state.world.player.health <= 0 && !dead) {
		dead = true;
		ref.canvas.style.filter = 'grayscale(1) blur(5px) saturate(150%)';
		ref.gui.classList.add('hidden');
		ref.wasted.classList.remove('wasted-hide');
		sounds.main.pause();
		sounds.dead.play();
		deaths++;
		setTimeout(() => {
			state = null;
			dead = false;
			resetLevel();
			sounds.main.play();
		}, 4500);
	}
}


function globalize(obj) {
    for (const key of Object.keys(obj)) {
        window[key] = obj[key];
    }
}

function updateLevelEndScreen() {
	ref.gui.classList.add('hidden');
	ref.levelEndText.innerText = level;
	if (state.timer.minutes > 0) {
		ref.timeText.innerText = `${round(state.timer.minutes)}m ${round(state.timer.seconds)}s`;
	} else {
		ref.timeText.innerText = `${round(state.timer.seconds, 1).toFixed(1)}s`;
	}
	ref.deathsText.innerHTML = `${deaths}`;
	if (level === maxLevels) {
		ref.nextLevelButton.classList.add('hidden');
		ref.levelEndScreen.innerHTML += `<h1>You have beaten the game!!</h1><p>more levels and guns coming soon.. :3</p><p>press info button at the menu for more info</p>`;
	}
}


window.logState = () => console.log(state);
