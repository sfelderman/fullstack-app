import { handleHistoricalUpdate } from './historicalUpdate';
import { HISTORICAL_UPDATE, TRANSACTION_WEBHOOK_TYPE } from './types/transactionTypes';

const isTransactionType = (
  body: TRANSACTION_WEBHOOK_TYPE | unknown
): body is TRANSACTION_WEBHOOK_TYPE => {
  return (body as TRANSACTION_WEBHOOK_TYPE).webhook_type === 'TRANSACTIONS';
};

export const incomingWebhook = (body: TRANSACTION_WEBHOOK_TYPE | unknown) => {
  console.log('Incoming webhook: ', body);
  if (!isTransactionType(body)) {
    console.log('Is not TRANSACTION type');
    return;
  }
  switch (body.webhook_code) {
    case 'INITIAL_UPDATE':
      return;
    case 'HISTORICAL_UPDATE':
      return handleHistoricalUpdate(body as HISTORICAL_UPDATE);
    case 'DEFAULT_UPDATE':
      return;
    case 'TRANSACTIONS_REMOVED':
      return;
    default:
      console.error("Shouldn't be here");
      return;
  }
};
