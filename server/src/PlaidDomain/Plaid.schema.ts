import { gql } from 'apollo-server-express';

const PlaidDomain = gql`
  type PlaidDomain {
    getAccount(id: ID!): PlaidAccount
    getAccounts: [PlaidAccount]
  }

  type PlaidAccount {
    id: ID!
    userId: ID!
    accessToken: String!
    itemId: ID!
    institutionId: ID!

    institutionName: String
    accountName: String
    accountType: String
    accountSubtype: String
  }

  # extend type Query {
  #   plaidDomain: PlaidDomain
  # }

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
  }
`;

export default PlaidDomain;
