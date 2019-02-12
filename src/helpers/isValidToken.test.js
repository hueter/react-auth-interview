import isValidToken from './isValidToken';
import jwt from 'jsonwebtoken';

const SECRET = 'sosecret';

describe('See if a token is valid', () => {
  it('returns true when given a valid JWT', () => {
    // generate JWT
    let token = jwt.sign({}, SECRET, {
      expiresIn: '5m'
    });
    expect(isValidToken(token)).toBe(true);
  });

  it('returns false when given an expired JWT', () => {
    const fiveMinsAgoInSeconds = Math.floor(
      (Date.now() - 1000 * 60 * 5) / 1000
    );

    const nowInSeconds = Math.floor(Date.now() / 1000);

    let token = jwt.sign(
      { iat: fiveMinsAgoInSeconds, exp: nowInSeconds },
      SECRET
    );

    expect(isValidToken(token)).toBe(false);
  });
});
