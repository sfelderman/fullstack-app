import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['TodoDomain'] = {
  todo: (_, { id }, { dataSources }) => {
    return dataSources.todoApi.getById(id);
  },
  todos: (_parent, args, { dataSources, userId }) => {
    return dataSources.todoApi.getTodos({ ...args, userId });
  }
};

export default resolvers;
