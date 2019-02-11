import jwt from 'jsonwebtoken';

function isValidToken(token) {
  // parse the token, check the expiresAt, compare to current time
  // mind the seconds vs milliseconds
  const { exp: expiresAt } = jwt.decode(token);

  const nowInSeconds = Date.now() / 1000;

  return nowInSeconds < expiresAt;
}

export default isValidToken;
