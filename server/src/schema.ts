import { gql, IResolvers, makeExecutableSchema } from 'apollo-server-express';
// import { typeDef as Author } from './author.js';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers
});
