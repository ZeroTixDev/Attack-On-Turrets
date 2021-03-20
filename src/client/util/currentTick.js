import constants from '../constants.js';

export default function currentTick(startTime) {
   return Math.ceil((window.performance.now() - startTime) * (constants.SIMULATION_RATE / 1000));
};