import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['Query'] = {
  todo: async (_, { id }, { dataSources }) => {
    return dataSources.todoApi.getById(id);
  },
  todos: async (_parent, _args, { dataSources }) => {
    return dataSources.todoApi.getTodos();
  }
};

export default resolvers;
