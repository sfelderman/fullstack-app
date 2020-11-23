import { DataSource } from 'apollo-datasource';
import plaid from 'plaid';
import Transaction from '../../mongooseModels/TransactionModel';
import {
  PlaidTransaction as PlaidTransactionType,
  PlaidDomainGetTransactionsArgs,
  MutationSyncHistoricalTransactionsArgs
} from '../../resolvers-types';
import toYearMonthDay from '../../util/toYearMonthDay';

export interface PlaidTransactionsApi {
  syncHistoricalTransactions: (
    args: MutationSyncHistoricalTransactionsArgs & { userId: string }
  ) => Promise<PlaidTransactionType[]>;
  getTransactions: (
    args: PlaidDomainGetTransactionsArgs & { userId: string }
  ) => Promise<PlaidTransactionType[]>;
}

class PlaidPublicTransactionApi extends DataSource implements PlaidTransactionsApi {
  private client: plaid.Client;

  constructor(client: plaid.Client) {
    super();
    this.client = client;
  }

  public async syncHistoricalTransactions(
    args: MutationSyncHistoricalTransactionsArgs & { userId: string }
  ) {
    /**
     * TODO
     * start and end control the range
     * RANGE controls 1, day, 1 week, 1 month, 3 month, 1 year
     * don't override old values
     */
    const { start, end, all, userId } = args;
    const res = await this.client.getTransactions(
      'access-development-83c00fff-10f1-4a24-bff2-5934bad93a84', // TODO
      toYearMonthDay(args.start),
      toYearMonthDay(args.end),
      {
        // count: 250,
        // offset: 0,
      }
    );
    console.log('Items remaining: ', res.total_transactions - res.transactions.length);

    // TODO check if already exists
    await Promise.all(
      res.transactions.map(trans => {
        const convertedTransaction = this.toMongoObj(trans, args.userId);
        return new Transaction(convertedTransaction).save();
      })
    );

    return res.transactions.map(trans => this.toMongoObj(trans, args.userId));
  }

  public async getTransactions(args: PlaidDomainGetTransactionsArgs & { userId: string }) {
    // const res = await this.client.getTransactions(
    // 'access-development-83c00fff-10f1-4a24-bff2-5934bad93a84', // TODO
    // toYearMonthDay(args.start),
    // toYearMonthDay(args.end),
    const res = await Transaction.find({ userId: args.userId });
    return res.map(transaction => transaction.toObject());
  }

  private toMongoObj(trans: plaid.Transaction, userId: string): PlaidTransactionType {
    return ({
      ...trans,
      userId,
      _id: trans.transaction_id,
      id: trans.transaction_id,
      date: new Date(trans.date)
    } as unknown) as PlaidTransactionType;
  }
}

export default PlaidPublicTransactionApi;
