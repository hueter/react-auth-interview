/**
 * Sets two timeouts based on a warning / final action
 * @param {Number} warningTime milliseconds before warning the user
 * @param {Function} warningFn function to run as a warning after warningTime
 * @param {Number} finalTime milliseconds before final action
 * @param {Function} finalFn the final action
 */
export function startTimers(warningTime, warningFn, finalTime, finalFn) {
  return {
    warningTimer: setTimeout(warningFn, warningTime),
    finalTimer: setTimeout(finalFn, finalTime)
  };
}

/**
 * The complement to startTimers, clear those timers
 * @param {Number} warningTimer an ID for a setTimeout for warning
 * @param {Number} finalTimer an ID for a setTimeout for final
 */
export function clearTimers(warningTimer, finalTimer) {
  clearTimeout(warningTimer);
  clearTimeout(finalTimer);
}
