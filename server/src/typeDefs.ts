import { gql } from 'apollo-server-express';
import TodoDomain from './TodoDomain';
import PlaidDomain from './PlaidDomain';

const Query = gql`
  scalar Date

  type Query {
    todo: TodoDomain
    plaid: PlaidDomain
  }

  ${TodoDomain}
  ${PlaidDomain}
`;

export default Object.values({ Query });
