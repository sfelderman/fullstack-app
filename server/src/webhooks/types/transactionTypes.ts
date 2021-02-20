export interface TRANSACTION_WEBHOOK_TYPE {
  webhook_type: 'TRANSACTIONS';
  webhook_code: string;
  item_id: string;
}

export interface INITIAL_UPDATE extends TRANSACTION_WEBHOOK_TYPE {
  webhook_code: 'INITIAL_UPDATE';
  error?: string | null;
  new_transactions: number;
}

export interface HISTORICAL_UPDATE extends TRANSACTION_WEBHOOK_TYPE {
  webhook_code: 'HISTORICAL_UPDATE';
  error?: Record<string, string> | null;
  new_transactions: number;
}

export interface DEFAULT_UPDATE extends TRANSACTION_WEBHOOK_TYPE {
  webhook_code: 'DEFAULT_UPDATE';
  error: Record<string, string> | null;
  new_transactions: number;
}

export interface TRANSACTIONS_REMOVED extends TRANSACTION_WEBHOOK_TYPE {
  webhook_code: 'TRANSACTIONS_REMOVED';
  removed_transactions: string[];
  error: Record<string, string> | null;
}
