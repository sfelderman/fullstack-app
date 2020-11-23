import jwt from 'express-jwt';
// import jwks from 'jwks-rsa';

import dotenv from 'dotenv';

if (!process.env.secretOrKey) dotenv.config();

const useCheckJWT = jwt({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: process.env.secretOrKey!,
  // jwks.expressJwtSecret({
  //   cache: true,
  //   rateLimit: true,
  //   jwksRequestsPerMinute: 5,
  //   jwksUri: 'https://plaid-fullstack.us.auth0.com/.well-known/jwks.json'
  // }),
  // audience: 'https://plaid-fullstack',
  // issuer: 'https://plaid-fullstack.us.auth0.com/',
  algorithms: ['HS256'] // from jsonwebtoken
  // TODO https://www.npmjs.com/package/jsonwebtoken
});

export default useCheckJWT;
