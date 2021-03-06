import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['Mutation'] = {
  createTodo: async (_, args, { dataSources, userId }) => {
    return dataSources.todoApi.createTodo({ ...args, userId });
  },
  updateTodo: async (_, args, { dataSources }) => {
    return dataSources.todoApi.updateTodo(args);
  },
  deleteTodo: async (_, { id }, { dataSources }) => {
    return dataSources.todoApi.deleteTodo(id);
  }
};

export default resolvers;
