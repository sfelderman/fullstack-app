import { gql } from 'apollo-server-express';
import TodoDomain from './TodoDomain';

const Query = gql`
  type Query {
    _: String
  }

  ${TodoDomain}
`;

const Mutation = gql`
  type Mutation {
    createTodo(text: String!, completed: Boolean!): Todo
    updateTodo(id: ID!, text: String, completed: Boolean): Todo
  }
`;

export default Object.values({ Query, Mutation });
