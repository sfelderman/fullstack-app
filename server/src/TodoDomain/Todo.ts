import { gql } from 'apollo-server-express';

const Todo = gql`
  type Todo {
    id: ID!
    title: String
    author: String
  }

  extend type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }
`;

export default Todo;
