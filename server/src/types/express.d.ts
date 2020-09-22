declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      username: string;
      iat: Date;
      exp: Date;
    };
  }
}
