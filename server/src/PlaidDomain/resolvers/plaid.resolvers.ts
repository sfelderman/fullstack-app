import GqlContext from '../../context';
import { Resolvers } from '../../resolvers-types';

const resolvers: Resolvers<GqlContext>['PlaidDomain'] = {
  getAccount: (_, { id }, { dataSources }) => {
    return dataSources.accountsApi.getAccount(id);
  },
  getAccounts: (_, _args, { dataSources }) => {
    return dataSources.accountsApi.getAccounts();
  }
};

export default resolvers;
