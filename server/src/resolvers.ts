import { Resolvers } from './ resolvers-types';
import TodoResolvers from './TodoDomain/loaders/TodoLoader';
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

const resolverMap: Resolvers = {
  Query: {
    // ...TodoResolvers
    todo: () => {
      return todos[0];
    },
    todos: () => todos
  }
};

export default resolverMap;
