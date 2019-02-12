/**
 * Sets two timeouts based on a warning / final action
 * @param {Number} warningTime milliseconds before warning the user
 * @param {Function} warningFn function to run as a warning after warningTime
 * @param {Number} finalTime milliseconds before final action
 * @param {Function} finalFn the final action
 */
export function startTimers(warningTime, warningFn, finalTime, finalFn) {
  localStorage.setItem('warningTimer', setTimeout(warningFn, warningTime));
  localStorage.setItem('finalTimer', setTimeout(finalFn, finalTime));
}

/**
 * The complement to startTimers, clear those timers
 * @param {Number} warningTimer an ID for a setTimeout for warning
 * @param {Number} finalTimer an ID for a setTimeout for final
 */
export function clearTimers() {
  clearTimeout(+localStorage.getItem('warningTimer'));
  clearTimeout(+localStorage.getItem('finalTimer'));
  localStorage.removeItem('warningTimer');
  localStorage.removeItem('finalTimer');
}
