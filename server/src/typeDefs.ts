import { gql } from 'apollo-server-express';
// import Todo from './TodoDomain';

const Query = gql`
  type Query {
    # author(id: Int!): Post
    todo(id: ID!): Todo
    todos: [Todo]
  }

  type Todo {
    id: ID!
    title: String
    author: String
  }
`;

export default Object.values({ Query });
