import { IResolvers } from 'apollo-server-express';
import { Resolvers } from '../../ resolvers-types';

// import { IResolvers } from 'graphql-tools';
const todos = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
];

const resolvers: IResolvers<'Todo'> = {
  // todo: (_) => {
  //   return todos[0];
  // },
  todos: () => todos
};

export default resolvers;
