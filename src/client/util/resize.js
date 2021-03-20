import ref from '../references.js';
import constants from '../constants.js';

export default function resize() {
	ref.canvas.width = window.innerWidth;
	ref.canvas.height = window.innerHeight;
	rescaleGUI();
}

function rescaleGUI() {
	const scale = getScale();
	ref.gunStats.style.padding = `${40 * scale}px`;
	ref.gunStats.style.fontSize = `${28 * scale}px`;
	ref.gunStats.style.marginRight = `${40 * scale}px`;
	ref.time.style.padding = `${20 * scale}px`;
	ref.time.style.fontSize = `${32 * scale}px`;
	ref.bottomBar.style.height = `${80 * scale}px`;

	const boxes = document.querySelectorAll('.box')

	for (const index of Object.keys(boxes)) {
		const box = boxes[index];

		box.style.width = `${70 * scale}px`;
		box.style.height = `${70 * scale}px`;
		if ( box.classList.contains('gun-selected')) {
			box.style.border = `${6 * scale}px solid rgb(216, 216, 216)`;
		} else {
			box.style.border = `${3 * scale}px solid rgb(24, 24, 24)`;
		}
		box.style.marginLeft = `${10 * scale}px`;
		box.style.marginRight = `${10 * scale}px`;
		box.style.fontSize = `${30 * scale}px`;
		box.style.borderRadius = `${3 * scale}px`;

	}
	ref.coinImg.style.width = `${70 * scale}px`;
	ref.coinImg.style.height = `${70 * scale}px`;
	ref.coinDiv.style.fontSize = `${30 * scale}px`;
	ref.coinDiv.style.marginLeft = `${60 * scale}px`;
	ref.gunInventory.style.padding = `${20 * scale}px`;
	ref.coinText.style.margin = `${15 * scale}px`;
	ref.levelDiv.style.marginRight = `${100 * scale}px`;
	ref.levelDiv.style.fontSize = `${30 * scale}px`;
	ref.levelText.style.width = `${150 * scale}px`;
	ref.wasted.style['-webkit-text-stroke'] = `${3 * scale}px black`;
	ref.wasted.style.height = `${200 * scale}px`;
	ref.wasted.style.fontSize = `${100 * scale}px`;
	ref.wasted.style.marginTop = `${400 * scale}px`;
	ref.levelEndScreen.style.padding = `${80 * scale}px`;
	ref.levelEndScreen.style.fontSize = `${30 * scale}px`;
	ref.levelEndTop.style.marginBottom = `${30 * scale}px`;
	ref.levelEndTop.style.padding = `${20 * scale}px`;
	ref.levelEndTop.style.paddingLeft = `${100 * scale}px`;
	ref.levelEndTop.style.paddingRight = `${100 * scale}px`;
	ref.levelEndTop.style['-webkit-text-stroke'] = `${2 * scale}px black`;

	ref.nextLevelButton.style.padding = `${20 * scale}px ${100 * scale}px`;
	ref.nextLevelButton.style.margin = `${10 * scale}px`;
	ref.nextLevelButton.style.borderRadius = `${4 * scale}px`;
	ref.nextLevelButton.style.fontSize = `${24 * scale}px`;
}



function getScale() {
    return Math.max(window.innerHeight, window.innerWidth * (9 / 16)) / constants.zoom;
}

