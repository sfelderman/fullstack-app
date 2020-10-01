import { Resolvers } from './resolvers-types';
import TodoResolvers from './TodoDomain/resolvers/todo.resolvers';
import TodoMutationResolvers from './TodoDomain/resolvers/todo.mutation.resolvers';

const resolverMap: Resolvers = {
  Query: {
    ...TodoResolvers
  },
  Mutation: {
    ...TodoMutationResolvers
  }
};

export default resolverMap;
