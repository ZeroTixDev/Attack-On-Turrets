const ref = {
	menu: document.getElementById('menu'),
	game: document.getElementById('game'),
	gui: document.getElementById('gui'),
	playButton: document.getElementById('play-button'),
	canvas: document.getElementById('game-canvas'),
	gunStats: document.getElementById('gun-stats'),
	// gunName: document.getElementById('gun-name'),
	gunAmmo: document.getElementById('gun-ammo'),
	pauseOverlay: document.getElementById('pause-overlay'),
	time: document.getElementById('time'),
	bottomBar: document.getElementById('bottom-bar'),
	guns: document.getElementsByClassName('gun'),
	coinImg: document.getElementById('coin'),
	coinDiv: document.querySelector('.coins'),
	gunInventory: document.getElementById('gun-inventory'),
	coinText:  document.querySelector('.coins-collected'),
	levelDiv: document.querySelector('.level-div'),
	levelText: document.getElementById('level'),
	wasted: document.querySelector('.wasted'),
	infoButton: document.getElementById('info-button'),
	infoDiv: document.querySelector('.info'),
	levelEndScreen: document.querySelector('.level-end-screen'),
	levelEndDiv: document.querySelector('.level-end-div'),
	levelEndTop: document.getElementById('level-end-top'),
	nextLevelButton: document.getElementById('next-level'),
	levelEndText: document.getElementById('current-level'),
	deathsText: document.getElementById('deaths'),
	timeText: document.getElementById('time-taken'),
}
export default ref;