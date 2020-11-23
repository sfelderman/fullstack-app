import { gql } from 'apollo-server-express';
import TodoDomain from './TodoDomain';
import * as PlaidDomain from './PlaidDomain';

const Query = gql`
  scalar Date

  type Query {
    todo: TodoDomain
    plaid: PlaidDomain
  }
`;

export default [Query, TodoDomain, ...Object.values(PlaidDomain)];
