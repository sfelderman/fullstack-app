import MongoTodoApi, { TodoAPI } from './TodoDomain/api/MongoTodoApi';

export default interface GqlContext {
  dataSources: {
    todoApi: TodoAPI;
  };
}

export const makeContext = (): GqlContext => {
  return {
    dataSources: {
      todoApi: new MongoTodoApi()
    }
  };
};
