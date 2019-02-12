import { startTimers, clearTimers } from './timers';
import lolex from 'lolex';

// mock time
const clock = lolex.install();

const fakeFn1 = jest.fn();
const fakeFn2 = jest.fn();

describe('Start Timers', () => {
  it('should put timers in localStorage', () => {
    startTimers(1000, fakeFn1, 1500, fakeFn2);
    expect(localStorage).toHaveProperty('warningTimer');
    expect(localStorage).toHaveProperty('finalTimer');
    // advance time to 1001 ms
    clock.tick(1001);
    expect(fakeFn1).toHaveBeenCalledTimes(1);
    expect(fakeFn2).not.toHaveBeenCalled();
    // advance time to 1501 ms
    clock.tick(1501);
    expect(fakeFn1).toHaveBeenCalledTimes(1);
  });
});

describe('Clear Timers', () => {
  it('should clear timers from localStorage', () => {
    clearTimers();
    expect(localStorage).not.toHaveProperty('warningTimer');
    expect(localStorage).not.toHaveProperty('finalTimer');
  });
});
