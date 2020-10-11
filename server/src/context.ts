import { Request } from 'express';
import MongoPlaidAccountsApi, { PlaidAccountsApi } from './PlaidDomain/api/PlaidAccountsApi';
import MongoTodoApi, { TodoAPI } from './TodoDomain/api/MongoTodoApi';
import useCheckJWT from './util/checkJwt';
import jwt from 'jsonwebtoken';

export default interface GqlContext {
  dataSources: {
    todoApi: TodoAPI;
    accountsApi: PlaidAccountsApi;
  };
  userId: string;
  userName: string;
}

type DecodedJWT = {
  id: string;
  username: string;
  iat: Date;
  exp: Date;
};

export const makeContext = ({ req }: { req: Request }): GqlContext => {
  const authorization = req.headers.authorization?.replace('Bearer ', '').trim() || '';
  const jwtValues = jwt.verify(authorization, process.env.secretOrKey!) as DecodedJWT;

  return {
    dataSources: {
      todoApi: new MongoTodoApi(),
      accountsApi: new MongoPlaidAccountsApi()
    },
    userId: jwtValues.id,
    userName: jwtValues.username
  };
};
