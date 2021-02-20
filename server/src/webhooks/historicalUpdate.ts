import PlaidAccount from "../mongooseModels/PlaidAccountModel";
import { HISTORICAL_UPDATE } from "./types/transactionTypes";

const validateBody = (body: HISTORICAL_UPDATE) => {
  if (!body) {
    throw new Error('Empty body');
  }

  if (body.error) {
    throw body.error;
  }

  if (!body.item_id) {
    throw new Error('No item_id')
  }
}

const fetchAccount = async(body:HISTORICAL_UPDATE) => {
  const account = await PlaidAccount.findOne({itemId: body.item_id});
  if (!account) {
    throw new Error('No account found')
  }
  return account;
}

export const handleHistoricalUpdate = async (body: HISTORICAL_UPDATE) => {

  validateBody(body);

  // fetch access token by item_id
  const account = await fetchAccount(body);

  const accessToken = account.accessToken;
  const transactions = [];

  // fetch transactions - handle pagination
    //   const institutionName = account.institutionName;
    //           let transactionsToAdd = [];
    //   client
    //     .getTransactions(accessToken, new Date(), {count: 500})
    //     .then(response => {
    //       transactions.push({
    //         accountName: institutionName,
    //         transactions: response.transactions
    //                   });
    //                   transactionsToAdd.push(
    //                       ...reformTransactions({
    //                           transactions: response.transactions,
    //                           userId: req.user.id,
    //                           institutionName
    //                       })
    //                   );

    //                   // find transactions for current user
    //                   Transaction.find({ userId: req.user.id }, '_id')
    //                   .then((items) => {
    //                       if (items.length) {
    //                           const ids = items.reduce((ids, item) => {
    //                               ids[item._id] = true;
    //                               return ids;
    //                           }, {});
    //                           // items.forEach(obj => ids.push(obj._id));
    //                           transactionsToAdd = transactionsToAdd.filter((transaction) => !ids[transaction._id]);
    //                       }
    //                       if (transactionsToAdd.length)
    //                           Transaction.insertMany(transactionsToAdd, function (err, docs) {
    //                               if (err){
    //                                   return console.error(err);
    //                               } else if (docs.insertedCount) {
    //                                   console.log(`${docs.insertedCount} documents inserted to Collection`);
    //                               } else {
    //                                   console.log('No new documents added to Collection');
    //                               }
    //                           });
    //                   })
    //                   .catch(err => console.error(`Failed to find documents: ${err}`));

    //                   // Don't send back response till all transactions have been added
    //       if (transactions.length === accounts.length) {
    //         res.json(transactions);
    //       }
    //               })
    //     .catch(err => console.error(err));
    // });
  // }
  // save transactions to Mongo

};