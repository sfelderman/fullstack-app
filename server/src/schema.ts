import { IResolvers, makeExecutableSchema } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers
});
