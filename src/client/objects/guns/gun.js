import constants from '../../constants.js';
import Pistol from './pistol.js';
import * as Default_Gun from './default.js';

const guns = constants.guns;

export default class Gun {
	constructor() {}

	static create(name) {
		if (name === 'Pistol') {
			return new Pistol(name);
		} else {
			return new Default_Gun(name);
		}
	}
}