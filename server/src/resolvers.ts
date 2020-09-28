import { Resolvers } from './resolvers-types';
import TodoResolvers from './TodoDomain/resolvers/todo.resolvers';

const resolverMap: Resolvers = {
  Query: {
    ...TodoResolvers
  }
};

export default resolverMap;
