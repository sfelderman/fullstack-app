import MongoTodoApi, { TodoAPI } from './TodoDomain/api/MongoTodoApi';
// import { Request, Response } from 'express';

export default interface GqlContext {
  dataSources: {
    todoApi: TodoAPI;
  };
}

export const makeContext = (): GqlContext => {
  // export const makeContext = ({ req: Request, res: Response }): InitialContext => {
  // console.log(Object.keys(values));
  return {
    dataSources: {
      todoApi: new MongoTodoApi()
    }
  };
};

// export default interface ResolverContext extends InitialContext {
//   dataSources: {
//     todoApi: TodoAPI;
//   };
// }
