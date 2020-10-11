import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Resolvers } from './resolvers-types';
import TodoDomain from './TodoDomain/resolvers/todo.resolvers';
import PlaidDomain from './PlaidDomain/resolvers/plaid.resolvers';
import TodoMutationResolvers from './TodoDomain/resolvers/todo.mutation.resolvers';
import PlaidMutationResolvers from './PlaidDomain/resolvers/plaid.mutation.resolvers';

const resolverMap: Resolvers = {
  TodoDomain,
  PlaidDomain,
  Query: {
    todo: () => ({}),
    plaid: () => ({})
  },
  Mutation: {
    ...TodoMutationResolvers,
    ...PlaidMutationResolvers
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value).toISOString(); // value FROM the client
    },
    serialize(value) {
      return value.toISOString(); // value sent TO the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      } else if (ast.kind === Kind.STRING) {
        return ast.value; // ast value is always in string format
      }
      return null;
    }
  })
};

export default resolverMap;
