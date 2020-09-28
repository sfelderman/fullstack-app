import { gql } from 'apollo-server-express';
import TodoDomain from './TodoDomain';

const Query = gql`
  type Query {
    _: String
  }

  ${TodoDomain}
`;

export default Object.values({ Query });
