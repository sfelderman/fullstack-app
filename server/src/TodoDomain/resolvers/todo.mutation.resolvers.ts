import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['Mutation'] = {
  createTodo: async (_, args, { dataSources }) => {
    return dataSources.todoApi.createTodo(args);
  },
  updateTodo: async (_, args, { dataSources }) => {
    return dataSources.todoApi.updateTodo(args);
  }
};

export default resolvers;
