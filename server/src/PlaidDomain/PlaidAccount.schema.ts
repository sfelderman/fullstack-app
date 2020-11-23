import { gql } from 'apollo-server-express';

const PlaidAccount = gql`
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
`;

export default PlaidAccount;
