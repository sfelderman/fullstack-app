import { gql } from 'apollo-server-express';

const PlaidTransaction = gql`
  type PlaidTransaction {
    id: ID!
    userId: ID!
    amount: Float!
    name: String!
    date: Date!
    category: [String]
    category_id: ID!
    pending: Boolean!
    account_id: ID!
    payment_channel: String!

    merchant_name: String
    unofficial_currency_code: String
    iso_currency_code: String
    pending_transaction_id: String

    # authorized_date: Date,

    # "account_owner": null,
    #"transaction_code": String,

    # "payment_meta": {
    #   "by_order_of": null,
    #   "payee": null,
    #   "payer": null,
    #   "payment_method": null,
    #   "payment_processor": null,
    #   "ppd_id": null,
    #   "reason": null,
    #   "reference_number": null
    # },

    # "location": {
    #   "address": "300 Post St",
    #   "city": "San Francisco",
    #   "region": "CA",
    #   "postal_code": "94108",
    #   "country": "US",
    #   "lat": 40.740352,
    #   "lon": -74.001761,
    #   "store_number": "1235"
    # },
  }
`;
export default PlaidTransaction;
