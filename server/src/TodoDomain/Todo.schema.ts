import { gql } from 'apollo-server-express';

const Todo = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  extend type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }
`;

export default Todo;
