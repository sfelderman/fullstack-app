import { gql } from 'apollo-server-express';
import PlaidTransaction from './Transaction.schema';

const PlaidDomain = gql`
  type PlaidDomain {
    getAccount(id: ID!): PlaidAccount
    getAccounts: [PlaidAccount]!
    getTransactions(start: Date!, end: Date!): [PlaidTransaction]!
  }

  extend type Mutation {
    createPlaidAccount(
      accessToken: String!
      itemId: ID!
      institutionId: ID!

      institutionName: String
      accountName: String
      accountType: String
      accountSubtype: String
    ): PlaidAccount

    deletePlaidAccount(id: ID!): PlaidAccount

    syncHistoricalTransactions(start: Date, end: Date, all: Boolean): [PlaidTransaction]!
  }

  ${PlaidTransaction}
`;

export default PlaidDomain;
