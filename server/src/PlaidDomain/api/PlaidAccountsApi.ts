import { DataSource } from 'apollo-datasource';
import { ObjectId } from 'mongodb';
import {
  MutationCreatePlaidAccountArgs,
  PlaidAccount as PlaidAccountType
} from '../../resolvers-types';
import PlaidAccount from '../../mongooseModels/PlaidAccountModel';

export interface PlaidAccountsApi {
  getAccount: (id: string) => Promise<PlaidAccountType | null>;
  getAccounts: () => Promise<PlaidAccountType[]>;

  createPlaidAccount: (
    args: MutationCreatePlaidAccountArgs & { userId: string }
  ) => Promise<PlaidAccountType>;
  deletePlaidAccount: (id: string) => Promise<PlaidAccountType | null>;
}

class MongoPlaidAccountsApi extends DataSource implements PlaidAccountsApi {
  public async getAccount(id: string) {
    const convertedId = new ObjectId(id);
    const account = await PlaidAccount.findById(convertedId);

    if (!account) return null;

    return account.toObject();
  }

  public async getAccounts() {
    const accounts = await PlaidAccount.find();

    return accounts.map(account => account.toObject());
  }

  public async createPlaidAccount(args: MutationCreatePlaidAccountArgs & { userId: string }) {
    console.log(args);
    const todo = new PlaidAccount(args);

    const account = await todo.save();
    return account.toObject();
  }

  public async deletePlaidAccount(id: string) {
    const convertedId = new ObjectId(id);

    const account = await PlaidAccount.findByIdAndDelete(convertedId);

    if (!account) return null;
    return account.toObject();
  }
}

export default MongoPlaidAccountsApi;
