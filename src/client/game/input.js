import constants from '../constants.js';
import ref from '../references.js';
import round from '../util/round.js';


export default function handleInputs() {
	// this is where you put the event listeners
	window.addEventListener('keydown', trackKeys);
	window.addEventListener('keyup', trackKeys);
	window.addEventListener('mousemove', mouseUpdate);

	const controls = constants.controls;




	function trackKeys(event){

		function tryUnlock() {
			if (control.keylock && event.type === 'keyup') {
				control.locked = false;
				return true;
			}
			return false;
		}

		if (event.repeat) return;
		const control = controls[event.code];
		if (control !== undefined) {
			if (tryUnlock()) return;
			if (control.movement) {
				window.input[control.for] = event.type === 'keydown';
			}
			if (control.gui) {
				if (control.for === 'pause') {
					if ((control.keylock && !control.locked) || !control.keylock) {
						window.paused = !window.paused;
						if (window.paused) {
							ref.gui.classList.add('hidden');
							ref.pauseOverlay.classList.remove('hidden');
						} else {
							ref.gui.classList.remove('hidden');
							ref.pauseOverlay.classList.add('hidden');
						}
						if (control.keylock) {
							control.locked = true;
						}
					}
				}
			}
			if (control.for === 'log state') {
				if ((control.keylock && !control.locked) || !control.keylock) {
					window.logState();
					if (control.keylock) {
						control.locked = true;
					}
				}
			}
		}
	}
	function mouseUpdate(event) {
		window.mouse.x = event.pageX;
		window.mouse.y = event.pageY;
		window.angle = round(Math.atan2(window.mouse.y - window.innerHeight / 2, window.mouse.x - window.innerWidth / 2), 5);
	}

	window.addEventListener('mousedown', (event) => {
		window.mouse.down = true;
		window.mouse.queueShoot = true;
	})

	window.addEventListener('mouseup', (event) => {
		window.mouse.down = false;
	})
}   

