import isValidToken from './isValidToken';
import { startTimers, clearTimers } from './timers';
import docCookies from './cookies';
import { debounce } from 'lodash';

export default async function checkActiveUser(warningFn, finalFn) {
  let token = docCookies.getItem('token');
  clearTimers();
  // check token
  if (isValidToken(token)) {
    const res = await fetch('/refreshToken');
    if (res.status === 200) {
      // set new ones for warning and final
      const warningTime = 5 * 1000;
      const finalTime = 10 * 1000;
      startTimers(warningTime, warningFn, finalTime, finalFn);
    } else {
      const error = new Error(res.error);
      throw error;
    }
  } else {
    // kick out right away
    finalFn();
  }
}

export const debouncedCheckActiveUser = debounce(checkActiveUser, 1000, {
  leading: true
});
