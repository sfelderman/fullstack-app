import { IResolvers } from 'apollo-server-express';
import { Resolvers } from '../../resolvers-types';

// import { IResolvers } from 'graphql-tools';
const todos = [
  {
    id: '1',
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    id: '2',
    title: 'City of Glass',
    author: 'Paul Auster'
  }
];

const resolvers: Resolvers['Query'] = {
  todo: (_, { id }) => {
    const a = todos.find(todo => todo.id === id) || null;
    return a;
  },
  todos: () => todos
};

export default resolvers;
