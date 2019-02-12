import checkActiveUser, { debouncedCheckActiveUser } from './checkActiveUser';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import lolex from 'lolex';

// mock cookies
Cookies.set(
  'token',
  jwt.sign({}, 'foo', {
    expiresIn: '5m'
  })
);

// mock fetch
const fetchMock = jest.fn().mockImplementation(() => {
  var p = new Promise((resolve, reject) => {
    resolve({
      ok: true,
      status: 200
    });
  });

  return p;
});

Object.defineProperty(window, 'fetch', {
  value: fetchMock
});

// mock time
const clock = lolex.install();

let fakeWarningFn;
let fakeFinalFn;

beforeEach(() => {
  fakeWarningFn = jest.fn();
  fakeFinalFn = jest.fn();
});

describe('checkActiveUser', async () => {
  it('should put timers in localStorage', async () => {
    await checkActiveUser(fakeWarningFn, fakeFinalFn);
    expect(localStorage).toHaveProperty('warningTimer');
    expect(localStorage).toHaveProperty('finalTimer');
  });
  it('should invoke the warning and final functions after some time', async () => {
    await checkActiveUser(fakeWarningFn, fakeFinalFn);
    expect(fakeWarningFn).not.toHaveBeenCalled();
    expect(fakeFinalFn).not.toHaveBeenCalled();
    // after five seconds, warning func called but not final func
    clock.tick(5001);
    expect(fakeWarningFn).toHaveBeenCalledTimes(1);
    expect(fakeFinalFn).not.toHaveBeenCalled();
    clock.tick(5000);
    // after another five seconds, final func is called
    expect(fakeWarningFn).toHaveBeenCalledTimes(1);
    expect(fakeFinalFn).toHaveBeenCalledTimes(1);
  });

  it('should invoke the final function immediately if its an outdated token', async () => {
    Cookies.set(
      'token',
      jwt.sign({}, 'foo', {
        expiresIn: '0s'
      })
    );
    clock.tick(100);
    await checkActiveUser(fakeWarningFn, fakeFinalFn);
    expect(fakeFinalFn).toHaveBeenCalledTimes(1);
  });
});
