import { gql } from 'apollo-server-express';
import TodoDomain from './TodoDomain';

const Query = gql`
  scalar Date

  ${TodoDomain}
`;

export default Object.values({ Query });
