import { Request } from 'express';
import MongoPlaidAccountsApi, { PlaidAccountsApi } from './PlaidDomain/api/PlaidAccountsApi';
import MongoTodoApi, { TodoAPI } from './TodoDomain/api/MongoTodoApi';
import jwt from 'jsonwebtoken';
import PlaidPublicTransactionApi, {
  PlaidTransactionsApi
} from './PlaidDomain/api/PlaidTransactionsApi';
import plaid from 'plaid';

export default interface GqlContext {
  dataSources: {
    todoApi: TodoAPI;
    accountsApi: PlaidAccountsApi;
    transactionsApi: PlaidTransactionsApi;
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

export const useMakeContext = (client: plaid.Client) => {
  const makeContext = ({ req }: { req: Request }): GqlContext => {
    const authorization = req.headers.authorization?.replace('Bearer ', '').trim() || '';
    const jwtValues = jwt.verify(authorization, process.env.secretOrKey!) as DecodedJWT;

    return {
      dataSources: {
        todoApi: new MongoTodoApi(),
        accountsApi: new MongoPlaidAccountsApi(),
        transactionsApi: new PlaidPublicTransactionApi(client)
      },
      userId: jwtValues.id,
      userName: jwtValues.username
    };
  };

  return makeContext;
};
