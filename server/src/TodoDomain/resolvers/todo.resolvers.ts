import { Resolvers } from '../../resolvers-types';

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
  todo: async (_, { id }, { dataSources }) => {
    // return todos.find(todo => todo.id === id) || null;
    console.log(dataSources);
    return await dataSources.todoApi.getById(id);
  },
  todos: () => todos
};

export default resolvers;
