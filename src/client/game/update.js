import ref from '../references.js';

export default function Update(state, { delta }) {
	// do something with the state
	if (state.tick === 0) {
		ref.bottomBar.classList.remove('hidden');
		ref.coinText.innerText = `${state.coinsCollected}/${state.coins}`;
		ref.canvas.style.filter = 'none';
		if (ref.gui.classList.contains('hidden')) {
			ref.gui.classList.remove('hidden');
		}
		if (!ref.levelEndDiv.classList.contains('hidden')) {
			ref.levelEndDiv.classList.add('hidden');
		}
		ref.wasted.classList.add('wasted-hide');
		ref.menu.classList.add('hidden');
   		ref.game.classList.remove('hidden');
	}
	state.world.update(state, delta);
}