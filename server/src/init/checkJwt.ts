import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

const checkJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://plaid-fullstack.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://plaid-fullstack',
  issuer: 'https://plaid-fullstack.us.auth0.com/',
  algorithms: ['RS256']
});

export default checkJWT;
