import { gql } from 'apollo-server-express';

const Todo = gql`
  type Todo {
    title: String
    author: String
  }

  extend type Query {
    todos: [Todo]
  }
`;

export default Todo;
