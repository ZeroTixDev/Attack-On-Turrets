import Enemy from './basic.js';

export default class Idler extends Enemy {
	constructor(data) {
		super(data);
	}
	enemyEffect(state, delta) {}
}