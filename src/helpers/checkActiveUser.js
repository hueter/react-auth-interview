import isValidToken from './isValidToken';
import { startTimers, clearTimers } from './timers';
import docCookies from './cookies';
import { debounce } from 'lodash';

async function checkActiveUser(warningFn, finalFn) {
  let token = docCookies.getItem('token');
  if (isValidToken(token)) {
    // clear timers first
    const warningTimerId = localStorage.getItem('warningTimer');
    const finalTimerId = localStorage.getItem('finalTimer');
    clearTimers(warningTimerId, finalTimerId);

    // fetch the token first
    const res = await fetch('/refreshToken');
    if (res.status === 200) {
      // set new ones for warning and final
      const fourMinutesThirty = 60 * 1000 * 4.5;
      const fiveMinutes = 60 * 1000 * 5;
      const { warningTimer, finalTimer } = startTimers(
        fourMinutesThirty,
        warningFn,
        fiveMinutes,
        finalFn
      );
      localStorage.setItem('warningTimer', warningTimer);
      localStorage.setItem('finalTimer', finalTimer);
    } else {
      const error = new Error(res.error);
      throw error;
    }
  } else {
    finalFn();
    // clear timers again
    const warningTimerId = localStorage.getItem('warningTimer');
    const finalTimerId = localStorage.getItem('finalTimer');
    clearTimers(warningTimerId, finalTimerId);
  }
}

export default debounce(checkActiveUser, 1000);
