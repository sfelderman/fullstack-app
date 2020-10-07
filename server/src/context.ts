import { Request } from 'express';
import MongoTodoApi, { TodoAPI } from './TodoDomain/api/MongoTodoApi';

export default interface GqlContext {
  dataSources: {
    todoApi: TodoAPI;
  };
  userId: string;
  userName: string;
}

export const makeContext = ({ req }: { req: Request }): GqlContext => {
  return {
    dataSources: {
      todoApi: new MongoTodoApi()
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userId: req.user?.id!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userName: req.user?.username!
  };
};
