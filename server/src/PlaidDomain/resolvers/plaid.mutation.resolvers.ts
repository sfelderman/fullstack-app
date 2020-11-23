import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['Mutation'] = {
  createPlaidAccount: async (_, args, { dataSources, userId }) => {
    return dataSources.accountsApi.createPlaidAccount({ ...args, userId });
  },
  deletePlaidAccount: async (_, { id }, { dataSources }) => {
    return dataSources.accountsApi.deletePlaidAccount(id);
  },
  syncHistoricalTransactions: (_, args, { dataSources, userId }) => {
    return dataSources.transactionsApi.syncHistoricalTransactions({ ...args, userId });
  }
};

export default resolvers;
