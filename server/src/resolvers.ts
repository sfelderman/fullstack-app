import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Resolvers } from './resolvers-types';
import TodoResolvers from './TodoDomain/resolvers/todo.resolvers';
import TodoMutationResolvers from './TodoDomain/resolvers/todo.mutation.resolvers';

const resolverMap: Resolvers = {
  Query: {
    ...TodoResolvers
  },
  Mutation: {
    ...TodoMutationResolvers
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};

export default resolverMap;
